import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "react-hot-toast";

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
  () => import("./features/exams/pages/ExamDetailsPage"),
);
const ExamSessionPage = lazy(
  () => import("./features/exam-session/pages/ExamSessionPage"),
);
const StudentExamsHistoryPage = lazy(
  () => import("./features/exams-history/pages/StudentExamsHistoryPage"),
);
const StudentResultPage = lazy(
  () => import("./features/results/pages/StudentResultPage"),
);

// Teacher
const TeacherDashboard = lazy(
  () => import("./features/dashboard/pages/TeacherDashboard"),
);
const ExamManagementPage = lazy(
  () => import("./features/exams/pages/ExamManagementPage"),
);
const TeacherResultsPage = lazy(
  () => import("./features/results/pages/TeacherResultsPage"),
);

// Shared
const ProfilePage = lazy(() => import("./features/profile/pages/ProfilePage"));

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
    <>
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
                <Route
                  path="/student/dashboard"
                  element={<StudentDashboard />}
                />
                <Route path="/student/exams" element={<AvailableExamsPage />} />
                <Route
                  path="/student/exams/:examId"
                  element={<ExamDetailsPage />}
                />
                <Route
                  path="/student/exams-history"
                  element={<StudentExamsHistoryPage />}
                />
                <Route
                  path="/student/results/:attemptId"
                  element={<StudentResultPage />}
                />
                <Route path="/student/profile" element={<ProfilePage />} />
              </Route>
              {/* Fullscreen - no sidebar/header */}
              <Route
                path="/student/exam/:examId/session"
                element={<ExamSessionPage />}
              />
            </Route>

            {/* Teacher Routes */}
            <Route element={<ProtectedRoute allowedRole="teacher" />}>
              <Route element={<AppLayout />}>
                <Route
                  path="/teacher/dashboard"
                  element={<TeacherDashboard />}
                />
                <Route path="/teacher/exams" element={<ExamManagementPage />} />
                <Route
                  path="/teacher/exams/:examId/edit"
                  element={<ExamManagementPage />}
                />
                <Route
                  path="/teacher/results"
                  element={<TeacherResultsPage />}
                />
                <Route
                  path="/teacher/results/:examId"
                  element={<TeacherResultsPage />}
                />
                <Route path="/teacher/profile" element={<ProfilePage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>

      <Toaster position="top-center" reverseOrder={false} pauseOnHover />
    </>
  );
}

export default App;
