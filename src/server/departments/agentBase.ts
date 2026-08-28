import { prisma } from '../../lib/prisma'

export type AgentPlan = {
  approvalLevel: 'SAFE' | 'REVIEW' | 'CRITICAL'
  action?: string
  payload?: any
}

export type Agent = {
  key: string
  name: string
  plan: (opts: { text: string, userId: string, intent: string }) => Promise<AgentPlan>
  execute: (plan: AgentPlan) => Promise<any>
}

// simple base implementation helpers
export async function defaultExecute(plan: AgentPlan){
  // placeholder execute - many actions are simulated
  return { ok: true, executed: plan.action || 'no-action', payload: plan.payload || null }
}
