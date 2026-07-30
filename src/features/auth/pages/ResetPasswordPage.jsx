// features/auth/pages/ResetPasswordPage.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import Button from "@/components/shared/Button";
import PasswordField from "@/features/profile/components/PasswordField";
import supabase from "@/services/supabase";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { resetPassword } from "../services/authApi";
import { useLogout } from "../hooks/useLogout";

function ResetPasswordPage() {
  const [isReady, setIsReady] = useState(false);
  const [visibility, setVisibility] = useState({ next: false, confirm: false });
  const { logout } = useLogout();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { newPassword: "", confirmPassword: "" } });

  function toggle(field) {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  useEffect(() => {
    // Supabase fires a PASSWORD_RECOVERY event once it reads the token from the URL
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setIsReady(true);
    });

    // fallback in case the event already fired before this ran
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function onSubmit(data) {
    try {
      await resetPassword(data.newPassword);
      toast.success("Password updated! You can sign in now.");
      await supabase.auth.signOut();
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (!isReady) return <LoadingSpinner />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-12">
      <div
        className="w-full max-w-[500px] rounded-[var(--radius-lg)] border border-border bg-surface p-8"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <h1 className="text-xl font-bold tracking-tight text-text">
          Reset Password
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Enter your new password below
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col gap-4"
        >
          <PasswordField
            label="New Password"
            name="newPassword"
            register={register}
            error={errors.newPassword}
            show={visibility.next}
            onToggleShow={() => toggle("next")}
            placeholder="Min 6 characters"
            rules={{
              required: "New password is required",
              minLength: { value: 6, message: "Must be at least 6 characters" },
            }}
          />

          <PasswordField
            label="Confirm New Password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
            show={visibility.confirm}
            onToggleShow={() => toggle("confirm")}
            placeholder="Repeat new password"
            rules={{
              required: "Please confirm the new password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords don't match",
            }}
          />

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            <Save size={18} />
            {isSubmitting ? "Updating…" : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
