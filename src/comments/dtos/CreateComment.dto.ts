import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';


@InputType()
export class CreateCommentDto {
  @Field()
  @ApiProperty({ description: 'Comment content' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field()
  @ApiProperty({ description: 'Book ID the comment belongs to' })
  @IsNotEmpty()
  bookId: number; // ID of the book being commented on
}