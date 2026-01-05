import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

export const Header = styled.header`
  text-align: center;
  color: white;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

export const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;

  .user-dashboard {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

    h2 {
      color: #2d3748;
      margin-bottom: 1rem;
    }

    p {
      color: #4a5568;
      margin: 0.5rem 0;
    }
  }
`;

export const AuthCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
`;