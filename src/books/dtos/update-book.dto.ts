import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsUUID,
  Length,
  Min,
  Max,
} from 'class-validator';

export class UpdateBookDTO {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  title: string;

  @IsInt()
  @Max(5)
  @Min(1)
  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  price: number;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  authorId: string;
}
