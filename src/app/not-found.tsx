import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-3xl">Page Not Found</h2>
      </div>

      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-600">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="text-light-blue-900 hover:underline">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
}
