import React from 'react';
import { SpinnerContainer, SpinnerText } from './LoadingSpinner.styles';

interface LoadingSpinnerProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
  message = 'Loading...'
}) => {
  if (!isLoading) return null;

  return (
    <SpinnerContainer>
      <div className="spinner"></div>
      <SpinnerText>{message}</SpinnerText>
    </SpinnerContainer>
  );
};