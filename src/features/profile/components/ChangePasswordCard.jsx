import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/shared/Button";
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import PasswordField from "./PasswordField";
import { useSetPassword } from "../hooks/useSetPassword";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";

function ChangePasswordCard({ email, hasPassword = true }) {
  const { changePassword, isUpdatingPassword } = useUpdatePassword();
  const { setNewPassword, isSettingPassword } = useSetPassword();

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

  function onSubmitChange(data) {
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

  const isPending = isUpdatingPassword || isSettingPassword;

  function onSubmitSet(data) {
    setNewPassword(data.newPassword, { onSuccess: () => reset() });
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-text">
          {hasPassword ? "Change Password" : "Set Password"}
        </h2>
        <Link
          to="/forgot-password"
          className="text-right text-xs text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {!hasPassword && (
        <div
          className="flex gap-3 rounded-md bg-primary-glow p-4"
          style={{
            border: "1px solid rgba(217, 164, 65, 0.25)",
          }}
        >
          <Info
            size={18}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--color-primary)" }}
          />
          <p className="text-sm leading-relaxed text-text-muted">
            <span className="font-semibold text-text">
              You signed up with Google,
            </span>{" "}
            so you don't have a password yet. Set one below to also be able to
            sign in with your email.
          </p>
        </div>
      )}

      {hasPassword ? (
        <form
          onSubmit={handleSubmit(onSubmitChange)}
          className="flex flex-col gap-4"
        >
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
            disabled={isPending}
            className="mt-2"
          >
            {isUpdatingPassword ? "Updating…" : "Update Password"}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmitSet)}
          className="flex flex-col gap-4"
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
              required: "Password is required",
              minLength: { value: 6, message: "Must be at least 6 characters" },
            }}
          />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
            show={visibility.confirm}
            onToggleShow={() => toggle("confirm")}
            placeholder="Repeat password"
            rules={{
              required: "Please confirm the password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords don't match",
            }}
          />

          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={isPending}
            className="mt-2"
          >
            {isSettingPassword ? "Setting…" : "Set Password"}
          </Button>
        </form>
      )}
    </div>
  );
}

export default ChangePasswordCard;
