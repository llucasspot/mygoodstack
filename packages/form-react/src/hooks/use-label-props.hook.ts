import {ComponentProps} from "react";
import {FieldValues, Path} from "react-hook-form";
import {useInputProps} from "./use-input-props.hook";

type useLabelPropsResult = {
    props: ComponentProps<'label'>,
    fieldRequired: boolean
}

export function useLabelProps<TDto extends FieldValues>(
    formKey: Path<TDto>,
    options?: ComponentProps<'label'>
): useLabelPropsResult {
    const {required: fieldRequired} = useInputProps<TDto>(formKey);

    const props: useLabelPropsResult['props'] = {
        htmlFor: formKey,
        ...options
    }
    return {
        props,
        fieldRequired
    }
}
