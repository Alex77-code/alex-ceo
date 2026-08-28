import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { requireRole } from '../../../lib/rbac'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = await requireRole(req, ['admin'])
  if (auth.error === 'unauthenticated') return res.status(401).json({ error: 'unauthenticated' })
  if (auth.error === 'forbidden') return res.status(403).json({ error: 'forbidden' })

  if (req.method === 'GET') {
    const approvals = await prisma.approval.findMany({ orderBy: { requestedAt: 'desc' }, take: 50 })
    return res.json({ approvals })
  }

  if (req.method === 'POST') {
    const { id, action } = req.body
    if (!id || !['approve', 'reject'].includes(action)) return res.status(400).json({ error: 'id & valid action required' })
    const approval = await prisma.approval.findUnique({ where: { id } })
    if (!approval) return res.status(404).json({ error: 'not-found' })
    if (approval.status !== 'PENDING') return res.status(409).json({ error: 'approval-already-decided' })

    const status = action === 'approve' ? 'APPROVED' : 'REJECTED'
    const updated = await prisma.approval.update({
      where: { id },
      data: { status, reviewedAt: new Date(), reviewedBy: auth.user!.id },
    })
    return res.json({ approval: updated })
  }

  res.setHeader('Allow', 'GET,POST')
  return res.status(405).end()
}
