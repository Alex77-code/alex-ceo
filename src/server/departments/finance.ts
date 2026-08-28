import { Agent, AgentPlan, defaultExecute } from './agentBase'
import { prisma } from '../../lib/prisma'

export const Finance: Agent = {
  key: 'finance',
  name: 'Finance',
  async plan({ text, userId, intent }){
    if(text.includes('refund') || text.includes('delete invoice')) return { approvalLevel: 'CRITICAL', action: 'financial_action', payload: { text } }
    if(intent === 'revenue_month' || text.includes('revenue')) return { approvalLevel: 'SAFE', action: 'monthly_revenue', payload: {} }
    return { approvalLevel: 'SAFE', action: 'finance_search', payload: { text } }
  },
  async execute(plan){
    if(plan.action === 'monthly_revenue'){
      const records = await prisma.financialRecord.findMany()
      const revenue = records.filter(r=>r.type==='revenue').reduce((s,r)=>s+r.amount,0)
      const expense = records.filter(r=>r.type==='expense').reduce((s,r)=>s+r.amount,0)
      return { revenue, expense, profit: revenue-expense }
    }
    return defaultExecute(plan)
  }
}
