'use client';

import { useEffect } from 'react';

export default function RoutingFilesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('❌ Error caught by error.tsx:', error);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-red-50 border-2 border-red-500 rounded-lg p-8">
        <div className="flex items-start gap-4">
          <div className="text-6xl">❌</div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-red-900 mb-2">
              Error Boundary Active!
            </h1>
            <p className="text-lg text-red-700 mb-4">
              This error was caught by <code className="bg-red-200 px-2 py-1 rounded">error.tsx</code>
            </p>

            <div className="bg-white border border-red-300 rounded-lg p-4 mb-6">
              <h2 className="font-semibold text-red-900 mb-2">Error Details:</h2>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Message:</strong> {error.message}
              </p>
              {error.digest && (
                <p className="text-sm text-gray-700">
                  <strong>Digest:</strong> {error.digest}
                </p>
              )}
              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-semibold text-red-800 hover:text-red-900">
                  View Stack Trace
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-64">
                  {error.stack}
                </pre>
              </details>
            </div>

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold"
              >
                🔄 Try Again (Reset Error Boundary)
              </button>
              <a
                href="/examples/routing-files"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-semibold"
              >
                ← Back to Main Page
              </a>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded">
              <h3 className="font-semibold text-blue-900 mb-2">💡 About error.tsx:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✅ Must be a Client Component (<code>'use client'</code>)</li>
                <li>✅ Catches errors in Server Components and Client Components</li>
                <li>✅ Receives <code>error</code> and <code>reset</code> props</li>
                <li>✅ Can recover without full page reload using <code>reset()</code></li>
                <li>❌ Does NOT catch errors in layouts or templates (use global error.tsx)</li>
                <li>❌ Does NOT catch errors thrown in the error.tsx itself</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-yellow-900 mb-3">
          🧪 Test Different Error Scenarios:
        </h3>
        <div className="space-y-2 text-sm">
          <p className="text-yellow-800">
            <strong>What error.tsx catches:</strong> Errors during rendering, in lifecycle methods,
            in Server Components, in Client Components
          </p>
          <p className="text-yellow-800">
            <strong>What error.tsx does NOT catch:</strong> Event handlers (use try/catch),
            async code (use error boundaries in Suspense), errors in error.tsx itself
          </p>
        </div>
      </div>
    </div>
  );
}
