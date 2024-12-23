import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/Comment';
import { CreateCommentDto } from './dtos/CreateComment.dto';
import { UpdateCommentDto } from './dtos/UpdateComment.dto';
import { Book } from '../books/entities/Book';
import { User } from '../users/entities/User';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a comment for a book
  async create(createCommentDto: CreateCommentDto, userId: number, bookId: number) {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
    });
      
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      book,
      user,
      createdAt: new Date(),
    });

    return this.commentRepository.save(comment);
  }

  // Retrieve all comments for a specific book
  async findByBook(bookId: number) {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['comments', 'comments.user'],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book.comments;
  }

  // Update a comment by its ID
  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== userId) {
      throw new UnauthorizedException('You are not authorized to update this comment');
    }

    comment.content = updateCommentDto.content || comment.content;
    return this.commentRepository.save(comment);
  }

  // Delete a comment by its ID
  async remove(id: number, userId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== userId) {
      throw new UnauthorizedException('You are not authorized to delete this comment');
    }

    return this.commentRepository.delete(id);
  }
}
