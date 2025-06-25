import {getMetadataStorage} from "class-validator";
import {ComponentProps} from "react";
import {FieldValues, Path} from "react-hook-form";
import {useForm} from "../form-context";
import {Type} from "../type";
import {useErrorProps} from "./use-error-props.hook";

function isFieldRequired<TDto extends FieldValues>(
    dtoClass: Type<TDto>,
    property: Path<TDto>,
): boolean {
    const metadataStorage = getMetadataStorage();
    const validations = metadataStorage.getTargetValidationMetadatas(
        dtoClass,
        dtoClass.prototype,
        false,
        false,
        undefined,
    );
    const requiredTypes = ['isDefined', 'isNotEmpty', 'minLength'];
    return validations
        .filter((v) => v.propertyName === property)
        .some((v) => requiredTypes.includes(v.name as string));
}

type useInputPropsResult = {
    props: ComponentProps<'input'>
    errorProps?: ReturnType<typeof useErrorProps>['props']
    required: boolean
    error?: ReturnType<typeof useErrorProps>['error']
    disabled: boolean
    hasError: boolean
}

export function useInputProps<TDto extends FieldValues>(
    formKey: Path<TDto>,
    options?: ComponentProps<'input'>,
): useInputPropsResult {
    const {form, dto} = useForm<TDto>();
    const {
        register, formState: {isSubmitting}
    } = form

    const required = isFieldRequired(dto, formKey);
    const {error, props: errorProps, hasError} = useErrorProps<TDto>(formKey)

    const props: useInputPropsResult['props'] = {
        ...register(formKey, {required}),
        "aria-invalid": !!error,
        "aria-required": required,
        "aria-errormessage": `${formKey}-error`,
        "aria-describedby": `${formKey}-description`,
        disabled: isSubmitting,
        ...options
    }
    const disabled = props.disabled as boolean

    return {
        props,
        required,
        disabled,
        error,
        hasError,
        errorProps,
    }
}
