import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GraduationCap, BookOpen, User, MailCheck } from "lucide-react";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { ROLES } from "@/constants/roles";
import FormField from "@/components/shared/FormField";
import { RingLoader } from "react-loadly";

function RegisterPage() {
  // const [showConfirmation, setShowConfirmation] = useState(false);
  // const [confirmedEmail, setConfirmedEmail] = useState("");

  // const { register: registerUser, isRegistering } = useRegister();

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   setValue,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     fullName: "",
  //     email: "",
  //     password: "",
  //     role: ROLES.STUDENT,
  //   },
  //   mode: "onTouched",
  // });

  // const selectedRole = watch("role");
  // const passwordValue = watch("password");

  // function onSubmit({ fullName, email, password, role }) {
  //   setConfirmedEmail(email);
  //   registerUser(
  //     { fullName, email, password, role },
  //     {
  //       onSuccess: () => setShowConfirmation(true),
  //     },
  //   );
  // }

  // // ── Confirmation screen ──────────────────────────────────────
  // if (showConfirmation) {
  //   return (
  //     <div className="flex min-h-screen animate-[fade-scale-in_0.4s_ease_both] items-center justify-center px-4 py-12">
  //       <div
  //         className="w-full max-w-[400px] rounded-[var(--radius-lg)] p-10 text-center"
  //         style={{
  //           backgroundColor: "var(--color-surface)",
  //           border: "1px solid var(--color-border)",
  //           boxShadow: "var(--shadow-md)",
  //         }}
  //       >
  //         <div
  //           className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[var(--radius-md)]"
  //           style={{
  //             backgroundColor: "rgba(45,212,191,0.1)",
  //             border: "1px solid rgba(45,212,191,0.2)",
  //           }}
  //         >
  //           <MailCheck size={26} style={{ color: "var(--color-success)" }} />
  //         </div>

  //         <h2
  //           className="mb-2 text-xl font-bold"
  //           style={{ color: "var(--color-text)" }}
  //         >
  //           Check your inbox
  //         </h2>
  //         <p
  //           className="mb-1 text-sm"
  //           style={{ color: "var(--color-text-muted)" }}
  //         >
  //           We sent a confirmation link to
  //         </p>
  //         <p
  //           className="mb-5 text-sm font-semibold"
  //           style={{ color: "var(--color-primary)" }}
  //         >
  //           {confirmedEmail}
  //         </p>
  //         <p className="text-sm" style={{ color: "var(--color-text-faint)" }}>
  //           Click the link in that email to activate your account, then sign in.
  //         </p>

  //         <Link
  //           to="/login"
  //           className="mt-7 inline-block text-sm font-medium no-underline hover:opacity-75"
  //           style={{ color: "var(--color-primary)" }}
  //         >
  //           Back to Sign In →
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  // // ── Register form ────────────────────────────────────────────
  // return (
  //   <div className="flex min-h-screen animate-[fade-scale-in_0.4s_ease_both] items-center justify-center px-4 py-12">
  //     <div
  //       className="w-full max-w-[420px] rounded-[var(--radius-lg)] p-10"
  //       style={{
  //         backgroundColor: "var(--color-surface)",
  //         border: "1px solid var(--color-border)",
  //         boxShadow: "var(--shadow-md)",
  //       }}
  //     >
  //       {/* Logo */}
  //       <div className="mb-8 flex flex-col items-center gap-3">
  //         <div
  //           className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]"
  //           style={{ backgroundColor: "var(--color-primary)" }}
  //         >
  //           <GraduationCap size={22} color="#0d1117" strokeWidth={2.5} />
  //         </div>
  //         <div className="text-center">
  //           <h1
  //             className="text-xl font-bold tracking-tight"
  //             style={{ color: "var(--color-text)" }}
  //           >
  //             Create your account
  //           </h1>
  //           <p
  //             className="mt-1 text-sm"
  //             style={{ color: "var(--color-text-muted)" }}
  //           >
  //             Join EduTest today
  //           </p>
  //         </div>
  //       </div>

  //       <form
  //         onSubmit={handleSubmit(onSubmit)}
  //         className="flex flex-col gap-4"
  //         noValidate
  //       >
  //         {/* Full name */}
  //         <FormField
  //           id="fullName"
  //           label="Full name"
  //           type="text"
  //           placeholder="Sahar Salem"
  //           autoComplete="name"
  //           error={errors.fullName?.message}
  //           {...register("fullName", {
  //             required: "Full name is required",
  //             minLength: { value: 2, message: "At least 2 characters" },
  //             validate: (v) =>
  //               v.trim().split(" ").length >= 2 || "Enter first and last name",
  //           })}
  //         />

  //         {/* Email */}
  //         <FormField
  //           id="email"
  //           label="Email address"
  //           type="email"
  //           placeholder="you@example.com"
  //           autoComplete="email"
  //           error={errors.email?.message}
  //           {...register("email", {
  //             required: "Email is required",
  //             pattern: {
  //               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  //               message: "Enter a valid email",
  //             },
  //           })}
  //         />

  //         {/* Password + strength pills */}
  //         <div className="flex flex-col gap-1.5">
  //           <FormField
  //             id="password"
  //             label="Password"
  //             type="password"
  //             placeholder="At least 8 characters"
  //             autoComplete="new-password"
  //             error={errors.password?.message}
  //             {...register("password", {
  //               required: "Password is required",
  //               minLength: { value: 8, message: "At least 8 characters" },
  //             })}
  //           />
  //           {passwordValue && (
  //             <div className="mt-1 flex gap-1.5">
  //               {[
  //                 { label: "8+ chars", pass: passwordValue.length >= 8 },
  //                 { label: "Uppercase", pass: /[A-Z]/.test(passwordValue) },
  //                 { label: "Number", pass: /[0-9]/.test(passwordValue) },
  //               ].map(({ label, pass }) => (
  //                 <span
  //                   key={label}
  //                   className="rounded-full px-2 py-0.5 text-[11px] transition-all duration-200"
  //                   style={{
  //                     backgroundColor: pass
  //                       ? "rgba(45,212,191,0.1)"
  //                       : "var(--color-surface-2)",
  //                     color: pass
  //                       ? "var(--color-success)"
  //                       : "var(--color-text-faint)",
  //                     border: `1px solid ${pass ? "rgba(45,212,191,0.2)" : "var(--color-border)"}`,
  //                   }}
  //                 >
  //                   {pass ? "✓" : "·"} {label}
  //                 </span>
  //               ))}
  //             </div>
  //           )}
  //         </div>

  //         {/* Role picker */}
  //         <div className="flex flex-col gap-2">
  //           <input type="hidden" {...register("role")} />
  //           <p
  //             className="text-sm font-medium"
  //             style={{ color: "var(--color-text)" }}
  //           >
  //             I am a…
  //           </p>
  //           <div className="grid grid-cols-2 gap-2.5">
  //             {[
  //               { value: ROLES.STUDENT, label: "Student", icon: User },
  //               { value: ROLES.TEACHER, label: "Teacher", icon: BookOpen },
  //             ].map(({ value: r, label, icon: Icon }) => {
  //               const active = selectedRole === r;
  //               return (
  //                 <button
  //                   key={r}
  //                   type="button"
  //                   onClick={() =>
  //                     setValue("role", r, { shouldValidate: true })
  //                   }
  //                   className="flex cursor-pointer flex-col items-center gap-2 rounded-[var(--radius-sm)] py-3.5 text-sm font-medium transition-all duration-150"
  //                   aria-pressed={active}
  //                   style={{
  //                     backgroundColor: active
  //                       ? "var(--color-primary-glow)"
  //                       : "var(--color-surface-2)",
  //                     border: active
  //                       ? "1px solid rgba(212,175,88,0.35)"
  //                       : "1px solid var(--color-border)",
  //                     color: active
  //                       ? "var(--color-primary)"
  //                       : "var(--color-text-muted)",
  //                   }}
  //                 >
  //                   <Icon size={17} />
  //                   {label}
  //                 </button>
  //               );
  //             })}
  //           </div>
  //         </div>

  //         {/* Submit */}
  //         <button
  //           type="submit"
  //           disabled={isRegistering}
  //           className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-sm)] py-2.5 text-sm font-semibold transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-60"
  //           style={{
  //             backgroundColor: "var(--color-primary)",
  //             color: "#0d1117",
  //           }}
  //           onMouseEnter={(e) => {
  //             if (!isRegistering) e.currentTarget.style.opacity = "0.85";
  //           }}
  //           onMouseLeave={(e) => {
  //             e.currentTarget.style.opacity = "1";
  //           }}
  //         >
  //           {isRegistering ? (
  //             <>
  //               <RingLoader
  //                 size={16}
  //                 color="#0d1117"
  //                 secondaryColor="rgba(0,0,0,0.2)"
  //               />{" "}
  //               Creating account…
  //             </>
  //           ) : (
  //             "Create Account"
  //           )}
  //         </button>
  //       </form>

  //       <p
  //         className="mt-6 text-center text-sm"
  //         style={{ color: "var(--color-text-muted)" }}
  //       >
  //         Already have an account?{" "}
  //         <Link
  //           to="/login"
  //           className="font-medium no-underline hover:opacity-75"
  //           style={{ color: "var(--color-primary)" }}
  //         >
  //           Sign in
  //         </Link>
  //       </p>
  //     </div>
  //   </div>
  // );

  return <></>;
}

export default RegisterPage;
