import {PropsWithChildren} from "react";
import {FieldValues, Path} from 'react-hook-form';
import {InputContext} from "./input.context";

export type InputProps<TDto extends FieldValues> = PropsWithChildren<{
    formKey: Path<TDto>;
}>;

export function Input<TDto extends FieldValues>({
                                                    formKey,
                                                    children
                                                }: InputProps<TDto>) {


    return (
        <InputContext.Provider
            value={{
                formKey,
            }}
        >
            {children}
        </InputContext.Provider>
    );
}
