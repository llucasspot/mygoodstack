export const en = {
    form: {
        'sign-in': {
            input: {
                email: {
                    label: 'Email',
                    placeholder: 'jandoe@gmail.com',
                    validation: {
                        IsEmail: 'Email is not valid',
                        IsNotEmpty: 'Email is required',
                    }
                },
                password: {
                    label: 'Password',
                    placeholder: '********',
                    validation: {
                        IsString: 'Password must be a string',
                        Length: 'Password has too between 8 characters',
                        IsNotEmpty: 'Password is required',
                    }
                }
            },
            button: {
                submit: {
                    label: 'Sign in',
                }
            }
        }
    }
}