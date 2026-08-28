import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret'
const TOKEN_EXP = '8h'

export function signToken(payload: object){
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXP })
}

export function verifyToken(token: string){
  try{
    return jwt.verify(token, JWT_SECRET) as any
  }catch(e){
    return null
  }
}

export async function getUserFromReq(req: NextApiRequest){
  const auth = req.headers.authorization
  if(!auth) return null
  const parts = auth.split(' ')
  if(parts[0] !== 'Bearer') return null
  const token = parts[1]
  const data = verifyToken(token)
  if(!data?.id) return null
  const user = await prisma.user.findUnique({ where: { id: data.id }, include: { role: true } })
  return user
}
