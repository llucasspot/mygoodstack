import {ComponentProps} from "react";
import {FieldValues, Path} from "react-hook-form";
import {useInputProps} from "./use-input-props.hook";

export function useHiddenInput<TDto extends FieldValues>(
    formKey: Path<TDto>,
    options?: Omit<ComponentProps<'input'>, 'hidden' | 'readOnly'>,
): ReturnType<typeof useInputProps> {
    return useInputProps<TDto>(formKey, {
        hidden: true,
        readOnly: true,
        ...options
    });
}
