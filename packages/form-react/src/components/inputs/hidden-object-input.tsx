import {FieldPathValue, FieldValues, Path} from 'react-hook-form';
import {useForm} from "../../form-context";

type HiddenObjectInputProps<TDto extends FieldValues> = {
    formKey: Path<TDto>;
    value: FieldPathValue<TDto, Path<TDto>>;
};

export function HiddenObjectInput<TDto extends FieldValues>({
                                                           formKey,
                                                           value,
                                                       }: HiddenObjectInputProps<TDto>) {
    const {
        form: {
            setValue,
        }
    } = useForm<TDto>();

    setValue(formKey, value);

    return <></>;
}
