import dynamic from 'next/dynamic'
import Link from 'next/link'
const Chat = dynamic(()=>import('../components/Chat'), { ssr: false })

export default function Dashboard(){
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6">
        <section className="lg:col-span-3 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Executive Overview</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-gray-100 rounded">Revenue</div>
            <div className="p-4 bg-gray-100 rounded">Leads</div>
            <div className="p-4 bg-gray-100 rounded">Active Clients</div>
          </div>
          <div className="mb-4"><Chat /></div>
        </section>

        <aside className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link href="/api/approvals"><a className="text-blue-600">Approvals</a></Link></li>
            <li><a href="#" className="text-blue-600">Finance</a></li>
            <li><a href="#" className="text-blue-600">Sales</a></li>
          </ul>
        </aside>
      </div>
    </main>
  )
}
