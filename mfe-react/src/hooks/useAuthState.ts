import { useState, useEffect } from 'react';
import { authService } from '@mfe-breeds/mfe-shared';
import { User, LoadingState } from '@mfe-breeds/mfe-shared';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    error: null
  });

  useEffect(() => {
    const userSubscription = authService.getCurrentUser().subscribe(setUser);
    const loadingSubscription = authService.getLoadingState().subscribe(setLoadingState);

    return () => {
      userSubscription.unsubscribe();
      loadingSubscription.unsubscribe();
    };
  }, []);

  return { user, loadingState };
};