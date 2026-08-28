import { useEffect, useState } from 'react'
import Link from 'next/link'

type Approval = {
  id: string
  action: string
  payload?: unknown
  level: string
  status: string
  requestedBy?: string
  requestedAt: string
}

export default function Approvals() {
  const [approvals, setApprovals] = useState<Approval[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function load() {
    const token = localStorage.getItem('alex_token')
    if (!token) {
      window.location.href = '/login'
      return
    }
    const response = await fetch('/api/approvals', { headers: { Authorization: `Bearer ${token}` } })
    const data = await response.json()
    if (!response.ok) {
      setError(data.error || 'Unable to load approvals')
      setLoading(false)
      return
    }
    setApprovals(data.approvals || [])
    setLoading(false)
  }

  async function decide(id: string, action: 'approve' | 'reject') {
    const token = localStorage.getItem('alex_token')
    const response = await fetch('/api/approvals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token || ''}` },
      body: JSON.stringify({ id, action }),
    })
    const data = await response.json()
    if (!response.ok) return setError(data.error || 'Action failed')
    await load()
  }

  useEffect(() => { load() }, [])

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div><p className="text-sm font-semibold text-blue-600">ALEX CEO</p><h1 className="text-3xl font-bold">Approvals</h1></div>
          <Link href="/dashboard" className="text-blue-600 font-medium">← Dashboard</Link>
        </div>
        {error && <div className="mb-4 rounded-xl bg-red-50 text-red-700 p-4">{error}</div>}
        {loading ? <div className="bg-white rounded-xl p-6">Loading approvals…</div> : approvals.length === 0 ? <div className="bg-white rounded-xl p-6">No approval records.</div> : (
          <div className="space-y-4">
            {approvals.map(item => (
              <section key={item.id} className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2"><h2 className="font-semibold">{item.action}</h2><span className="text-xs rounded-full bg-slate-100 px-2 py-1">{item.level}</span><span className="text-xs rounded-full bg-slate-100 px-2 py-1">{item.status}</span></div>
                    <p className="text-sm text-slate-500 mt-1">Requested {new Date(item.requestedAt).toLocaleString()}</p>
                    {item.payload && <pre className="mt-3 max-h-40 overflow-auto rounded-lg bg-slate-950 text-slate-100 p-3 text-xs">{JSON.stringify(item.payload, null, 2)}</pre>}
                  </div>
                  {item.status === 'PENDING' && <div className="flex gap-2"><button onClick={() => decide(item.id, 'approve')} className="rounded-lg bg-emerald-600 text-white px-4 py-2">Approve</button><button onClick={() => decide(item.id, 'reject')} className="rounded-lg bg-red-600 text-white px-4 py-2">Reject</button></div>}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
