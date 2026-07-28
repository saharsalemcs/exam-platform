import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "@/components/shared/Button";
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import supabase from "@/services/supabase";
import PasswordField from "./PasswordField";

function ChangePasswordCard({ email }) {
  const { changePassword, isUpdatingPassword } = useUpdatePassword();
  const [visibility, setVisibility] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  function toggle(field) {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  function onSubmit(data) {
    console.log(data);
    changePassword(
      {
        email,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      { onSuccess: () => reset() },
    );
  }

  async function handleForgotPassword() {
    if (!email) return;
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) toast.error(error.message);
    else toast.success("Password reset link sent to your email");
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-text">Change Password</h2>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="cursor-pointer text-sm font-semibold text-primary hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <PasswordField
          label="Current Password"
          name="currentPassword"
          register={register}
          error={errors.currentPassword}
          show={visibility.current}
          onToggleShow={() => toggle("current")}
          placeholder="Enter current password"
          rules={{ required: "Current password is required" }}
        />

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

        <Button
          variation="primary"
          size="md"
          type="submit"
          disabled={isUpdatingPassword}
          className="mt-2"
        >
          {isUpdatingPassword ? "Updating…" : "Update Password"}
        </Button>
      </form>
    </div>
  );
}

export default ChangePasswordCard;
