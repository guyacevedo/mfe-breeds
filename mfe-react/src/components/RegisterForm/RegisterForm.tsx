import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useFormValidation } from "../../hooks/useFormValidation";
import { RegisterFormData } from "../../types";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import {
  FormContainer,
  FormTitle,
  FormGroup,
  Label,
  Input,
  Button,
  SwitchMode,
  Link,
} from "./RegisterForm.styles";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSwitchToLogin,
  onSuccess,
}) => {
  const { register, loadingState } = useAuth();
  const { errors, validateRegisterForm, clearErrors, setFieldError } =
    useFormValidation(false);

  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setFieldError(name as keyof typeof errors, "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = validateRegisterForm(formData);

    if (!validationResult.isValid) {
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      }).toPromise();
      clearErrors();
      onSuccess?.();
    } catch (error) {
      setFieldError("general", "Registration failed. Please try again later.");
    }
  };

  return (
    <FormContainer>
      <FormTitle>Register</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            disabled={loadingState.isLoading}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            disabled={loadingState.isLoading}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            disabled={loadingState.isLoading}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            disabled={loadingState.isLoading}
          />
          {errors.confirmPassword && (
            <span className="error-text">{errors.confirmPassword}</span>
          )}
        </FormGroup>

        <Button type="submit" disabled={loadingState.isLoading}>
          {loadingState.isLoading ? "Registering..." : "Register"}
        </Button>

        <LoadingSpinner
          isLoading={loadingState.isLoading}
          message="Creating your account..."
        />

        <ErrorMessage
          error={errors.general || loadingState.error}
          onRetry={() =>
            handleSubmit({ preventDefault: () => {} } as React.FormEvent)
          }
        />
      </form>

      <SwitchMode>
        Already have an account?{" "}
        <Link onClick={onSwitchToLogin}>Login here</Link>
      </SwitchMode>
    </FormContainer>
  );
};
