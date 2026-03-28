import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white px-6 py-24 text-black md:px-10">
      <Helmet>
        <title>404 - Page Not Found | Rayhan Portfolio</title>
        <meta
          name="description"
          content="The page you are looking for could not be found on Rayhan's portfolio."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://rayhanprojects.site/404" />
      </Helmet>

      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-black/60">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Page not found</h1>
        <p className="mt-5 max-w-xl text-base text-black/70 md:text-lg">
          Sorry, the page you requested does not exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
