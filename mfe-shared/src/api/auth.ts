import { BehaviorSubject, Observable } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import {
  User,
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  LoadingState,
} from "../domain";
import { userStore } from "../store/user-store";

const API_BASE_URL = "http://localhost:3000";

export class AuthService {
  private readonly loadingState$ = new BehaviorSubject<LoadingState>({
    isLoading: false,
    error: null,
  });

  private readonly currentUser$ = new BehaviorSubject<User | null>(null);

  constructor() {
    // Check for existing token on init
    const token = localStorage.getItem("auth_token");
    if (token) {
      const user = this.getUserFromToken(token);
      this.currentUser$.next(user);
      userStore.setUser(user);
    }
  }

  // Login method
  login(credentials: LoginRequest): Observable<AuthResponse> {
    this.setLoading(true, null);

    return this.makeRequest<AuthResponse>(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }).pipe(
      tap((response) => {
        this.setAuthData(response.user, response.token);
      }),
      finalize(() => {
        this.setLoading(false, null);
      })
    );
  }

  // Register method
  register(userData: RegisterRequest): Observable<AuthResponse> {
    this.setLoading(true, null);

    return this.makeRequest<AuthResponse>(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).pipe(
      tap((response) => {
        this.setAuthData(response.user, response.token);
      }),
      finalize(() => {
        this.setLoading(false, null);
      })
    );
  }

  // Logout method
  logout(): void {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    this.currentUser$.next(null);
    userStore.clearUser();

    // Emit custom event for immediate navbar update
    window.dispatchEvent(
      new CustomEvent("auth-state-changed", {
        detail: {
          isAuthenticated: false,
          user: null,
        },
      })
    );
  }

  // Get current user
  getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  // Get loading state
  getLoadingState(): Observable<LoadingState> {
    return this.loadingState$.asObservable();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem("auth_token");
  }

  // Get auth token for API requests
  getAuthToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  // Private helper methods
  private makeRequest<T>(url: string, options: RequestInit): Observable<T> {
    return new Observable<T>((subscriber) => {
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          subscriber.next(data);
          subscriber.complete();
        })
        .catch((error) => {
          this.setLoading(false, error.message);
          subscriber.error(error);
        });
    });
  }

  private setLoading(isLoading: boolean, error: string | null): void {
    this.loadingState$.next({ isLoading, error });
  }

  private setAuthData(user: User, token: string): void {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_data", JSON.stringify(user));
    const userWithToken = { ...user, token };
    this.currentUser$.next(userWithToken);
    userStore.setUser(userWithToken);

    // Emit custom event for immediate navbar update
    window.dispatchEvent(
      new CustomEvent("auth-state-changed", {
        detail: {
          isAuthenticated: true,
          user: userWithToken,
        },
      })
    );
  }

  private getUserFromToken(token: string): User | null {
    try {
      const userData = localStorage.getItem("user_data");
      const user = userData ? JSON.parse(userData) : null;
      return user ? { ...user, token } : null;
    } catch {
      return null;
    }
  }
}

// Singleton instance
export const authService = new AuthService();
