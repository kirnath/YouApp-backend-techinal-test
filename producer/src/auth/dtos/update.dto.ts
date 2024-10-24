import { isDate, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateDto {
    @IsString()
    displayName: string;

    @IsString()
    gender: string;
    
    @IsNotEmpty()
    birthday: string;
    
    @IsString()
    horoscope: string;

    @IsString()
    zodiac: string;
    
    @IsNumber()
    height: number;

    @IsNumber()
    weight: number;

    @IsNotEmpty()
    interests: string[];
}