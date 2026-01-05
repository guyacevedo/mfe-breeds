// User domain models
export interface User {
  id: string;
  email: string;
  name: string;
  token?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Cat breed domain models
export interface Breed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
}

// Loading and Error states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}