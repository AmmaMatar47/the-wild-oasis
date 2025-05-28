import { useUser } from '@/features/authentication/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Spinner from './Spinner/Spinner';

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  return isLoading ? <Spinner /> : children;
};

export default ProtectedRoute;
