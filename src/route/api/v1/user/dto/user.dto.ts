// src\route\api\v1\user\dto\user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string = '';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly phoneNo: string = '';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string = '';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly otp: string = '';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly upiId: string = '';
}

export class UpdateUserDto {
    @ApiProperty({ required: false })
    readonly name?: string;
  
    @ApiProperty({ required: false })
    readonly phoneNo?: string;
  
    @ApiProperty({ required: false })
    readonly password?: string;
  
    @ApiProperty({ required: false })
    readonly otp?: string;
  
    @ApiProperty({ required: false })
    readonly upiId?: string;
  }
  
