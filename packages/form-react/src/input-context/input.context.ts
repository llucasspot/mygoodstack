import {createContext} from 'react';
import {Path, FieldValues} from "react-hook-form";

export type InputContextType<TDto extends FieldValues> = {
    formKey: Path<TDto>;
}

export const InputContext = createContext<InputContextType<FieldValues> | null>(null);
