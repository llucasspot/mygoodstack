import {classValidatorResolver} from "@hookform/resolvers/class-validator";
import {ComponentProps} from 'react';
import {DefaultValues, FieldValues, FormProvider as RHFFormProvider, SubmitHandler, useForm,} from 'react-hook-form';

import {Type} from "../type";
import {FormContext} from "./form.context";

export type FormProps<TDto extends FieldValues> = {
    dto: Type<TDto>;
    formName: string;
    onSubmit: SubmitHandler<TDto>;
    defaultValues?: DefaultValues<TDto>;
} & Omit<ComponentProps<'form'>, 'onSubmit'>;

export function Form<TDto extends FieldValues>({
                                              dto,
                                              formName,
                                              onSubmit,
                                              defaultValues,
                                              ...formProps
                                          }: FormProps<TDto>) {
    const methods = useForm<TDto, unknown, TDto>({
        resolver: classValidatorResolver(dto),
        defaultValues,
    });

    return (
        <FormContext.Provider
            value={{
                formName,
                dto,
            }}
        >
            <RHFFormProvider {...methods}>
                <form
                    {...formProps}
                    onSubmit={methods.handleSubmit(onSubmit)}>
                </form>
            </RHFFormProvider>
        </FormContext.Provider>
    );
}
