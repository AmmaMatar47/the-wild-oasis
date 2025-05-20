import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "./components/ui/toaster";
import AppLayout from "./components/AppLayout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Users from "./pages/Users";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CheckIn from "./pages/CheckIn";
import BookingsDetails from "./features/bookings/BookingsDetails";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route
                index
                element={<Navigate replace={true} to="/dashboard" />}
              />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="account" element={<Account />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="bookings" element={<Bookings />} />
              <Route
                path="bookings/:bookingsId"
                element={<BookingsDetails />}
              />
              <Route path="checkin/:bookingsId" element={<CheckIn />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
