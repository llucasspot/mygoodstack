import {FieldErrors, FieldValues, Path} from "react-hook-form";
import {useForm} from "../form-context";

type useErrorPropsResult<TDto extends FieldValues> = {
    props: {
        id: string
    },
    error: FieldErrors<TDto>[Path<TDto>],
    hasError: boolean
}

export function useErrorProps<TDto extends FieldValues>(formKey: Path<TDto>): useErrorPropsResult<TDto> {
    const {form} = useForm<TDto>();
    const {
        formState: {errors},
    } = form

    const error = errors[formKey];
    const props = {
        id: `${formKey}-error`,
    }
    const hasError = !!error

    return {
        props,
        error,
        hasError
    }
}
