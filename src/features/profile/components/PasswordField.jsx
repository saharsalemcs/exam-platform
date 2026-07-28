import { Lock, Eye, EyeOff } from "lucide-react";

const inputStyle = {
  backgroundColor: "var(--color-surface-2)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
};

function PasswordField({
  label,
  register,
  name,
  error,
  show,
  onToggleShow,
  ...rest
}) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm text-text-muted">{label}</label>
      )}
      <div className="relative">
        <Lock
          size={16}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-text-muted"
        />
        <input
          type={show ? "text" : "password"}
          {...register(name, rest.rules)}
          placeholder={rest.placeholder}
          className="w-full rounded-md py-2.5 pr-10 pl-9 outline-none"
          style={inputStyle}
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-text-muted"
        >
          {show ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-danger">{error.message}</p>}
    </div>
  );
}

export default PasswordField;
