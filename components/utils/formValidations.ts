export interface RegisterFormValues {
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirm: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface UpdateFormValues {
    name: string;
    surname: string;
    email: string;
    phone: string;
    birthday: string;
    password: string;
}

const isNameValid = (name: string) => {
    return name.trim() !== "" && name.length > 2;
};

const isEmailValid = (email: string) => {
    const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    return email.trim() !== "" && emailPattern.test(email);
};

const isPhoneValid = (phone: string) => {
    const phonePattern = /^\d{9,}$/;
    return phone.trim() !== "" && phonePattern.test(phone.trim());
};

const isPasswordValid = (password: string) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return password.trim() !== "" && passwordPattern.test(password);
};

const isPasswordMatched = (password: string, passwordConfirm: string) => {
    return password.trim() !== "" && passwordConfirm.length >= 8 && password === passwordConfirm;
};

const LoginFormValidation = (value: LoginFormValues, translations: Record<string, string>) => {
    let error: Partial<LoginFormValues> = {};

    if (!value.email) {
        error.email = translations.emailRequired;
    } else if (!isEmailValid(value.email)) {
        error.email = translations.emailInvalid;
    }

    if (!value.password) {
        error.password = translations.passwordRequired;
    } else if (!isPasswordValid(value.password)) {
        error.password = translations.passwordInvalid;
    }

    return error;
}

const RegisterFormValidation = (value: RegisterFormValues, translations: Record<string, string>) => {
    let error: Partial<RegisterFormValues> = {};

    if (!value.name) {
        error.name = translations.nameRequired;
    } else if (!isNameValid(value.name)) {
        error.name = translations.nameInvalid;
    }

    if (!value.surname) {
        error.surname = translations.surnameRequired;
    } else if (!isNameValid(value.surname)) {
        error.surname = translations.surnameInvalid;
    }

    if (!value.email) {
        error.email = translations.emailRequired;
    } else if (!isEmailValid(value.email)) {
        error.email = translations.emailInvalid;
    }

    if (!value.phone) {
        error.phone = translations.phoneRequired;
    } else if (!isPhoneValid(value.phone)) {
        error.phone = translations.phoneInvalid;
    }

    if (!value.password) {
        error.password = translations.passwordRequired;
    } else if (!isPasswordValid(value.password)) {
        error.password = translations.passwordWeak;
    }

    if (!value.passwordConfirm) {
        error.passwordConfirm = translations.passwordConfirmRequired;
    } else if (!isPasswordMatched(value.password, value.passwordConfirm)) {
        error.passwordConfirm = translations.passwordsNotMatch;
    }

    return error;
};

const UpdateFormValidation = (value: UpdateFormValues, translations: Record<string, string>) => {
    let error: Partial<UpdateFormValues> = {};

    if (!value.name) {
        error.name = translations.nameRequired;
    } else if (!isNameValid(value.name)) {
        error.name = translations.nameInvalid;
    }

    if (!value.surname) {
        error.surname = translations.surnameRequired;
    } else if (!isNameValid(value.surname)) {
        error.surname = translations.surnameInvalid;
    }

    if (!value.email) {
        error.email = translations.emailRequired;
    } else if (!isEmailValid(value.email)) {
        error.email = translations.emailInvalid;
    }

    if (!value.phone) {
        error.phone = translations.phoneRequired;
    } else if (!isPhoneValid(value.phone)) {
        error.phone = translations.phoneInvalid;
    }

    if (!value.password) {
        error.password = translations.passwordRequired;
    } else if (!isPasswordValid(value.password)) {
        error.password = translations.passwordWeak;
    }

    return error;
};

export { LoginFormValidation, RegisterFormValidation, UpdateFormValidation, isNameValid, isEmailValid, isPhoneValid, isPasswordValid, isPasswordMatched };
