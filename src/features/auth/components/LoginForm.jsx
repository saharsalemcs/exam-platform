import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { GraduationCap, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import FormInput from "@/components/shared/FormInput";
import Button from "@/components/shared/Button";
import { useSignInWithGoogle } from "../hooks/useSignInWithGoogle";

function LoginForm() {
  const { data: userData, isLoading: isFetchingUser } = useUser();
  const { login, isLoggingIn } = useLogin();
  const { singInWithGoogle, isSigningIn } = useSignInWithGoogle();
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
      const { profile } = userData;

      if (profile.role === "teacher") {
        navigate("/instructor/dashboard", { replace: true });
        return;
      }

      // Student: check profile completeness
      const isProfileComplete = profile.grade && profile.department;
      navigate(isProfileComplete ? "/student/dashboard" : "/complete-profile", {
        replace: true,
      });
    }
  }, [isFetchingUser, navigate, userData]);

  if (isFetchingUser) return <LoadingSpinner />;

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-12">
      <div
        className="w-full max-w-[400px] rounded-lg border border-border bg-surface p-10"
        style={{
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface-2 text-lg font-bold text-primary"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <GraduationCap strokeWidth={2.5} size={22} />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold tracking-tight text-text">
              Welcome Back to EduTest
            </h1>
            <p className="mt-1 text-sm text-text-muted">Sign in to continue</p>
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
                  value: 6,
                  message: "Password needs to be at least 6 characters",
                },
              })}
            />
          </div>
          <Link
            to="/forgot-password"
            className="text-right text-xs text-primary hover:underline"
          >
            Forgot password?
          </Link>

          <Button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? "Signing In..." : "Sign In"}
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
            {isSigningIn ? "Redirecting…" : "Sign in with Google"}
          </Button>

          <p
            className="mt-4 text-center text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-accent">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
