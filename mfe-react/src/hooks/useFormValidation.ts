import { useState } from 'react';
import { LoginFormData, RegisterFormData, FormErrors, FormValidationResult } from '../types';
import { validateEmail, validatePassword, validateName } from '../utils/validation';

export const useFormValidation = (isLogin: boolean = false) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateLoginForm = (formData: LoginFormData): FormValidationResult => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  };

  const validateRegisterForm = (formData: RegisterFormData): FormValidationResult => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Name must contain only letters and spaces';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  };

  const clearErrors = () => {
    setErrors({});
  };

  const setFieldError = (field: keyof FormErrors, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  return {
    errors,
    validateLoginForm,
    validateRegisterForm,
    clearErrors,
    setFieldError
  };
};