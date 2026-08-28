import { useState } from 'react'
import useSWR from 'swr'

const fetcher = (url:string)=>fetch(url).then(r=>r.json())

export default function Chat(){
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<any[]>([])

  async function send(){
    if(!text) return
    setLoading(true)
    const res = await fetch('/api/orchestrator', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
    const data = await res.json()
    setMessages(m=>[...m, { from: 'user', text }, { from: 'system', text: JSON.stringify(data, null, 2) }])
    setText('')
    setLoading(false)
  }

  return (
    <div className="p-4 border rounded">
      <div className="h-64 overflow-auto mb-2 bg-gray-50 p-2">
        {messages.map((m,i)=> (
          <div key={i} className={m.from==='user'? 'text-right':'text-left'}>
            <pre className="inline-block bg-white p-2 rounded shadow text-sm">{m.text}</pre>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Ask Alex CEO... e.g. Show me today's business status" />
        <button onClick={send} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading? '...' : 'Send'}</button>
      </div>
    </div>
  )
}
