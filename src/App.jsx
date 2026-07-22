import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import NotFoundPage from "./pages/NotFoundPage";

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
const StudentDashboardPage = lazy(
  () => import("./features/dashboard/pages/StudentDashboardPage"),
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

// Instructor
const InstructorDashboard = lazy(
  () => import("./features/dashboard/pages/InstructorDashboard"),
);
const ExamWizardPage = lazy(
  () => import("./features/exam-wizard/pages/ExamWizardPage"),
);
const ExamsManagementPage = lazy(
  () => import("./features/exams/pages/ExamsManagementPage"),
);
const InstructorExamHistoryPage = lazy(
  () => import("./features/exams/pages/ExamsManagementPage"),
);
const StudentsPage = lazy(
  () => import("./features/students/pages/StudentsPage"),
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
                  element={<StudentDashboardPage />}
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

            {/* Instructor Routes */}
            <Route element={<ProtectedRoute allowedRole="teacher" />}>
              <Route element={<AppLayout />}>
                <Route
                  path="/instructor/dashboard"
                  element={<InstructorDashboard />}
                />
                <Route
                  path="/instructor/exam-wizard"
                  element={<ExamWizardPage />}
                />
                <Route
                  path="/instructor/exams"
                  element={<ExamsManagementPage />}
                />
                <Route
                  path="/instructor/exams-history"
                  element={<InstructorExamHistoryPage />}
                />
                <Route path="/instructor/students" element={<StudentsPage />} />
                <Route
                  path="/instructor/exams/:examId"
                  element={<ExamsManagementPage />}
                />
                {/* <Route
                  path="/teacher/results"
                  element={<TeacherResultsPage />}
                />
                <Route
                  path="/teacher/results/:examId"
                  element={<TeacherResultsPage />}
                /> */}
                <Route path="/instructor/profile" element={<ProfilePage />} />
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
