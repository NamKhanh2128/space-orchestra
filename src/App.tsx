import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { MainLayout } from "@/components/layout/MainLayout";
import { PrivateRoute } from "@/components/layout/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Facilities from "./pages/Facilities";
import Assets from "./pages/Assets";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/bookings"
        element={
          <PrivateRoute>
            <MainLayout>
              <Bookings />
            </MainLayout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/facilities"
        element={
          <PrivateRoute>
            <MainLayout>
              <Facilities />
            </MainLayout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/assets"
        element={
          <PrivateRoute>
            <MainLayout>
              <Assets />
            </MainLayout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <MainLayout>
              <Users />
            </MainLayout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <MainLayout>
              <Reports />
            </MainLayout>
          </PrivateRoute>
        }
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

