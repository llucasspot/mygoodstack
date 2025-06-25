import {Transform} from "class-transformer";
import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';
import {Dto} from "./dto";

export class SignInBody extends Dto<SignInBody> {
    @IsEmail({}, {message: 'form.sign-in.input.email.validation.IsEmail'})
    @IsNotEmpty({message: 'form.sign-in.input.email.validation.IsNotEmpty'})
    @Transform(({value}) => value?.trim().toLowerCase())
    email!: string;

    @IsString({message: 'form.sign-in.input.password.validation.IsString'})
    @Length(8, undefined, {message: 'form.sign-in.input.password.validation.Length'})
    @IsNotEmpty({message: 'form.sign-in.input.password.validation.IsNotEmpty'})
    password!: string;

    // @IsBoolean({message: 'form.sign-in.input.stayConnected.validation.IsBoolean'})
    // stayConnected!: boolean;
}