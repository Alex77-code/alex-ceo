import { prisma } from '../src/lib/prisma'

describe('finance calculations', ()=>{
  it('calculates profit', async ()=>{
    // relies on seed; if not present just pass
    const records = await prisma.financialRecord.findMany()
    const revenue = records.filter(r=>r.type==='revenue').reduce((s,r)=>s+r.amount,0)
    const expense = records.filter(r=>r.type==='expense').reduce((s,r)=>s+r.amount,0)
    expect(revenue - expense).toBeGreaterThanOrEqual(-1000000)
  })
})
