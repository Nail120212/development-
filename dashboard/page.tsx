// app/dashboard/page.tsx
export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold neon-text glitch">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <p className="text-[var(--text-secondary)]">Total Keys</p>
          <p className="text-4xl font-black text-[var(--accent-cyan)] mt-2">1,342</p>
        </div>
        <div className="card p-6">
          <p className="text-[var(--text-secondary)]">Active Users</p>
          <p className="text-4xl font-black text-[var(--accent-magenta)] mt-2">87</p>
        </div>
        <div className="card p-6">
          <p className="text-[var(--text-secondary)]">Earnings</p>
          <p className="text-4xl font-black text-green-400 mt-2">$487</p>
        </div>
      </div>
    </div>
  )
}
