import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateGenreDto {
    @Field({ nullable: true })
    @ApiProperty({ description: 'Genre name', required: false })
    @IsOptional()
    @IsString()
    name?: string;
}