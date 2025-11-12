'use client'

export function WrongClientImport() {
  return (
    <div className="info-box error">
      <strong>📝 Why This Fails:</strong>
      <p style={{ marginTop: '12px' }}>
        When you add 'use client' to a component, that component and EVERYTHING it imports
        becomes part of the client bundle. React Server Components cannot be serialized
        and sent to the client.
      </p>
      <p style={{ marginTop: '12px' }}>
        <strong>Solution:</strong> Use the composition pattern (children/props) to pass
        Server Components into Client Components.
      </p>
    </div>
  )
}

