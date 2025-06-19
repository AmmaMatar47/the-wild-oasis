import { useUser } from "@/features/authentication/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Spinner from "./Spinner/Spinner";
import { Center } from "@chakra-ui/react";
import { http } from "@/services/HttpService";

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const { isLoading, isAuthenticated, isFetched } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFetched) http.setIsAuthenticated(true);
  }, [isFetched]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  return isLoading ? (
    <Center h="100vh" bgColor="var(--color-grey-0)">
      <Spinner size="7.2rem" />
    </Center>
  ) : (
    children
  );
};

export default ProtectedRoute;
