import { NextApiRequest, NextApiResponse } from 'next'
import { orchestrate } from '../../../server/orchestrator'
import { getUserFromReq } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const user = await getUserFromReq(req)
  if(!user) return res.status(401).json({ error: 'unauth' })
  if(req.method !== 'POST') return res.status(405).end()
  const { text } = req.body
  if(!text) return res.status(400).json({ error: 'text required' })
  try{
    const result = await orchestrate({ userId: user.id, text })
    res.json(result)
  }catch(e:any){
    res.status(500).json({ error: e.message })
  }
}
