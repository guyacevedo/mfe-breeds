export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  name: string;
  confirmPassword: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
  general?: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: FormErrors;
}