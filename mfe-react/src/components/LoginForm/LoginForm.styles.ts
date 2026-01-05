import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  .error-text {
    color: #e53e3e;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }
`;

export const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #2d3748;
  font-size: 1.875rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4a5568;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  &:disabled {
    background-color: #f7fafc;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SwitchMode = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #4a5568;
`;

export const Link = styled.span`
  color: #3182ce;
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;

  &:hover {
    color: #2c5282;
  }
`;