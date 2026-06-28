import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

const FormInput = forwardRef(function FormInput(
  { type = "text", placeholder, error, onFocus, onBlur, ...rest },
  ref,
) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          style={{
            width: "100%",
            height: 42,
            paddingLeft: 38,
            paddingRight: isPassword ? 40 : 14,
            borderRadius: "var(--radius-sm)",
            border: error
              ? "1px solid var(--color-danger)"
              : isFocused
                ? "1px solid var(--color-primary)"
                : "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface-2)",
            color: "var(--color-text)",
            fontSize: 14,
            outline: "none",
            transition: "border-color 0.15s ease",
          }}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>

      {error && (
        <p
          className="text-xs"
          style={{ color: "var(--color-danger)" }}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default FormInput;
