import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateAuthorDTO {
  @IsNotEmpty()
  @Length(3, 100)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 3)
  country: string;
}
