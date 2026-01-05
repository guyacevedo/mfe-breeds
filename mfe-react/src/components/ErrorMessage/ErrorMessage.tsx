import React from 'react';
import { ErrorContainer, ErrorIcon, ErrorText, RetryButton } from './ErrorMessage.styles';

interface ErrorMessageProps {
  error: string | null;
  onRetry?: () => void;
  showRetry?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  onRetry,
  showRetry = true
}) => {
  if (!error) return null;

  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorText>
        <h4>Error</h4>
        <p>{error}</p>
      </ErrorText>
      {showRetry && onRetry && (
        <RetryButton onClick={onRetry}>
          Retry
        </RetryButton>
      )}
    </ErrorContainer>
  );
};