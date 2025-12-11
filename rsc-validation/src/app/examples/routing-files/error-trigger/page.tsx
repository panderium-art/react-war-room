'use client';

import { useState } from 'react';

export default function ErrorTriggerPage() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    // This will be caught by error.tsx
    throw new Error('This is a test error triggered from error-trigger/page.tsx!');
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6">❌ Error Boundary Demo</h1>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <p className="text-red-900 font-semibold mb-2">
          ⚠️ Warning: This page will trigger an error!
        </p>
        <p className="text-sm text-red-700">
          Click the button below to throw an error that will be caught by error.tsx
        </p>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShouldError(true)}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold"
        >
          💥 Trigger Error (Will activate error.tsx)
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 mb-3">🧪 What happens when you click:</h3>
        <ol className="text-sm text-yellow-800 space-y-2 list-decimal list-inside">
          <li>Component state changes to trigger an error</li>
          <li>Component throws an error during render</li>
          <li>error.tsx catches the error</li>
          <li>You'll see the custom error UI defined in error.tsx</li>
          <li>You can reset the error boundary and try again</li>
        </ol>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-300">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Error Boundary Behavior:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✅ Catches errors in render phase</li>
          <li>✅ Catches errors in lifecycle methods</li>
          <li>✅ Catches errors in Server Components</li>
          <li>✅ Provides reset() function to recover</li>
          <li>❌ Does NOT catch errors in event handlers (need try/catch)</li>
          <li>❌ Does NOT catch errors in async code outside render</li>
        </ul>
      </div>

      <div className="mt-6">
        <a
          href="/examples/routing-files"
          className="text-blue-600 hover:underline"
        >
          ← Back to Routing Files (or trigger error above)
        </a>
      </div>
    </div>
  );
}
