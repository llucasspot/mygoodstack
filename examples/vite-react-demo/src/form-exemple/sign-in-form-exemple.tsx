import {Form, useErrorProps, useInputProps, useLabelProps, useSubmitButtonProps} from "@mygoodstack/form-react";
import clsx from "clsx";
import {ComponentProps} from "react";
import {FieldValues, Path} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {SignInBody} from "./sign-in.body";

export function SignInFormExemple() {

    const onSubmit = async (body: SignInBody) => {
        console.log('SignInBody : ', body);
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <Form
                formName="sign-in-form"
                dto={SignInBody}
                onSubmit={onSubmit}
                className="space-y-6"
            >
                <div className="space-y-1">
                    <Label<SignInBody>
                        label="form.sign-in.input.email.label"
                        formKey="email"
                    />
                    <Input<SignInBody>
                        type='email'
                        placeholder="form.sign-in.input.email.placeholder"
                        formKey="email"
                    />
                    <Error
                        formKey='email'
                    />
                </div>
                <div className="space-y-1">
                    <Label<SignInBody>
                        label="form.sign-in.input.password.label"
                        formKey="password"
                    />
                    <Input<SignInBody>
                        type='password'
                        placeholder="form.sign-in.input.password.placeholder"
                        formKey="password"
                    />
                    <Error
                        formKey='email'
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <SubmitButton
                        label='form.sign-in.button.submit.label'
                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    />
                </div>
            </Form>
        </div>
    )
}

type InputProps<TDto extends FieldValues> = ComponentProps<'input'> & {
    formKey: Path<TDto>;
};

export function Input<TDto extends FieldValues>({
                                                    formKey,
                                                    className,
                                                    ...props
                                                }: InputProps<TDto>) {
    const {
        props: inputProps,
        hasError,
    } = useInputProps<TDto>(formKey, props);

    return (
        <input
            {...inputProps}
            className={clsx(
                'w-full px-3 py-2 border rounded-lg shadow-sm',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                {'border-red-500': hasError},
                {'border-gray-300': !hasError},
                className
            )}
        />
    );
}

type LabelProps<TDto extends FieldValues> = ComponentProps<'label'> & {
    formKey: Path<TDto>;
    label: string;
};

export function Label<TDto extends FieldValues>({
                                                    formKey,
                                                    label,
                                                    ...props
                                                }: LabelProps<TDto>) {

    const {t} = useTranslation();
    const {props: labelProps, fieldRequired} = useLabelProps<TDto>(formKey, props);

    return (
        <label
            {...labelProps}
            className="block text-sm font-medium text-gray-700"
        >
            {t(label)}
            {fieldRequired && <span className="text-red-500">*</span>}
        </label>
    );
}

type ErrorProps<TDto extends FieldValues> = ComponentProps<'p'> & {
    formKey: Path<TDto>;
};

export function Error<TDto extends FieldValues>({
                                                    formKey,
                                                    ...props
                                                }: ErrorProps<TDto>) {

    const {t} = useTranslation();
    const {error, props: errorProps} = useErrorProps<TDto>(formKey);

    let message: string | null = null;
    if (typeof error?.message === 'string') {
        message = t(error.message)
    }

    return (
        error && <p
            {...errorProps}
            {...props}
            className="text-sm text-red-600"
        >
            {message}
        </p>
    );
}

type SubmitButtonProps = ComponentProps<'button'> & {
    label: string;
}

export function SubmitButton({
                                 label,
                                 ...props
                             }: SubmitButtonProps) {

    const {t} = useTranslation();
    const {props: submitButtonProps} = useSubmitButtonProps();

    return (
        <button
            {...submitButtonProps}
            {...props}
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            {t(label)}
        </button>
    );
}