// features/auth/pages/ForgotPasswordPage.jsx
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Mail, Send } from "lucide-react";
import toast from "react-hot-toast";
import FormInput from "@/components/shared/FormInput";
import Button from "@/components/shared/Button";
import { forgotPassword } from "../services/authApi";

const iconStyle = {
  position: "absolute",
  left: 13,
  top: 21,
  transform: "translateY(-50%)",
  color: "var(--color-text-muted)",
  pointerEvents: "none",
  zIndex: 1,
};

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  async function onSubmit({ email }) {
    try {
      await forgotPassword(email);
      toast.success("Reset link sent! Check your inbox.");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 py-12">
      <div
        className="w-full max-w-[500px] rounded-[var(--radius-lg)] border border-border bg-surface p-10"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <h1 className="text-xl font-bold tracking-tight text-text">
          Forgot Password
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Enter your email and we'll send you a reset link
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col gap-2"
          noValidate
        >
          <label className="text-[15px] text-text-muted">Email Address</label>
          <div className="relative">
            <Mail size={15} style={iconStyle} />
            <FormInput
              hasIcon
              type="email"
              placeholder="you@example.com"
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

          <Button type="submit" disabled={isSubmitting} className="mt-4">
            <Send size={16} />
            {isSubmitting ? "Sending…" : "Send Reset Link"}
          </Button>

          <p className="mt-4 text-center text-xs text-text-muted">
            Remembered your password?{" "}
            <Link
              to="/login"
              style={{ color: "var(--color-accent)", fontWeight: 600 }}
            >
              Back to Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
