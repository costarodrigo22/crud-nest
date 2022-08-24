import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class MovieSchema {
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  name: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty()
  author: string;

  @IsInt()
  @ApiProperty()
  classification: number;

  @IsString()
  @MaxLength(300)
  @ApiProperty()
  summary: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty()
  director: string;

  @IsInt()
  @ApiProperty()
  releaseyear: number;
}
