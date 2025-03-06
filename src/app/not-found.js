import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="mt-6 text-4xl font-bold text-primary">404</h1>
          <h2 className="mt-2 text-2xl font-semibold text-text-primary">
            Page Not Found
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-light"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
