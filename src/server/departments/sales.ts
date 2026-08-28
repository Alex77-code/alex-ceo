import { Agent, AgentPlan, defaultExecute } from './agentBase'
import { prisma } from '../../lib/prisma'

export const Sales: Agent = {
  key: 'sales',
  name: 'Sales',
  async plan({ text, userId, intent }){
    if(intent === 'priority_tasks') return { approvalLevel: 'SAFE', action: 'highest_priority_tasks', payload: {} }
    if(intent === 'follow_up_leads') return { approvalLevel: 'REVIEW', action: 'prepare_followup', payload: { text } }
    if(intent === 'pipeline_analysis') return { approvalLevel: 'SAFE', action: 'analyze_pipeline', payload: {} }
    return { approvalLevel: 'SAFE', action: 'search', payload: { text } }
  },
  async execute(plan){
    if(plan.action === 'highest_priority_tasks'){
      const tasks = await prisma.task.findMany({ where: { status: 'open' }, orderBy: { priority: 'asc' }, take: 10 })
      return { tasks }
    }
    if(plan.action === 'analyze_pipeline'){
      const leads = await prisma.lead.findMany()
      const total = leads.reduce((s,l)=>s+(l.value||0),0)
      return { leadsCount: leads.length, totalValue: total }
    }
    if(plan.action === 'prepare_followup'){
      // prepare follow-up plan and mark as REVIEW
      return { plan: { steps: ['Call lead', 'Send proposal', 'Schedule demo'] }, note: 'Requires review before outreach' }
    }
    return defaultExecute(plan)
  }
}
