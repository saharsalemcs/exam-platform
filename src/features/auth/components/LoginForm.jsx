import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { GraduationCap, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import FormInput from "@/components/shared/FormInput";

function LoginForm() {
  const { data: userData, isLoading: isFetchingUser } = useUser();
  const { login, isLoggingIn } = useLogin();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },

    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (userData?.profile && !isFetchingUser) {
      const dest =
        userData.profile.role === "teacher"
          ? "/teacher/dashboard"
          : "/student/dashboard";
      navigate(dest, { replace: true });
    }
  }, [isFetchingUser, navigate, userData]);

  if (isFetchingUser) return <LoadingSpinner />;

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-[400px] rounded-[var(--radius-lg)] p-10"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border-1 border-solid border-[var(--color-border)] bg-[var(--color-surface-2)] text-lg font-bold text-[var(--color-primary)]"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <GraduationCap strokeWidth={2.5} size={22} />
          </div>
          <div className="text-center">
            <h1
              className="text-lg font-bold tracking-tight"
              style={{ color: "var(--color-text)" }}
            >
              Welcome Back to EduTest
            </h1>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Sign in to continue
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          {/* Email */}
          <div className="relative">
            <Mail
              size={15}
              style={{
                position: "absolute",
                left: 13,
                top: 21,
                transform: "translateY(-50%)",
                color: "var(--color-text-muted)",
                pointerEvents: "none",
                zIndex: 1,
                width: 16,
                height: 16,
              }}
            />
            <FormInput
              type="email"
              placeholder="Email Address"
              error={errors?.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={15}
              style={{
                position: "absolute",
                left: 13,
                top: 21,
                transform: "translateY(-50%)",
                color: "var(--color-text-muted)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
            <FormInput
              type="password"
              placeholder="Password"
              error={errors?.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password needs to be at least 8 characters",
                },
              })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            style={{
              width: "100%",
              height: 42,
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary)",
              color: "var(--color-bg)",
              fontSize: 14,
              fontWeight: 600,
              cursor: isLoggingIn ? "not-allowed" : "pointer",
              opacity: isLoggingIn ? 0.7 : 1,
              border: "none",
              transition: "opacity 0.15s ease",
            }}
          >
            {isLoggingIn ? "Signing In..." : "Sign In"}
          </button>

          <p
            className="mt-4 text-center text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "var(--color-accent)", fontWeight: 600 }}
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
