import React from 'react'
import DOMAccessExample from './examples/DOMAccessExample'
import MutableValueExample from './examples/MutableValueExample'
import PreviousValueExample from './examples/PreviousValueExample'
import UncontrolledInputExample from './examples/UncontrolledInputExample'
import TimerExample from './examples/TimerExample'
import CallbackRefExample from './examples/CallbackRefExample'

function App() {
  return (
    <>
      <h1>useRef Validation Tests</h1>
      <p className="subtitle">
        Comprehensive examples demonstrating various use cases and behaviors of React's useRef hook
      </p>
      <div className="examples-grid">
        <DOMAccessExample />
        <MutableValueExample />
        <PreviousValueExample />
        <UncontrolledInputExample />
        <TimerExample />
        <CallbackRefExample />
      </div>
    </>
  )
}

export default App

