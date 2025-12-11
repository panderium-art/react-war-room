// This is a Server Component (default in App Router)
// It demonstrates sequential data fetching where each request waits for the previous

// Simulated API functions
async function fetchCompany() {
  await new Promise(resolve => setTimeout(resolve, 1000)) // 1s delay
  return {
    id: 1,
    name: 'TechCorp Inc.',
    industry: 'Software'
  }
}

async function fetchDepartments(companyId: number) {
  await new Promise(resolve => setTimeout(resolve, 1200)) // 1.2s delay
  // This request depends on company data
  return [
    { id: 1, name: 'Engineering', employees: 45 },
    { id: 2, name: 'Design', employees: 12 },
    { id: 3, name: 'Marketing', employees: 8 }
  ]
}

async function fetchEmployees(departmentId: number) {
  await new Promise(resolve => setTimeout(resolve, 800)) // 0.8s delay
  // This request depends on department data
  return [
    { id: 1, name: 'Alice Johnson', position: 'Senior Engineer' },
    { id: 2, name: 'Bob Smith', position: 'Tech Lead' },
    { id: 3, name: 'Carol White', position: 'Engineer' }
  ]
}

export default async function SequentialFetchServer() {
  const startTime = Date.now()
  const timings: { step: string; duration: number }[] = []

  // ⚠️ SEQUENTIAL FETCHING - Each request waits for the previous
  // Total time = sum of all requests (3s)

  const stepStart1 = Date.now()
  const company = await fetchCompany()
  timings.push({ step: 'Company', duration: Date.now() - stepStart1 })

  const stepStart2 = Date.now()
  const departments = await fetchDepartments(company.id)
  timings.push({ step: 'Departments', duration: Date.now() - stepStart2 })

  const stepStart3 = Date.now()
  // Fetching employees for first department
  const employees = await fetchEmployees(departments[0].id)
  timings.push({ step: 'Employees', duration: Date.now() - stepStart3 })

  const totalTime = Date.now() - startTime

  return (
    <div style={{ margin: '1rem 0' }}>
      {/* Data Display */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        {/* Step 1: Company */}
        <StepCard step={1} title="Company Data" timing={timings[0]}>
          <p style={{ margin: '0.5rem 0' }}><strong>Name:</strong> {company.name}</p>
          <p style={{ margin: '0.5rem 0' }}><strong>Industry:</strong> {company.industry}</p>
          <div style={{
            marginTop: '1rem',
            padding: '0.5rem',
            background: '#fff3cd',
            borderRadius: '4px',
            fontSize: '0.85rem'
          }}>
            ⏳ Waited for this before fetching departments
          </div>
        </StepCard>

        {/* Step 2: Departments */}
        <StepCard step={2} title="Departments" timing={timings[1]}>
          {departments.map(dept => (
            <div key={dept.id} style={{
              padding: '0.5rem',
              marginBottom: '0.5rem',
              background: '#f5f5f5',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 500 }}>{dept.name}</div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>{dept.employees} employees</div>
            </div>
          ))}
          <div style={{
            marginTop: '1rem',
            padding: '0.5rem',
            background: '#fff3cd',
            borderRadius: '4px',
            fontSize: '0.85rem'
          }}>
            ⏳ Waited for this before fetching employees
          </div>
        </StepCard>

        {/* Step 3: Employees */}
        <StepCard step={3} title={`${departments[0].name} Team`} timing={timings[2]}>
          {employees.map(emp => (
            <div key={emp.id} style={{
              padding: '0.5rem',
              marginBottom: '0.5rem',
              background: '#f5f5f5',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 500 }}>{emp.name}</div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>{emp.position}</div>
            </div>
          ))}
        </StepCard>
      </div>

      {/* Performance Waterfall */}
      <div style={{
        padding: '1.5rem',
        background: '#fff3cd',
        borderRadius: '8px',
        border: '2px solid #ff9800'
      }}>
        <strong>⚠️ Sequential Performance (Waterfall):</strong>
        <div style={{ marginTop: '1rem' }}>
          {timings.map((timing, index) => (
            <div key={timing.step} style={{ marginBottom: '0.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.25rem'
              }}>
                <span style={{ minWidth: '120px', fontSize: '0.9rem' }}>
                  Step {index + 1}: {timing.step}
                </span>
                <div style={{
                  height: '20px',
                  width: `${(timing.duration / totalTime) * 100}%`,
                  background: `hsl(${index * 60}, 70%, 60%)`,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {timing.duration}ms
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: 'white',
          borderRadius: '4px'
        }}>
          <strong>Total Time: {totalTime}ms</strong>
          <br />
          <small style={{ color: '#666' }}>
            Each request waited for the previous to complete. In parallel, this could be ~{Math.max(...timings.map(t => t.duration))}ms!
          </small>
        </div>
      </div>

      {/* Use Case */}
      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        background: '#e3f2fd',
        borderRadius: '8px',
        border: '1px solid #2196f3'
      }}>
        <strong>💡 When to use sequential fetching:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li>When data from one request is needed for the next request</li>
          <li>When you need to make decisions based on previous responses</li>
          <li>When API rate limiting requires spacing out requests</li>
        </ul>
      </div>
    </div>
  )
}

function StepCard({
  step,
  title,
  timing,
  children
}: {
  step: number
  title: string
  timing: { step: string; duration: number }
  children: React.ReactNode
}) {
  return (
    <div style={{
      padding: '1.5rem',
      background: 'white',
      borderRadius: '8px',
      border: '2px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '12px',
        background: '#ff9800',
        color: 'white',
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.85rem',
        fontWeight: 'bold'
      }}>
        Step {step}
      </div>
      <h3 style={{ marginTop: '0.5rem', marginBottom: '1rem', color: '#333' }}>{title}</h3>
      {children}
      <div style={{
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #e0e0e0',
        fontSize: '0.8rem',
        color: '#999'
      }}>
        Loaded in {timing.duration}ms
      </div>
    </div>
  )
}
