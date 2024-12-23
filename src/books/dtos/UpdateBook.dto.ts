import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUrl, Min, Max } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateBookDto {
  @Field({ nullable: true })
  @ApiProperty({ description: 'Book title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @ApiProperty({ description: 'Book description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @ApiProperty({ description: 'CoverUrl', required: false })
  @IsOptional()
  @IsUrl()
  coverUrl?: string;

  @Field({ nullable: true })
  @ApiProperty({ description: 'Year', required: false })
  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  year?: number;

  @ApiProperty({ description: 'Genre IDs', type: [Number], required: false })
  @IsOptional()
  genres?: number[]; // Array of genre IDs

  @ApiProperty({ description: 'Authors IDs', type: [Number], required: false })
  @IsOptional()
  authors?: number[]; // Array of author IDs
}