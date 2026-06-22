import { RingLoader } from "react-loadly";

function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex h-screen items-center justify-center"
    >
      <RingLoader
        size={45}
        color="var(--color-primary)"
        speed={1}
        aria-label="Loading"
        showText={true}
        loadingText="Loading..."
        loaderCenter={true}
        borderWidth={4}
        count={3}
      />
    </div>
  );
}

export default LoadingSpinner;
