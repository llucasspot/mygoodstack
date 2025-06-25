# @mygoodstack/form-react

A powerful and type-safe form library for React applications, built on top of `react-hook-form` and `class-validator`. This library provides a simple and intuitive way to create forms with validation, error handling, and accessibility features.

## Features

- 🚀 Simple and intuitive API
- 🧩 First-class TypeScript support
- 🔍 Built-in validation with `react-hook-form` and `class-validator`
- ♿️ Accessible form controls out of the box
- 🎨 Customizable styling with CSS classes
- ⚡️ Built with React hooks for optimal performance

## Examples

- [vite-react-demo](https://github.com/llucasspot/mygoodstack/blob/main/examples/vite-react-demo/src/main.tsx)

## Installation

```bash
# with npm
npm install @mygoodstack/form-react react-hook-form @hookform/resolvers class-validator class-transformer
# or with yarn
yarn add @mygoodstack/form-react react-hook-form @hookform/resolvers class-validator class-transformer
# or with pnpm
pnpm add @mygoodstack/form-react react-hook-form @hookform/resolvers class-validator class-transformer
```

## Quick Start

### 1. Define your DTO with validation

```typescript
// sign-in.body.ts
import {Transform} from "class-transformer";
import {IsEmail, IsNotEmpty, IsString, Length} from 'class-validator';
import {Dto} from "./dto";

export class SignInBody extends Dto<SignInBody> {
    @IsEmail({}, {message: 'form.sign-in.input.email.validation.IsEmail'})
    @IsNotEmpty({message: 'form.sign-in.input.email.validation.IsNotEmpty'})
    @Transform(({value}) => value?.trim().toLowerCase())
    email!: string;

    @IsString({message: 'form.sign-in.input.password.validation.IsString'})
    @Length(8, undefined, {message: 'form.sign-in.input.password.validation.Length'})
    @IsNotEmpty({message: 'form.sign-in.input.password.validation.IsNotEmpty'})
    password!: string;
}
```

### 2. Create your form component

```tsx
// sign-in.form.tsx
import { Form, useInputProps } from '@mygoodstack/form-react';
import { SignInBody } from './sign-in.body';

export function SignInForm() {
  const handleSubmit = async (data: SignInBody) => {
    // Handle form submission
    console.log('SignInBody :', data);
    // await api.signIn(data);
  };

  return (
    <Form
      dto={CreateUserDto}
      formName="sign-in-form"
      onSubmit={handleSubmit}
      className="space-y-4"
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
  );
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
        isOnError,
    } = useInputProps<TDto>(formKey, props);

    return (
        <input
            {...inputProps}
            className={clsx(
                'w-full px-3 py-2 border rounded-lg shadow-sm',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                {'border-red-500': isOnError},
                {'border-gray-300': !isOnError},
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
```

### 3. Use your form in a page

```tsx
// CreateUserPage.tsx
import { SignInForm } from './sign-in.form';

export function SignInPage() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Sign In User</h1>
      <SignInForm />
    </div>
  );
}
```

## API Reference

### Components

#### `<Form>`

The main form component that provides form context and handles form submission.

```tsx
<Form
  dto={YourDtoClass}
  formName="your-form-name"
  onSubmit={(data: YourDtoClass) => { /* handle submit */ }}
  defaultValues={initialValues}
  className="your-classes"
>
  {/* Form fields */}
</Form>
```

**Props:**
- `dto`: The DTO class to use for validation
- `formName`: form name that can be use for base path for translation keys for exemple or other
- `onSubmit`: Form submission handler
- `defaultValues`: Optional default values for the form
- All other props are passed to the underlying `<form>` element

### Hooks

#### `useInputProps(fieldName: string, options?: InputProps)`

Hook that returns props to be spread onto an input element.

```tsx
const inputProps = useInputProps('email', { type: 'email' });
<input {...inputProps} />
```

#### `useErrorProps(fieldName: string)`

Hook that returns error state and props for a form field.

```tsx
const { hasError, error, props } = useErrorProps('email');
```

#### `useForm<T>()`

Hook to access the form context and methods.

```tsx
const { form, dto, formName } = useForm<YourDto>();
```

### Form Validation

This library uses `class-validator` for validation. You can use all standard decorators:

```typescript
import { 
  IsString, 
  IsEmail, 
  MinLength, 
  MaxLength,
  IsNumber,
  IsBoolean,
  IsDate,
  IsEnum,
  // ... and more
} from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(2)
  firstName: string;
  
  @IsEmail()
  email: string;
  
  @MinLength(8)
  password: string;
  
  @IsEnum(['admin', 'user', 'guest'])
  role: string;
}
```

## Best Practices

1. **Use DTOs for form data**: Define clear data transfer objects with validation rules.

2. **Leverage TypeScript**: Get full type safety for your form data and validation.

3. **Use the `formName` prop**: For easy internationalization of form labels and error messages.

4. **Compose forms with components**: Break down complex forms into smaller, reusable components.

5. **Handle loading and error states**: Use the form state to show appropriate UI feedback.

## Error Handling

Form validation errors are automatically handled and displayed. You can customize error messages using the `i18nPrefix` and translation keys:

```json
{
  "form": {
    "sign-in": {
      "input": {
        "email": {
          "label": "Email",
          "placeholder": "jandoe@gmail.com",
          "validation": {
            "IsEmail": "Email is not valid",
            "IsNotEmpty": "Email is required"
          }
        },
        "password": {
          "label": "Password",
          "placeholder": "********",
          "validation": {
            "IsString": "Password must be a string",
            "Length": "Password has too between 8 characters",
            "IsNotEmpty": "Password is required"
          }
        }
      },
      "button": {
        "submit": {
          "label": "Sign in"
        }
      }
    }
  }
}
```

## Customization

You can customize the appearance of form elements by providing your own styled components. The library provides unstyled components that you can extend with your own styles.

```tsx
// components/Input.tsx
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
        isOnError,
    } = useInputProps<TDto>(formKey, props);

    return (
        <input
            {...inputProps}
            className={clsx(
                'w-full px-3 py-2 border rounded-lg shadow-sm',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                {'border-red-500': isOnError},
                {'border-gray-300': !isOnError},
                className
            )}
        />
    );
}
```

Then use it in your form:

```tsx
<Input formKey="email" />
```

## License

MIT
