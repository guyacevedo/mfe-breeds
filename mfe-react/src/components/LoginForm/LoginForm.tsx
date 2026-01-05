import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useFormValidation } from "../../hooks/useFormValidation";
import { LoginFormData } from "../../types";
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
} from "./LoginForm.styles";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
  onSuccess,
}) => {
  const { login, loadingState } = useAuth();
  const { errors, validateLoginForm, clearErrors, setFieldError } =
    useFormValidation(true);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
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

    const validationResult = validateLoginForm(formData);

    if (!validationResult.isValid) {
      return;
    }

    try {
      await login(formData).toPromise();

      clearErrors();
      onSuccess?.();
    } catch (error) {
      setFieldError(
        "general",
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <FormContainer>
      <FormTitle>Login</FormTitle>
      <form onSubmit={handleSubmit}>
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

        <Button type="submit" disabled={loadingState.isLoading}>
          {loadingState.isLoading ? "Logging in..." : "Login"}
        </Button>

        <LoadingSpinner
          isLoading={loadingState.isLoading}
          message="Authenticating..."
        />

        <ErrorMessage
          error={errors.general || loadingState.error}
          onRetry={() =>
            handleSubmit({ preventDefault: () => {} } as React.FormEvent)
          }
        />
      </form>

      <SwitchMode>
        Don't have an account?{" "}
        <Link onClick={onSwitchToRegister}>Register here</Link>
      </SwitchMode>
    </FormContainer>
  );
};
