import {
  LoginFormValues,
  RegisterFormValues,
  UpdateFormValues,
  ResetPasswordValues,
  UpdatePasswordValues,
} from "@/lib/types";

const isNameValid = (name: string) => {
  return name.trim() !== "" && name.length > 2;
};

const isEmailValid = (email: string) => {
  const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  return email.trim() !== "" && emailPattern.test(email);
};

const isPhoneValid = (phone: string) => {
  const parts = phone.split(" ");
  const phoneNr = parts.slice(1).join(" ");
  const cleanedPhoneNr = phoneNr.replace(/\D/g, "");
  return cleanedPhoneNr.length >= 8;
};

const isPasswordValid = (password: string) => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  return password.trim() !== "" && passwordPattern.test(password);
};

const isPasswordStrong = (
  password: string,
  translations: Record<string, string>
): string | null => {
  if (password.length < 8) {
    return translations.passwordShortLength;
  }

  if (!/[a-z]/.test(password)) {
    return translations.passwordNoLowercase;
  }

  if (!/[A-Z]/.test(password)) {
    return translations.passwordNoUppercase;
  }

  if (!/\d/.test(password)) {
    return translations.passwordNoNumber;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return translations.passwordNoSpecialChar;
  }

  return null;
};

const isPasswordMatched = (password: string, passwordConfirm: string) => {
  return password.trim() !== "" && password === passwordConfirm;
};

const LoginFormValidation = (
  value: LoginFormValues,
  translations: Record<string, string>
) => {
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
};

const RegisterFormValidation = (
  value: RegisterFormValues,
  translations: Record<string, string>
) => {
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

const ResetPasswordValidation = (
  value: ResetPasswordValues,
  translations: Record<string, string>
) => {
  let error: Partial<ResetPasswordValues> = {};

  if (!value.password) {
    error.password = translations.passwordRequired;
  } else if (!isPasswordValid(value.password)) {
    error.password = translations.passwordWeak;
  }

  if (!value.passwordConfirm) {
    error.passwordConfirm = translations.passwordConfirmRequired;
  } else if (!isPasswordMatched(value.password, value.passwordConfirm)) {
    error.passwordConfirm = translations.passwordsNotMatched;
  }

  return error;
};

const UpdateFormValidation = (
  value: UpdateFormValues,
  translations: Record<string, string>
) => {
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
  }

  return error;
};

const UpdatePasswordValidation = (
  value: UpdatePasswordValues,
  translations: Record<string, string>
) => {
  let error: Partial<UpdatePasswordValues> = {};

  if (!value.oldPassword) {
    error.oldPassword = translations.passwordRequired;
  } else if (!isPasswordValid(value.oldPassword)) {
    error.oldPassword = translations.passwordWeak;
  }

  if (!value.newPassword) {
    error.newPassword = translations.passwordRequired;
  } else if (!isPasswordValid(value.newPassword)) {
    error.newPassword = translations.passwordWeak;
  }

  if (!value.confirmPassword) {
    error.confirmPassword = translations.passwordRequired;
  } else if (!isPasswordValid(value.confirmPassword)) {
    error.confirmPassword = translations.passwordWeak;
  }

  return error;
};

export {
  LoginFormValidation,
  RegisterFormValidation,
  ResetPasswordValidation,
  UpdateFormValidation,
  UpdatePasswordValidation,
  isNameValid,
  isEmailValid,
  isPhoneValid,
  isPasswordValid,
  isPasswordStrong,
  isPasswordMatched,
};
