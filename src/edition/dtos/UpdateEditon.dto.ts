import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateEditionDto {
  @Field({ nullable: true })
  @ApiProperty({ description: 'BookId', required: false })
  @IsNotEmpty()
  bookId?: number; // ID of the book

  @Field({ nullable: true })
  @ApiProperty({ description: 'Year of the edition', required: false })
  @IsNotEmpty()
  @IsInt()
  @Min(1000)
  year?: number; // Year of the edition

  @Field({ nullable: true })
  @ApiProperty({ description: 'Publisher', required: false })
  @IsNotEmpty()
  @IsString()
  publisher?: string; // Publisher name
}