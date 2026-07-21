import { cloneElement, isValidElement } from "react";

function FormRow({ label, children, error, id, required = false }) {
  const child =
    id && isValidElement(children)
      ? cloneElement(children, { id: children.props.id ?? id })
      : children;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-bold tracking-wider text-text-muted uppercase"
      >
        {label} {required && <span className="text-danger">*</span>}
      </label>

      {child}

      {error && (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormRow;
