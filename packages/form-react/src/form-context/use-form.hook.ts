import {useContext} from 'react';
import {FieldValues, useFormContext} from "react-hook-form";

import {FormContext, FormContextType} from './form.context';

export function useForm<TDto extends FieldValues>() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useForm must be used within a Form');
    }
    const form = useFormContext<TDto>()
    return {
        ...context as FormContextType<TDto>,
        form
    };
}
