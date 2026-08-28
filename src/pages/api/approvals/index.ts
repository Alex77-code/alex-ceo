import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
    const approvals = await prisma.approval.findMany({ orderBy: { requestedAt: 'desc' }, take: 50 })
    res.json({ approvals })
  }else if(req.method === 'POST'){
    const { id, action } = req.body
    if(!id || !action) return res.status(400).json({ error: 'id & action required' })
    const approval = await prisma.approval.findUnique({ where: { id } })
    if(!approval) return res.status(404).json({ error: 'not-found' })
    const status = action === 'approve' ? 'APPROVED' : 'REJECTED'
    const updated = await prisma.approval.update({ where: { id }, data: { status, reviewedAt: new Date(), reviewedBy: 'web' } })
    res.json({ approval: updated })
  }else{
    res.setHeader('Allow', 'GET,POST')
    res.status(405).end()
  }
}
