function ErrorMessage({ message }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-danger">{message}</p>;
}

export default ErrorMessage;
