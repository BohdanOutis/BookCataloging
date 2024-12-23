import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCommentDto {
  @Field({ nullable: true })
  @ApiProperty({ description: 'Comment content', required:false })
  @IsString()
  @IsOptional()
  content?: string;
}
