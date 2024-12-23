import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookDto {
  @Field()
  @ApiProperty({ description: 'Book title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @ApiProperty({ description: 'Book description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field()
  @IsOptional()
  @IsUrl()
  coverUrl?: string;

  @ApiProperty({ description: 'Year'})
  @IsInt()
  @Min(1000) // Earliest possible publication year
  @Max(new Date().getFullYear()) // Current year as the upper limit
  year: number;

  @ApiProperty({ description: 'Genre IDs', type: [Number] })
  @IsNotEmpty()
  genres: number[]; // Array of genre IDs

  @ApiProperty({ description: 'Authors IDs', type: [Number] })
  @IsNotEmpty()
  authors: number[]; // Array of author IDs
}
