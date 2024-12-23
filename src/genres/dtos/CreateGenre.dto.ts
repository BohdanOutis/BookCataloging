import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGenreDto {
  @Field()
  @ApiProperty({ description: 'Genre name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}