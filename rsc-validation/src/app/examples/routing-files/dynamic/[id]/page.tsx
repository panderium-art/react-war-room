import Link from 'next/link';
import { notFound } from 'next/navigation';

// This generates static params at build time (optional)
export async function generateStaticParams() {
  return [
    { id: '123' },
    { id: '456' },
    { id: '789' },
  ];
}

export default async function DynamicItemPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Simulate fetching data based on the ID
  const mockData = {
    id,
    title: `Item ${id}`,
    description: `This is a dynamically generated page for item ${id}`,
    timestamp: new Date().toISOString(),
  };

  // Example: trigger not-found for specific IDs
  if (id === '404') {
    notFound();
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6">
        <Link
          href="/examples/routing-files/dynamic"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Dynamic Routes
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-2">{mockData.title}</h1>
      <p className="text-gray-600 mb-6">Dynamic Route Parameter: <code className="bg-gray-200 px-2 py-1 rounded">{id}</code></p>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <p className="text-green-900 font-semibold mb-2">
          ✅ This page was generated dynamically!
        </p>
        <p className="text-sm text-green-700">
          The URL parameter <strong>{id}</strong> was passed to this Server Component as props
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">📊 Item Data</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-semibold text-gray-700">ID:</dt>
              <dd className="text-gray-600">{mockData.id}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Title:</dt>
              <dd className="text-gray-600">{mockData.title}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Description:</dt>
              <dd className="text-gray-600">{mockData.description}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Generated at:</dt>
              <dd className="text-gray-600">{mockData.timestamp}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-purple-900 mb-3">🧪 Try the API Route</h2>
          <p className="text-sm text-purple-700 mb-3">
            Fetch data from the route.ts API endpoint:
          </p>
          <div className="bg-white p-3 rounded border border-purple-300 mb-3">
            <code className="text-xs font-mono break-all">
              GET /examples/routing-files/api-demo?id={id}
            </code>
          </div>
          <Link
            href={`/examples/routing-files/api-demo?id=${id}`}
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
          >
            Test API Endpoint →
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">📝 How this page works:</h3>
        <pre className="bg-gray-800 text-green-400 p-4 rounded text-xs overflow-auto">
{`// File: app/examples/routing-files/dynamic/[id]/page.tsx

export default async function DynamicItemPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params; // ← Access the dynamic segment

  // Use the id to fetch data
  const data = await fetchItemById(id);

  return <div>Item {id}</div>;
}`}
        </pre>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-3">💡 Dynamic Segment Features:</h3>
        <ul className="text-sm text-yellow-800 space-y-2">
          <li>✅ <strong>params</strong> prop contains the dynamic segment value</li>
          <li>✅ Can be async Server Components (fetch data directly)</li>
          <li>✅ Can use <code className="bg-yellow-200 px-2 py-1 rounded">generateStaticParams()</code> for static generation</li>
          <li>✅ Can call <code className="bg-yellow-200 px-2 py-1 rounded">notFound()</code> if resource doesn't exist</li>
          <li>✅ Multiple dynamic segments: <code className="bg-yellow-200 px-2 py-1 rounded">[category]/[id]</code></li>
        </ul>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href="/examples/routing-files/dynamic"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          ← All Items
        </Link>
        <Link
          href="/examples/routing-files/dynamic/404"
          className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700"
        >
          Try notFound() →
        </Link>
      </div>
    </div>
  );
}
