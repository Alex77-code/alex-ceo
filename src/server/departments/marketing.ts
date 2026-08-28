import { Agent, AgentPlan, defaultExecute } from './agentBase'
import { prisma } from '../../lib/prisma'

export const Marketing: Agent = {
  key: 'marketing',
  name: 'Marketing',
  async plan({ text, userId, intent }){
    if(intent === 'create_campaign' || text.includes('campaign')) return { approvalLevel: 'REVIEW', action: 'create_campaign', payload: { text } }
    return { approvalLevel: 'SAFE', action: 'marketing_search', payload: { text } }
  },
  async execute(plan){
    if(plan.action === 'create_campaign'){
      const c = await prisma.campaign.create({ data: { name: (plan.payload?.text||'New Campaign').slice(0,80), status: 'draft' } })
      return { campaign: c }
    }
    return defaultExecute(plan)
  }
}
