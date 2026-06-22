import { useState } from "react";

function FormInput({ type, placeholder, error, onFocus, onBlur, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <input
        style={{
          width: "100%",
          border: isFocused
            ? "1px solid var(--color-primary)"
            : "1px solid var(--color-border)",
          height: 42,
          paddingLeft: 40,
          paddingRight: 12,
          borderRadius: "var(--radius-sm)",
          color: "var(--color-text-muted)",
          outline: "none",
          fontSize: 14,
          backgroundColor: "var(--color-surface-2)",
          transition: "border-color 0.2s ease", // حركة ناعمة أثناء التحديد
        }}
        type={type}
        placeholder={placeholder}
        {...rest}
        onFocus={(e) => {
          setIsFocused(true);
          if (onFocus) onFocus(e); // لضمان عدم تعارضها مع react-hook-form
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e); // لضمان عدم تعارضها مع react-hook-form
        }}
      />

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
}

export default FormInput;
