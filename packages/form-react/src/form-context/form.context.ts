import {createContext} from 'react';
import {FieldValues} from "react-hook-form";
import {Type} from "../type";

export type FormContextType<TDto extends FieldValues> = {
    formName: string;
    dto: Type<TDto>;
}

export const FormContext = createContext<FormContextType<object> | null>(null);
