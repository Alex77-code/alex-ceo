import { signToken, verifyToken } from '../src/lib/auth'

describe('auth token', ()=>{
  it('signs and verifies token', ()=>{
    const t = signToken({ id: 'u1', role: 'admin' })
    const v = verifyToken(t)
    expect(v).toBeTruthy()
    expect((v as any).id).toBe('u1')
  })
})
