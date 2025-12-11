import Link from 'next/link';

export default function DynamicRoutesPage() {
  const exampleIds = [123, 456, 789, 'abc', 'xyz'];

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6">🎯 Dynamic Routes Demo</h1>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
        <p className="text-indigo-900 font-semibold mb-2">
          Dynamic routes use [param] syntax in folder names
        </p>
        <p className="text-sm text-indigo-700">
          Click the examples below to see dynamic routing in action!
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Try Dynamic Routes:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {exampleIds.map((id) => (
            <Link
              key={id}
              href={`/examples/routing-files/dynamic/${id}`}
              className="bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 text-center"
            >
              View Item {id}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">📁 File Structure:</h3>
        <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-auto">
{`routing-files/
├── dynamic/
│   ├── page.tsx          ← You are here
│   └── [id]/
│       ├── page.tsx      ← Dynamic page for /dynamic/123
│       └── route.ts      ← API endpoint at /api/dynamic/[id]`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="border-2 border-blue-300 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-3">📄 Dynamic Page ([id]/page.tsx)</h3>
          <p className="text-sm text-gray-700 mb-3">
            Server Component that receives params as props
          </p>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
{`export default async function Page({
  params
}: {
  params: { id: string }
}) {
  const { id } = params;
  return <div>Item {id}</div>;
}`}
          </pre>
        </div>

        <div className="border-2 border-green-300 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-3">🛣️ API Route ([id]/route.ts)</h3>
          <p className="text-sm text-gray-700 mb-3">
            API endpoint that handles HTTP requests
          </p>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
{`export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return Response.json({ id });
}`}
          </pre>
        </div>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-3">💡 Key Concepts:</h3>
        <ul className="text-sm text-yellow-800 space-y-2">
          <li>
            <strong>[param]</strong> - Single dynamic segment
            <code className="ml-2 bg-yellow-200 px-2 py-1 rounded text-xs">/blog/[slug]</code>
          </li>
          <li>
            <strong>[...param]</strong> - Catch-all segments
            <code className="ml-2 bg-yellow-200 px-2 py-1 rounded text-xs">/shop/[...categories]</code>
          </li>
          <li>
            <strong>[[...param]]</strong> - Optional catch-all
            <code className="ml-2 bg-yellow-200 px-2 py-1 rounded text-xs">/docs/[[...slug]]</code>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <Link
          href="/examples/routing-files"
          className="text-blue-600 hover:underline"
        >
          ← Back to Routing Files
        </Link>
      </div>
    </div>
  );
}
