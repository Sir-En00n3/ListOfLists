'use client';

import { useEffect } from 'react';

type GlobalErrorProps = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('An error occurred:', error);
  }, [error]);

  return (
    <html lang="en">
    <body>
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-900 text-center p-4">
      <h1 className="text-3xl font-bold">Something went wrong!</h1>
      <p className="my-4">{error.message}</p>
      <button
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
    </body>
    </html>
  );
}