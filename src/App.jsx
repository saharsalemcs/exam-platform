import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import LoginPage from "./features/auth/pages/LoginPage";
// import RegisterPage from "./features/auth/pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
// import StudentDashboard from "./features/student/StudentDashboard";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000 },
  },
});

// Public
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("./features/auth/pages/RegisterPage"));

// student
const StudentDashboard = lazy(
  () => import("./features/dashboard/pages/StudentDashboard"),
);
const AvailableExamsPage = lazy(
  () => import("./features/exams/pages/AvailableExamsPage"),
);
const ExamDetailsPage = lazy(
  () => import("@/features/exams/pages/ExamDetailsPage"),
);

// Teacher
const TeacherDashboard = lazy(
  () => import("@/features/dashboard/pages/TeacherDashboard"),
);

function PageLoader() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - var(--header-height))" }}
    >
      <LoadingSpinner />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />} />
        <Routes>
          {/* Root */}
          <Route path="/" element={<HomePage />} />

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Student Routes */}
          <Route element={<ProtectedRoute allowedRole="student" />}>
            <Route element={<AppLayout />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/exams" element={<AvailableExamsPage />} />
              <Route
                path="/student/exams/:examId"
                element={<ExamDetailsPage />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
