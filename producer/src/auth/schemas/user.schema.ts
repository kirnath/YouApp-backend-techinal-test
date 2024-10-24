import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {

    @Prop()
    displayName?: string;

    @Prop()
    gender?: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;
    
    @Prop({ required: true })
    password: string;

    @Prop()
    about: string;

    @Prop()
    interests: string[];

    @Prop()
    zodiac: string;

    @Prop()
    horoscope: string;

    @Prop()
    birthday: string;

    @Prop()
    height: number;

    @Prop()
    weight: number;

}

export const UserSchema = SchemaFactory.createForClass(User);