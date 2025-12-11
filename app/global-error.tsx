"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-red-100 p-4 text-center text-red-900">
          <h1 className="text-3xl font-bold">Something went wrong!</h1>
          <p className="my-4">{error.message}</p>
          <button
            className="mt-6 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            onClick={() => reset()}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
