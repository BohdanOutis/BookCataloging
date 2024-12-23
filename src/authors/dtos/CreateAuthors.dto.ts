import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorDto {
  @Field()
  @ApiProperty({ description: 'Author name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @ApiProperty({ description: 'Author bio' })
  @IsOptional()
  @IsString()
  bio?: string;
}