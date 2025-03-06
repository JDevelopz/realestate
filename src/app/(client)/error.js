"use client";

import { useEffect } from "react";
import Link from "next/link";
import { handleError } from "@/utils/error";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error with our custom handler
    const handledError = handleError(error);
    console.error("Client error:", handledError);
  }, [error]);

  return (
    <div className="min-h-screen bg-background-light">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-bold text-secondary sm:text-5xl">500</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold text-primary tracking-tight sm:text-5xl">
                  Something went wrong
                </h1>
                <p className="mt-3 text-base text-text-secondary">
                  We apologize for the inconvenience. Our team has been notified
                  and is working on the issue.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <button
                  onClick={reset}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                >
                  Try again
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-secondary hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                >
                  Go back home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
}
