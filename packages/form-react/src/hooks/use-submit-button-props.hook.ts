import {ComponentProps} from "react";
import {FieldValues} from "react-hook-form";
import {useForm} from "../form-context";

type useSubmitButtonPropsResult = {
    props: ComponentProps<'button'>,
    disabled: boolean
}

export function useSubmitButtonProps<TDto extends FieldValues>(
    options?: ComponentProps<'button'>
): useSubmitButtonPropsResult {
    const {form} = useForm<TDto>();
    const {
        formState: {isSubmitting},
    } = form

    const props: ComponentProps<'button'> = {
        type: 'submit',
        disabled: isSubmitting,
        ...options
    }
    const disabled = props.disabled as boolean

    return {
        props,
        disabled
    }
}
