import { cloneElement, isValidElement } from "react";

function FormRow({ label, children, error, id, required = false, style }) {
  const child =
    id && isValidElement(children)
      ? cloneElement(children, { id: children.props.id ?? id })
      : children;

  return (
    <div className="flex flex-col gap-sm">
      <label
        htmlFor={id}
        className={`text-xs font-semibold tracking-wider text-text-muted uppercase`}
        style={style}
      >
        {label} {required && <span className="text-danger">*</span>}
      </label>

      {child}

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormRow;
