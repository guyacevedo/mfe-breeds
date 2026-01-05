import { useState, useEffect } from "react";
import { authService, userStore } from "@mfe-breeds/mfe-shared";
import {
  User,
  LoginRequest,
  RegisterRequest,
  LoadingState,
} from "@mfe-breeds/mfe-shared";


export const useAuth: any = () => {
  const [user, setUser] = useState<User | null>(
    userStore.getCurrentUserValue()
  );
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    userStore.getIsAuthenticatedValue()
  );

  useEffect(() => {
    const userSubscription = userStore.getCurrentUser().subscribe((user) => {
      setUser(user);
    });

    const authSubscription = userStore
      .getIsAuthenticated()
      .subscribe((auth) => {
        setIsAuthenticated(auth);
      });

    const loadingSubscription = authService
      .getLoadingState()
      .subscribe((loadingState) => {
        setLoadingState(loadingState);
      });

    return () => {
      userSubscription.unsubscribe();
      authSubscription.unsubscribe();
      loadingSubscription.unsubscribe();
    };
  }, []);

  const login = (credentials: LoginRequest) => {
    return authService.login(credentials);
  };

  const register = (userData: RegisterRequest) => {
    return authService.register(userData);
  };

  const logout = () => {
    authService.logout();
  };

  return {
    user,
    loadingState,
    login,
    register,
    logout,
    isAuthenticated,
  };
};
