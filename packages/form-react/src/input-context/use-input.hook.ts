import {useContext} from 'react';
import {FieldValues} from "react-hook-form";

import {InputContext, InputContextType} from './input.context';

export function useInput<TDto extends FieldValues>() {
    const context = useContext(InputContext);
    if (!context) {
        throw new Error('useInput must be used within a Input');
    }
    return context as InputContextType<TDto>;
}
