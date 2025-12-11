import Link from 'next/link';

export default function RoutingFilesNotFound() {
  return (
    <div className="max-w-4xl mx-auto p-8 flex items-center justify-center min-h-[600px]">
      <div className="text-center">
        <div className="text-9xl mb-6">🔍</div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </h2>

        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8 text-left">
          <p className="text-lg font-semibold text-yellow-900 mb-3">
            ✅ not-found.tsx is active!
          </p>
          <p className="text-gray-700 mb-4">
            This custom 404 page was rendered by{' '}
            <code className="bg-yellow-200 px-2 py-1 rounded">not-found.tsx</code>
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-white rounded border border-yellow-300">
              <p className="font-semibold text-yellow-900 mb-1">How it works:</p>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Triggered when you navigate to a non-existent route</li>
                <li>Or when <code>notFound()</code> function is called in a page</li>
                <li>Replaces the default Next.js 404 page</li>
                <li>Can be a Server Component (unlike error.tsx)</li>
              </ul>
            </div>

            <div className="p-3 bg-white rounded border border-yellow-300">
              <p className="font-semibold text-yellow-900 mb-1">File location:</p>
              <code className="text-xs font-mono text-gray-600">
                src/app/examples/routing-files/not-found.tsx
              </code>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/examples/routing-files"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            ← Back to Routing Files
          </Link>
          <Link
            href="/examples/routing-files/dynamic/123"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-semibold"
          >
            Try a Valid Route →
          </Link>
        </div>

        <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 text-left">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Testing not-found.tsx:</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>Method 1:</strong> Navigate to any non-existent URL in this segment</p>
            <p className="ml-4 text-xs font-mono text-blue-600">
              /examples/routing-files/does-not-exist
            </p>

            <p className="mt-3"><strong>Method 2:</strong> Call notFound() in a page component</p>
            <pre className="ml-4 bg-white p-2 rounded border border-blue-200 text-xs overflow-auto">
{`import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const data = await fetchData(params.id);

  if (!data) {
    notFound(); // Triggers not-found.tsx
  }

  return <div>{data.title}</div>;
}`}
            </pre>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Current URL: <code className="bg-gray-200 px-2 py-1 rounded">{typeof window !== 'undefined' ? window.location.pathname : '[server]'}</code></p>
        </div>
      </div>
    </div>
  );
}
