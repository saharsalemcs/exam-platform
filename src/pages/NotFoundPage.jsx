import Button from "@/components/shared/Button";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen animate-fade-up flex-col items-center justify-center bg-bg p-6 text-center">
      <h1 className="mb-4 text-6xl font-bold tracking-tight text-text">
        ERROR 404
      </h1>
      <h3 className="mb-6 text-3xl font-semibold text-text">Page Not Found</h3>

      <p className="mx-auto mb-10 max-w-5xl text-base text-text-muted sm:text-lg md:text-lg">
        The page you're looking for doesn't exist, or was moved.
      </p>

      <Button size="lg" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </div>
  );
}

export default NotFoundPage;
