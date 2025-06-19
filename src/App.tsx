import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "./components/ui/toaster";
import AppLayout from "./components/AppLayout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CheckIn from "./pages/CheckIn";
import BookingsDetails from "./features/bookings/BookingsDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import { ColorModeProvider } from "./components/ui/color-mode";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<Navigate to="login" replace />} />
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    index
                    element={<Navigate replace={true} to="/dashboard" />}
                  />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="cabins" element={<Cabins />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route
                    path="bookings/:bookingsId"
                    element={<BookingsDetails />}
                  />
                  <Route path="checkin/:bookingsId" element={<CheckIn />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>

            <Toaster />
          </ColorModeProvider>
        </ChakraProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
