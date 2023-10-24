'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-3xl font-medium">Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
