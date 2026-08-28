import { Agent, AgentPlan, defaultExecute } from './agentBase'
import { prisma } from '../../lib/prisma'

export const CEO: Agent = {
  key: 'ceo',
  name: 'CEO',
  async plan({ text, userId, intent }){
    // CEO handles general queries and high-level insights
    if(intent === 'today_status'){
      return { approvalLevel: 'SAFE', action: 'today_status', payload: { query: 'overview' } }
    }
    return { approvalLevel: 'SAFE', action: 'general_insight', payload: { text } }
  },
  async execute(plan){
    if(plan.action === 'today_status'){
      // fetch a few things
      const revenue = await prisma.financialRecord.findMany({ where: { type: 'revenue' } })
      const leads = await prisma.lead.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
      const tasks = await prisma.task.findMany({ where: { status: 'open' }, take: 5 })
      return { revenue, leads, tasks }
    }
    return defaultExecute(plan)
  }
}
