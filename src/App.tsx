
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import RequireAuth from "./components/RequireAuth";

// Optimized loading fallback with reduced animation
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="h-8 w-8 border-2 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

// Group related pages for better code-splitting
const AuthPages = {
  Login: lazy(() => import("./pages/LoginPage"))
};

const MainPages = {
  Dashboard: lazy(() => import("./pages/Dashboard")),
  NotFound: lazy(() => import("./pages/NotFound"))
};

const StudentPages = {
  List: lazy(() => import("./pages/StudentsPage")),
  Detail: lazy(() => import("./pages/StudentDetail")),
  Add: lazy(() => import("./pages/AddStudentPage"))
};

const AdminPages = {
  Dashboard: lazy(() => import("./pages/AdminDashboard"))
};

// Configure QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Layout>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/" element={<MainPages.Dashboard />} />
                  <Route path="/students" element={<StudentPages.List />} />
                  <Route path="/students/:id" element={<StudentPages.Detail />} />
                  <Route path="/login" element={<AuthPages.Login />} />
                  <Route 
                    path="/add-student" 
                    element={
                      <RequireAuth>
                        <StudentPages.Add />
                      </RequireAuth>
                    } 
                  />
                  <Route 
                    path="/admin" 
                    element={
                      <RequireAuth>
                        <AdminPages.Dashboard />
                      </RequireAuth>
                    } 
                  />
                  <Route path="*" element={<MainPages.NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
