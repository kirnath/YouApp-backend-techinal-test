import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ZodiacService {

    getZodiac(birthdate: string): { zodiac: string, sign: string } {
        const date = new Date(birthdate);
        if (isNaN(date.getTime())) {
            throw new BadRequestException('Invalid birthdate YYYY-MM-DD');
        }

        const month = date.getUTCMonth() + 1; // months from 1-12
        const day = date.getUTCDate();

        let zodiacHoroscope = '';
        let sign = ''

        if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
            zodiacHoroscope = 'Aquarius';
            sign = 'Water Bearer';
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            zodiacHoroscope = 'Pisces';
            sign = 'Fish';
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
            zodiacHoroscope = 'Aries';
            sign = 'Ram';
        } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
            zodiacHoroscope = 'Taurus';
            sign = 'Bull';
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            zodiacHoroscope = 'Gemini';
            sign = 'Twins';
        } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
            zodiacHoroscope = 'Cancer';
            sign = 'Crab';
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
            zodiacHoroscope = 'Leo';
            sign = 'Lion';
        } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
            zodiacHoroscope = 'Virgo';
            sign = 'Virgin';
        } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
            zodiacHoroscope = 'Libra';
            sign = 'Scales';
        } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
            zodiacHoroscope = 'Scorpio';
            sign = 'Scorpion';
        } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
            zodiacHoroscope = 'Sagittarius';
            sign = 'Archer';
        } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
            zodiacHoroscope = 'Capricorn';
            sign = 'Goat';
        } else {
            throw new BadRequestException('Invalid birthdate');
        }

        return { zodiac: zodiacHoroscope, sign: sign };
    }
}