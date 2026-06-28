import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  BookOpen,
  MailCheck,
} from "lucide-react";
import { ROLES } from "@/constants/roles";
import { useRegister } from "../hooks/useRegister";
import FormInput from "@/components/shared/FormInput";

// ── Icon style helper — نفس الـ pattern بتاع LoginForm ──────────────
const iconStyle = {
  position: "absolute",
  left: 13,
  top: 21, // نص ارتفاع الـ input (42 / 2)
  transform: "translateY(-50%)",
  color: "var(--color-text-muted)",
  pointerEvents: "none",
  zIndex: 1,
};

// ── RolePicker ──────────────────────────────────────────────────────
function RolePicker({ value, onChange }) {
  const roles = [
    {
      value: ROLES.STUDENT,
      label: "Student",
      icon: User,
      desc: "Take exams & view results",
    },
    {
      value: ROLES.TEACHER,
      label: "Teacher",
      icon: BookOpen,
      desc: "Create exams & monitor students",
    },
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
        I am a…
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {roles.map(({ value: r, label, icon: Icon, desc }) => {
          const active = value === r;
          return (
            <button
              key={r}
              type="button"
              onClick={() => onChange(r)}
              aria-pressed={active}
              className="flex cursor-pointer flex-col items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-3 text-sm transition-all duration-150"
              style={{
                backgroundColor: active
                  ? "var(--color-primary-glow)"
                  : "var(--color-surface-2)",
                border: active
                  ? "1px solid rgba(212,175,88,0.35)"
                  : "1px solid var(--color-border)",
                color: active
                  ? "var(--color-primary)"
                  : "var(--color-text-muted)",
              }}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              <span className="font-semibold">{label}</span>
              <span
                className="text-center text-[11px] leading-tight"
                style={{
                  color: active
                    ? "var(--color-primary)"
                    : "var(--color-text-faint)",
                  opacity: 0.85,
                }}
              >
                {desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── PasswordStrength ────────────────────────────────────────────────
function PasswordStrength({ password }) {
  if (!password) return null;

  const checks = [
    { label: "8+ chars", pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
  ];

  return (
    <div className="flex gap-1.5">
      {checks.map(({ label, pass }) => (
        <span
          key={label}
          className="rounded-full px-2 py-0.5 text-[11px] transition-all duration-200"
          style={{
            backgroundColor: pass
              ? "rgba(45,212,191,0.1)"
              : "var(--color-surface-2)",
            color: pass ? "var(--color-success)" : "var(--color-text-faint)",
            border: `1px solid ${pass ? "rgba(45,212,191,0.2)" : "var(--color-border)"}`,
          }}
        >
          {pass ? "✓" : "·"} {label}
        </span>
      ))}
    </div>
  );
}

// ── ConfirmationScreen ──────────────────────────────────────────────
function ConfirmationScreen({ email }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
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

  const { register: registerUser, isRegistering } = useRegister();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: ROLES.STUDENT,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const selectedRole = watch("role");
  const passwordValue = watch("password");

  function onSubmit({ fullName, email, password, role }) {
    setConfirmedEmail(email);
    registerUser(
      { fullName, email, password, role },
      {
        onSuccess: () => setShowConfirmation(true),
      },
    );
  }

  if (showConfirmation) return <ConfirmationScreen email={confirmedEmail} />;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-[420px] rounded-[var(--radius-lg)] p-10"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] border-1 border-solid border-[var(--color-border)] bg-[var(--color-surface-2)] text-lg font-bold text-[var(--color-primary)]"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <GraduationCap strokeWidth={2.5} size={22} />
          </div>
          <div className="text-center">
            <h1
              className="text-lg font-bold tracking-tight"
              style={{ color: "var(--color-text)" }}
            >
              Create your account
            </h1>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Join EduTest today
            </p>
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

          {/* Password + strength */}
          <div className="flex flex-col gap-1.5">
            <div className="relative">
              <Lock size={15} style={iconStyle} />
              <FormInput
                hasIcon
                type="password"
                placeholder="Password"
                error={errors?.password?.message}
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "At least 8 characters" },
                })}
              />
            </div>
            <PasswordStrength password={passwordValue} />
          </div>

          {/* Role picker */}
          <input type="hidden" {...register("role")} />
          <RolePicker
            value={selectedRole}
            onChange={(v) => setValue("role", v, { shouldValidate: true })}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isRegistering}
            style={{
              width: "100%",
              height: 42,
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary)",
              color: "var(--color-bg)",
              fontSize: 14,
              fontWeight: 600,
              cursor: isRegistering ? "not-allowed" : "pointer",
              opacity: isRegistering ? 0.7 : 1,
              border: "none",
              transition: "opacity 0.15s ease",
              marginTop: 4,
            }}
          >
            {isRegistering ? "Creating account…" : "Create Account"}
          </button>

          <p
            className="mt-2 text-center text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
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
