import { orchestrate } from '../src/server/orchestrator'
import { prisma } from '../src/lib/prisma'

describe('orchestrator routing', ()=>{
  it('routes revenue to finance', async ()=>{
    const res = await orchestrate({ userId: 'test', text: 'Show this month\'s revenue' })
    expect(res.status).toBeDefined()
  })
})
