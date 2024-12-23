import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorDto {
    @Field({ nullable: true })
    @ApiProperty({ description: 'Author name', required: false })
    @IsOptional()
    @IsString()
    name?: string;
  
    @Field({ nullable: true })
    @ApiProperty({ description: 'Author bio', required: false })
    @IsOptional()
    @IsString()
    bio?: string;
}