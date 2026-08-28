import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { getUserFromReq } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const user = await getUserFromReq(req)
  if(!user) return res.status(401).json({ error: 'unauth' })
  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role.name } })
}
