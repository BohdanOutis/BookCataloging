import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; // Import GraphQL decorators

@InputType()  // Mark this class as an InputType for GraphQL mutations
export class UpdateUserDto {
  @ApiProperty({ description: 'User full name', required: false })
  @IsOptional()
  @MinLength(3)
  @Field({ nullable: true })  // Expose this field in GraphQL, make it nullable
  username?: string;

  @ApiProperty({ description: 'User email', required: false })
  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })  // Expose this field in GraphQL, make it nullable
  email?: string;

  @ApiProperty({ description: 'User password', required: false })
  @IsOptional()
  @MinLength(6)
  @Field({ nullable: true })  // Expose this field in GraphQL, make it nullable
  password?: string;
}
