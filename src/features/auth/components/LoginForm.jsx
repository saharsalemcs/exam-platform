import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { AlertCircle, GraduationCap, Lock, Mail } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: userData, isLoading: isFetchingUser } = useUser();
  const navigate = useNavigate();

  let error = "fskdls";

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

        <form className="flex flex-col gap-4">
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
              }}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid var(--color-border)",
                height: 42,
                paddingLeft: 40,
                paddingRight: 12,
                borderRadius: "var(--radius-md)",
                color: "var(--color-text-muted)",
                outline: "none",
                fontSize: 14,
                background: "var(--color-surface-2)",
              }}
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
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                border: "1px solid var(--color-border)",
                height: 42,
                paddingLeft: 40,
                paddingRight: 42,
                borderRadius: "var(--radius-md)",
                color: "var(--color-text-muted)",
                outline: "none",
                fontSize: 14,
                background: "var(--color-surface-2)",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              height: 42,
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary)",
              color: "var(--color-bg)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sign In
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
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
