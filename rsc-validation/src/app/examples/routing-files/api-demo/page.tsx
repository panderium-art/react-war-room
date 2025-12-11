'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ApiDemoPage() {
  const searchParams = useSearchParams();
  const itemId = searchParams.get('id') || '123';

  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [requestBody, setRequestBody] = useState('{\n  "name": "Test Item",\n  "value": 42\n}');

  const testApi = async (httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE') => {
    setLoading(true);
    setMethod(httpMethod);

    try {
      const options: RequestInit = {
        method: httpMethod,
      };

      if (httpMethod === 'POST' || httpMethod === 'PUT') {
        options.headers = {
          'Content-Type': 'application/json',
        };
        options.body = requestBody;
      }

      const url = httpMethod === 'GET' || httpMethod === 'DELETE'
        ? `/examples/routing-files/api-demo?id=${itemId}`
        : '/examples/routing-files/api-demo';

      const response = await fetch(url, options);
      const data = await response.json();

      setApiResponse({
        status: response.status,
        statusText: response.statusText,
        data,
      });
    } catch (error) {
      setApiResponse({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6">
        <Link
          href="/examples/routing-files"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Routing Files
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-6">🛣️ Route Handler (route.ts) Demo</h1>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <p className="text-green-900 font-semibold mb-2">
          ✅ API Route Handler Active
        </p>
        <p className="text-sm text-green-700">
          This page demonstrates <code className="bg-green-200 px-2 py-1 rounded">route.ts</code> -
          Next.js API routes that handle HTTP requests (GET, POST, PUT, DELETE)
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* API Request Panel */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📤 Test API Endpoints</h2>

          <div className="space-y-3 mb-4">
            <button
              onClick={() => testApi('GET')}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
            >
              GET - Fetch Data
            </button>
            <button
              onClick={() => testApi('POST')}
              disabled={loading}
              className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-semibold"
            >
              POST - Create Data
            </button>
            <button
              onClick={() => testApi('PUT')}
              disabled={loading}
              className="w-full bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 font-semibold"
            >
              PUT - Update Data
            </button>
            <button
              onClick={() => testApi('DELETE')}
              disabled={loading}
              className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400 font-semibold"
            >
              DELETE - Remove Data
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Request Body (for POST/PUT):
            </label>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm"
            />
          </div>
        </div>

        {/* API Response Panel */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📥 API Response</h2>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : apiResponse ? (
            <div>
              <div className="bg-white p-3 rounded border border-gray-300 mb-3">
                <p className="text-sm">
                  <strong>Method:</strong> <span className="font-mono">{method}</span>
                </p>
                {apiResponse.status && (
                  <p className="text-sm">
                    <strong>Status:</strong>{' '}
                    <span className={`font-mono ${apiResponse.status < 400 ? 'text-green-600' : 'text-red-600'}`}>
                      {apiResponse.status} {apiResponse.statusText}
                    </span>
                  </p>
                )}
              </div>
              <div className="bg-gray-800 text-green-400 p-4 rounded overflow-auto max-h-96">
                <pre className="text-xs">
                  {JSON.stringify(apiResponse.data || apiResponse, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              Click a button to test the API
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-blue-900 mb-3">📝 route.ts Example:</h3>
        <pre className="bg-gray-800 text-green-400 p-4 rounded text-xs overflow-auto">
{`// File: app/examples/routing-files/api-demo/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  return NextResponse.json({
    success: true,
    id,
    data: { /* ... */ }
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    created: body
  }, { status: 201 });
}`}
        </pre>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-3">💡 Route Handler Features:</h3>
        <ul className="text-sm text-yellow-800 space-y-2">
          <li>✅ <strong>API Endpoints:</strong> Handle HTTP requests (GET, POST, PUT, DELETE, PATCH)</li>
          <li>✅ <strong>Server-side only:</strong> Runs on the server, can access databases/secrets</li>
          <li>✅ <strong>Cannot coexist with page.tsx:</strong> Same segment can't have both</li>
          <li>✅ <strong>Dynamic segments:</strong> Can use [param] in folder names</li>
          <li>✅ <strong>TypeScript support:</strong> Full type safety with NextRequest/NextResponse</li>
          <li>✅ <strong>Web APIs:</strong> Uses standard Request/Response APIs</li>
        </ul>
      </div>

      <div className="mt-6 bg-purple-50 border border-purple-300 rounded-lg p-4">
        <p className="text-sm text-purple-800">
          <strong>📍 API Endpoint URL:</strong>{' '}
          <code className="bg-purple-200 px-2 py-1 rounded">
            /examples/routing-files/api-demo
          </code>
        </p>
      </div>
    </div>
  );
}
