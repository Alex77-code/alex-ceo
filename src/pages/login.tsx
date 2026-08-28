import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('ceo@company.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('alex_token', data.token)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-5">
        <div>
          <p className="text-sm font-semibold text-blue-600">ALEX CEO</p>
          <h1 className="text-3xl font-bold mt-1">Secure sign in</h1>
          <p className="text-sm text-slate-500 mt-2">Command center access with role-based permissions.</p>
        </div>
        <label className="block text-sm font-medium">Email<input className="mt-1 w-full rounded-lg border p-3" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
        <label className="block text-sm font-medium">Password<input className="mt-1 w-full rounded-lg border p-3" type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
        {error && <p className="rounded-lg bg-red-50 text-red-700 p-3 text-sm">{error}</p>}
        <button disabled={loading} className="w-full rounded-lg bg-blue-600 text-white p-3 font-semibold disabled:opacity-50">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
