import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/LoginForm/LoginForm';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import {
  AppContainer,
  Header,
  MainContent,
  AuthCard
} from './root.styles';

export interface RootProps {
  name: string;
}

export default function Root(props: RootProps) {
  const { isAuthenticated, user } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleAuthSuccess = () => {
    console.log('Auth success callback triggered');
    console.log('Current auth state:', { isAuthenticated, user });
    console.log('Should redirect to dashboard:', isAuthenticated && user);
  };



  if (isAuthenticated && user) {
    return (
      <div style={{padding: '20px'}}>
        <h1>DASHBOARD - LOGIN SUCCESSFUL!</h1>
        <p>Welcome, {user.name}!</p>
        <p>Email: {user.email}</p>
        <p>This is the protected dashboard. Use the logout button in the top navbar.</p>
      </div>
    );
  } else {
    console.log('Rendering login form - auth check failed:', { isAuthenticated, user });
  }

  return (
    <AppContainer>
      <Header>
        <h1>👤 Account</h1>
        <p>Authentication Portal</p>
      </Header>
      <MainContent>
        <AuthCard>
          {isLoginMode ? (
            <LoginForm
              onSwitchToRegister={() => setIsLoginMode(false)}
              onSuccess={handleAuthSuccess}
            />
          ) : (
            <RegisterForm
              onSwitchToLogin={() => setIsLoginMode(true)}
              onSuccess={handleAuthSuccess}
            />
          )}
        </AuthCard>
      </MainContent>
    </AppContainer>
  );
}
