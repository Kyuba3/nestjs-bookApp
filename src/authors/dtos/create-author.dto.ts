import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAuthorDTO {
  @IsNotEmpty()
  @IsInt()
  @Length(1, 3)
  country: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;
}
