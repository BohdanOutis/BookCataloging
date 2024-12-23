import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql'; // Import GraphQL decorators

@InputType()  // Mark this class as an InputType for GraphQL mutations
export class CreateUserDto {
  @ApiProperty({ description: 'User full name' })
  @IsNotEmpty()
  @MinLength(3)
  @Field()  // Expose this field in GraphQL
  username: string;

  @ApiProperty({ description: 'User email address' })
  @IsNotEmpty()
  @IsEmail()
  @Field()  // Expose this field in GraphQL
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  @MinLength(6)
  @Field()  // Expose this field in GraphQL
  password: string;
}
