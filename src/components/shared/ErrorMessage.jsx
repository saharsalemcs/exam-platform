function ErrorMessage({ message }) {
  if (!message) return null;
  return <p className="text-sm text-danger">{message}</p>;
}

export default ErrorMessage;
