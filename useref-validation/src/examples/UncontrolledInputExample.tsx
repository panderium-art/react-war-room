import { useRef, useState } from 'react'

/**
 * Example 4: Uncontrolled Components
 * 
 * Validates:
 * - useRef enables uncontrolled form inputs
 * - Access input values without state
 * - Useful for forms where you only need values on submit
 */
export default function UncontrolledInputExample() {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const [submittedData, setSubmittedData] = useState<{
    name: string
    email: string
    message: string
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const data = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      message: messageRef.current?.value || '',
    }
    
    setSubmittedData(data)
    
    // Reset form
    if (nameRef.current) nameRef.current.value = ''
    if (emailRef.current) emailRef.current.value = ''
    if (messageRef.current) messageRef.current.value = ''
  }

  return (
    <div className="example-card">
      <h2>4. Uncontrolled Components</h2>
      <p>Access form values without state using refs.</p>

      <form onSubmit={handleSubmit}>
        <input
          ref={nameRef}
          type="text"
          placeholder="Name"
          defaultValue="John Doe"
        />
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          defaultValue="john@example.com"
        />
        <textarea
          ref={messageRef}
          placeholder="Your message..."
          rows={3}
          defaultValue="Hello!"
        />
        <button type="submit">Submit Form</button>
      </form>

      {submittedData && (
        <div className="result">
          <div><strong>Submitted Data:</strong></div>
          <div>Name: {submittedData.name}</div>
          <div>Email: {submittedData.email}</div>
          <div>Message: {submittedData.message}</div>
        </div>
      )}
    </div>
  )
}

