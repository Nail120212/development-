// app/dashboard/page.tsx
export default function Overview() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold neon-text glitch">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 rounded-xl">
          <h3 className="text-lg font-medium text-[var(--text-secondary)]">Total Keys Generated</h3>
          <p className="text-4xl font-black mt-2 text-[var(--accent-cyan)]">1,247</p>
        </div>
        
        <div className="card p-6 rounded-xl">
          <h3 className="text-lg font-medium text-[var(--text-secondary)]">Active Scripts</h3>
          <p className="text-4xl font-black mt-2 text-[var(--accent-magenta)]">18</p>
        </div>
        
        <div className="card p-6 rounded-xl">
          <h3 className="text-lg font-medium text-[var(--text-secondary)]">Earnings</h3>
          <p className="text-4xl font-black mt-2 text-green-400">$342.80</p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to NexusGuard</h2>
        <p className="text-[var(--text-secondary)]">
          Your powerful Roblox script protection platform. Generate keys, manage providers, and secure your work.
        </p>
      </div>
    </div>
  )
}
