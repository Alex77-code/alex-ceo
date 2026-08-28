import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import bcrypt from 'bcryptjs'
import { signToken, getUserFromReq } from '../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'POST'){
    const { email, password } = req.body
    if(!email || !password) return res.status(400).json({ error: 'email & password required' })
    const user = await prisma.user.findUnique({ where: { email }, include: { role: true } })
    if(!user) return res.status(401).json({ error: 'invalid' })
    const ok = await bcrypt.compare(password, user.password)
    if(!ok) return res.status(401).json({ error: 'invalid' })
    const token = signToken({ id: user.id, role: user.role.name })
    await prisma.session.create({ data: { userId: user.id, token } })
    res.json({ token })
  }else if(req.method === 'GET'){
    const user = await getUserFromReq(req)
    if(!user) return res.status(401).json({ error: 'unauth' })
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role.name } })
  }else{
    res.setHeader('Allow', 'GET,POST')
    res.status(405).end()
  }
}
