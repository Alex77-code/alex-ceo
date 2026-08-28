import Link from 'next/link'
export default function Home(){
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Alex CEO</h1>
          <nav className="space-x-4">
            <Link href="/dashboard"><a className="text-blue-600">Dashboard</a></Link>
          </nav>
        </header>

        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Welcome to Alex CEO</h2>
          <p className="mt-2 text-sm text-gray-600">A production-grade foundation for your AI operating system. Go to the dashboard to explore.</p>
        </section>
      </div>
    </main>
  )
}
