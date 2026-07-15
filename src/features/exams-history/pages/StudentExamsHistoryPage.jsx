import { useUser } from "@/features/auth/hooks/useUser";
import { useStudentExamsHistory } from "../hooks/useStudentExamsHistory";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { AlertTriangle, FileX2, Tag } from "lucide-react";
import Button from "@/components/shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { formatTime } from "@/lib/utils";
import ExamsHistoryTable from "../components/ExamsHistoryTable";

function StudentExamsHistoryPage() {
  const { data } = useUser();
  const studentId = data?.user?.id;
  const { studentExams, isFetchingStudentExams, studentExamsError } =
    useStudentExamsHistory({
      studentId,
    });
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-lg">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          Exams History
        </h2>
        <p className="text-[16px]" style={{ color: "var(--color-text-muted)" }}>
          {isFetchingStudentExams
            ? "Loading..."
            : `${studentExams.length} submission${studentExams.length !== 1 ? "s" : ""} found`}
        </p>
      </div>

      {/* Loading */}
      {isFetchingStudentExams && <LoadingSpinner />}

      {/* Error */}
      {!isFetchingStudentExams && studentExamsError && (
        <EmptyState
          icon={AlertTriangle}
          title="Couldn't load your exams history"
          description={studentExamsError.message}
          variant="error"
          size="lg"
        />
      )}

      {/* Empty */}
      {!isFetchingStudentExams &&
        !studentExamsError &&
        studentExams.length === 0 && (
          <EmptyState
            icon={FileX2}
            title="No exams submitted yet"
            description="Your completed exams will show up here once you submit them."
            size="lg"
            action={
              <Button
                className="mt-8"
                onClick={() => navigate("/student/exams")}
              >
                Take an Exam
              </Button>
            }
          />
        )}

      {/* Table */}
      {!isFetchingStudentExams &&
        !studentExamsError &&
        studentExams.length > 0 && <ExamsHistoryTable exams={studentExams} />}
    </div>
  );
}

export default StudentExamsHistoryPage;
