import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import { AppProvider } from "./contexts/AppContext";
import { SearchProvider } from "./contexts/SearchContext";
import { supabase } from "./integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000,
      },
    },
  }));

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (event === 'SIGNED_OUT') {
        window.location.href = '/';
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Protected Route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <AppProvider>
          <TooltipProvider>
            <Router>
              <Routes>
                <Route path="/" element={
                  isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/patients" element={
                  <ProtectedRoute>
                    <Patients />
                  </ProtectedRoute>
                } />
                <Route path="/doctors" element={
                  <ProtectedRoute>
                    <Doctors />
                  </ProtectedRoute>
                } />
                <Route path="/appointments" element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                } />
              </Routes>
            </Router>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AppProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
};

export default App;