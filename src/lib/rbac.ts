import { NextApiRequest } from 'next'
import { getUserFromReq } from './auth'

export type RoleName = 'admin' | 'manager' | 'user'

export async function requireRole(req: NextApiRequest, allowed: RoleName[]) {
  const user = await getUserFromReq(req)
  if (!user) return { user: null, error: 'unauthenticated' as const }
  const role = String(user.role?.name || '').toLowerCase() as RoleName
  if (!allowed.includes(role)) return { user, error: 'forbidden' as const }
  return { user, error: null }
}
