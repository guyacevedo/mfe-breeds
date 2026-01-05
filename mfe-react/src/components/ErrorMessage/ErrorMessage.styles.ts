import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  margin: 1rem 0;
`;

export const ErrorIcon = styled.div`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

export const ErrorText = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 0.5rem 0;
    color: #c53030;
    font-size: 1rem;
  }

  p {
    margin: 0;
    color: #742a2a;
    font-size: 0.875rem;
  }
`;

export const RetryButton = styled.button`
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2c5282;
  }
`;