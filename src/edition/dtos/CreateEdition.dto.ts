import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEditionDto {
  @Field()
  @ApiProperty({ description: 'Book ID this edition belongs to' })
  @IsNotEmpty()
  bookId: number; // ID of the book

  @Field()
  @ApiProperty({ description: 'Year of publication' })
  @IsNotEmpty()
  @IsInt()
  @Min(1000)
  year: number; // Year of the edition

  @Field()
  @ApiProperty({ description: 'Publisher' })
  @IsNotEmpty()
  @IsString()
  publisher: string; // Publisher name
}