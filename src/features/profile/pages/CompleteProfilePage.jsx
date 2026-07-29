import { useUser } from "@/features/auth/hooks/useUser";
import { DEPARTMENTS, GRADES } from "@/utils/constants";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Button from "@/components/shared/Button";
import { Save } from "lucide-react";
import ErrorMessage from "@/components/shared/ErrorMessage";

const inputStyle = {
  backgroundColor: "var(--color-surface-2)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
};

function CompleteProfilePage() {
  const { data: userData, isLoading } = useUser();
  const navigate = useNavigate();
  const { saveProfile, isSaving } = useUpdateProfile();

  const profile = userData?.profile;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      grade: profile?.grade ?? "",
      department: profile?.department ?? "",
    },
  });

  useEffect(() => {
    if (profile?.grade && profile?.department) {
      navigate("/student/dashboard", { replace: true });
    }
  }, [profile, navigate]);

  function onSubmit(data) {
    saveProfile({
      userId: profile.id,
      full_name: profile.full_name ?? "",
      grade: data.grade,
      department: data.department,
    });
  }

  if (isLoading || isSaving) return <LoadingSpinner />;
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center bg-bg p-6">
      <div className="w-full max-w-140">
        <h1 className="mb-6 font-display text-2xl font-bold text-text">
          Complete Your Profile
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-md border border-border bg-surface p-7"
        >
          <h3 className="text-lg font-medium text-text">
            Academic Information
          </h3>

          <div className="mt-4">
            <label className="mb-1.5 block text-[15px] text-text-muted">
              Grade
            </label>
            <select
              {...register("grade", { required: "Please select your grade" })}
              className="w-full rounded-md px-4 py-2.5 outline-none"
              style={inputStyle}
            >
              <option value="">Select Grade</option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.grade && <ErrorMessage message={errors.grade.message} />}
          </div>

          <div className="mt-5">
            <label className="mb-1.5 block text-[15px] text-text-muted">
              Department
            </label>
            <select
              {...register("department", {
                required: "Please select your department",
              })}
              className="w-full rounded-md px-4 py-2.5 outline-none"
              style={inputStyle}
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.department && (
              <ErrorMessage message={errors.department.message} />
            )}
          </div>

          <Button style={{ marginTop: 35 }} disabled={isSaving} type="submit">
            <Save size={18} style={{ fontWeight: 700 }} />
            {isSaving ? "Saving..." : "Save & Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfilePage;
