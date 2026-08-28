import { Agent, AgentPlan, defaultExecute } from './agentBase'
import { prisma } from '../../lib/prisma'

export const Analytics: Agent = {
  key: 'analytics',
  name: 'Analytics',
  async plan({ text }){
    return { approvalLevel: 'SAFE', action: 'kpi_calc', payload: { text } }
  },
  async execute(plan){
    const revenue = await prisma.financialRecord.findMany({ where: { type: 'revenue' } })
    const leads = await prisma.lead.count()
    const clients = await prisma.client.count()
    const revenueSum = revenue.reduce((s,r)=>s+r.amount,0)
    return { revenue: revenueSum, leads, clients }
  }
}
