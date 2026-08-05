import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Save, User, Mail, Camera } from "lucide-react";
import Button from "@/components/shared/Button";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useUploadAvatar } from "../hooks/useUploadAvatar";
import { DEPARTMENTS, GRADES } from "@/utils/constants";

const inputStyle = {
  backgroundColor: "var(--color-surface-2)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
};

function PersonalInformationCard({ userId, profile, email, role }) {
  const isStudent = role === "student";
  const fileInputRef = useRef(null);

  const { saveProfile, isSaving } = useUpdateProfile();
  const { uploadPhoto, isUploading } = useUploadAvatar();

  const { register, handleSubmit } = useForm({
    values: {
      full_name: profile?.full_name ?? "",
      grade: profile?.grade ?? "",
      department: profile?.department ?? "",
    },
  });

  function onSubmit(data) {
    saveProfile({
      userId,
      full_name: data.full_name,
      grade: isStudent ? data.grade : null,
      department: data.department,
    });
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (file) uploadPhoto({ userId, file });
    e.target.value = ""; // تسمح باختيار نفس الملف تاني لو حبت تعيد الرفع
  }

  const subtitle = isStudent
    ? [profile?.grade, profile?.department].filter(Boolean).join(" · ")
    : profile?.department;

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-lg">
      <h2 className="text-lg font-bold text-text">Personal Information</h2>

      <div className="flex items-center gap-4">
        <div
          onClick={() => fileInputRef.current.click()}
          className="group relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary/20"
        >
          <img
            src={profile?.avatar_url || "/default-avatar.png"}
            alt={profile?.full_name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera className="text-white" size={18} />
          </div>
        </div>
        <div>
          <p className="font-bold text-text">{profile?.full_name}</p>
          <p className="text-sm text-text-muted">{subtitle}</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="cursor-pointer text-sm font-semibold text-primary hover:underline"
          >
            {isUploading ? "Uploading…" : "Change photo"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm text-text-muted">Name</label>
          <div className="relative">
            <User
              size={16}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-text-muted"
            />
            <input
              {...register("full_name", { required: true })}
              className="w-full rounded-md py-2.5 pr-4 pl-9 outline-none"
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-text-muted">
            Contact Email
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-text-muted"
            />
            <input
              value={email ?? ""}
              disabled
              className="w-full cursor-not-allowed rounded-md py-2.5 pr-4 pl-9 opacity-60 outline-none"
              style={inputStyle}
            />
          </div>
        </div>

        {isStudent && (
          <div>
            <label className="mb-1.5 block text-sm text-text-muted">
              Grade
            </label>
            <select
              {...register("grade")}
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
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm text-text-muted">
            Department
          </label>
          <select
            {...register("department")}
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
        </div>

        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={isSaving}
          className="mt-2"
        >
          <Save size={16} className="mr-2 inline" />
          {isSaving ? "Saving…" : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}

export default PersonalInformationCard;
