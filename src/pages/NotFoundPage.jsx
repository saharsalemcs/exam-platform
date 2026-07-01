import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen animate-fade-up flex-col items-center justify-center bg-bg p-6">
      <h1 className="mb-4 text-6xl font-bold tracking-tight text-text">
        ERROR 404
      </h1>
      <h3 className="mb-6 text-3xl font-semibold text-text">Page Not Found</h3>

      <p className="mb-10 text-base text-text-muted md:text-lg">
        The page you're looking for doesn't exist, or was moved.
      </p>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default NotFoundPage;
