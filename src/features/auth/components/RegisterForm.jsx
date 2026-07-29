import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GraduationCap, Mail, User, MailCheck } from "lucide-react";
import { useRegister } from "../hooks/useRegister";
import FormInput from "@/components/shared/FormInput";
import PasswordField from "@/features/profile/components/PasswordField";
import Button from "@/components/shared/Button";
import { useSignInWithGoogle } from "../hooks/useSignInWithGoogle";

// ── Icon style helper — نفس الـ pattern بتاع LoginForm ──────────────
const iconStyle = {
  position: "absolute",
  left: 13,
  top: 21,
  transform: "translateY(-50%)",
  color: "var(--color-text-muted)",
  pointerEvents: "none",
  zIndex: 1,
};

// ── ConfirmationScreen ──────────────────────────────────────────────
function ConfirmationScreen({ email }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-12">
      <div
        className="w-full max-w-[400px] rounded-[var(--radius-lg)] p-10 text-center"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)]"
          style={{
            backgroundColor: "rgba(45,212,191,0.1)",
            border: "1px solid rgba(45,212,191,0.2)",
          }}
        >
          <MailCheck size={26} style={{ color: "var(--color-success)" }} />
        </div>

        <h2
          className="mb-2 text-xl font-bold"
          style={{ color: "var(--color-text)" }}
        >
          Check your inbox
        </h2>
        <p
          className="mb-1 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          We sent a confirmation link to
        </p>
        <p
          className="mb-5 text-sm font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          {email}
        </p>
        <p className="text-sm" style={{ color: "var(--color-text-faint)" }}>
          Click the link in that email to activate your account, then sign in.
        </p>

        <Link
          to="/login"
          className="mt-7 inline-block text-sm font-medium no-underline transition-opacity hover:opacity-75"
          style={{ color: "var(--color-primary)" }}
        >
          Back to Sign In →
        </Link>
      </div>
    </div>
  );
}

// ── RegisterForm ────────────────────────────────────────────────────
function RegisterForm() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [visibility, setVisibility] = useState({
    next: false,
    confirm: false,
  });

  const { register: registerUser, isRegistering } = useRegister();
  const { singInWithGoogle, isSigningIn } = useSignInWithGoogle();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  function toggle(field) {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  function onSubmit({ fullName, email, password }) {
    setConfirmedEmail(email);
    registerUser(
      { fullName, email, password },
      {
        onSuccess: () => setShowConfirmation(true),
      },
    );
  }

  if (showConfirmation) return <ConfirmationScreen email={confirmedEmail} />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-12">
      <div
        className="w-full max-w-[420px] rounded-[var(--radius-lg)] border border-border bg-surface p-10"
        style={{
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-surface-2 text-lg font-bold text-primary"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <GraduationCap strokeWidth={2.5} size={22} />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold tracking-tight text-text">
              Create your account
            </h1>
            <p className="mt-1 text-sm text-text-muted">Join EduTest today</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          {/* Full name */}
          <div className="relative">
            <User size={15} style={iconStyle} />
            <FormInput
              hasIcon
              type="text"
              placeholder="Full Name"
              error={errors?.fullName?.message}
              autoComplete="name"
              {...register("fullName", {
                required: "Full name is required",
                minLength: { value: 2, message: "At least 2 characters" },
                validate: (v) =>
                  v.trim().split(" ").filter(Boolean).length >= 2 ||
                  "Please enter your first and last name",
              })}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail size={15} style={iconStyle} />
            <FormInput
              hasIcon
              type="email"
              placeholder="Email Address"
              error={errors?.email?.message}
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
            />
          </div>

          <PasswordField
            name="password"
            register={register}
            error={errors.password}
            show={visibility.next}
            onToggleShow={() => toggle("next")}
            placeholder="Password"
            rules={{
              required: "password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
          />

          <PasswordField
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
            show={visibility.confirm}
            onToggleShow={() => toggle("confirm")}
            placeholder="Confirm password"
            rules={{
              required: "Please confirm password",
              validate: (value) =>
                value === watch("password") || "Passwords don't match",
            }}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={isRegistering}>
            {isRegistering ? "Creating account…" : "Create Account"}
          </Button>

          {/* Divider */}
          <div className="flex items-center">
            <div className="h-0.25 flex-1 bg-border" />
            <span className="mx-3 my-0 text-sm text-text-muted">or</span>
            <div className="h-0.25 flex-1 bg-border" />
          </div>

          {/* Google Button */}
          <Button
            type="button"
            disabled={isSigningIn}
            onClick={singInWithGoogle}
            variant="secondary"
            style={{ fontWeight: "normal", fontSize: 14 }}
          >
            <span className="text-sm font-bold text-primary">G</span>
            {isSigningIn ? "Redirecting…" : "Sign up with Google"}
          </Button>

          <p className="mt-2 text-center text-xs text-text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "var(--color-accent)", fontWeight: 600 }}
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
