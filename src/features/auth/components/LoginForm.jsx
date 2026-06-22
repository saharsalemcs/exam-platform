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
    mode: "onTouched",
  });

  useEffect(
    function () {
      if (userData?.profile && !isFetchingUser) {
        const dest =
          userData.profile.role === "teacher"
            ? "/teacher/dashboard"
            : "/student/dashboard";

        navigate(dest, { replace: true });
      }
    },
    [isFetchingUser, navigate, userData],
  );

  if (isFetchingUser) return <LoadingSpinner />;

  function onSubmit({ email, password }) {
    console.log(email);
    console.log(password);
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
          <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border-1 border-solid border-[var(--color-border)] bg-[var(--color-surface-2)] text-lg font-bold text-[var(--color-primary)]">
            <GraduationCap />
          </div>

          <div className="text-center">
            <h1 className="m-0 text-lg font-bold tracking-tight text-[var(--color-text)]">
              Welcome Back to EduTest
            </h1>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              sign in to continue
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div className="relative">
            <Mail
              style={{
                position: "absolute",
                width: 16,
                height: 16,
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-text-muted)",
                zIndex: 1, // للتأكد من ظهور الأيقونة فوق المدخل
              }}
            />
            <FormInput
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
              error={errors?.email?.message}
            />
          </div>

          {/* Pass */}
          <div className="relative">
            <Lock
              style={{
                position: "absolute",
                width: 16,
                height: 16,
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-text-muted)",
                zIndex: 1,
              }}
            />
            <FormInput
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password needs to be at least 8 characters",
                },
              })}
              error={errors?.password?.message}
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn} // تعطيل الزر أثناء تسجيل الدخول
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
            }}
          >
            {isLoggingIn ? "Signing In..." : "Sign In"}
          </button>

          <p
            style={{
              fontSize: 12,
              textAlign: "center",
              color: "var(--color-text-muted)",
              marginTop: 16,
              marginBottom: 0,
            }}
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
