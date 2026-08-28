import { prisma } from '../lib/prisma'
import { detectIntent } from './intent'
import * as agents from './departments'

export type OrchestratorRequest = { userId: string, text: string }

export async function orchestrate(req: OrchestratorRequest){
  const intent = detectIntent(req.text)
  // map intent to department
  const departmentKey = mapIntentToDepartment(intent)
  // log start
  await prisma.auditLog.create({ data: { userId: req.userId, agentKey: 'orchestrator', department: departmentKey, action: `intent:${intent}`, status: 'started', approvalReq: false } })

  const agent = agents.getAgentForDepartment(departmentKey)
  if(!agent) throw new Error('No agent found')
  const plan = await agent.plan({ text: req.text, userId: req.userId, intent })

  // check approvals
  if(plan.approvalLevel === 'CRITICAL'){
    const approval = await prisma.approval.create({ data: { action: plan.action || 'action', payload: plan.payload || {}, level: 'CRITICAL', status: 'PENDING', requestedBy: req.userId } })
    await prisma.auditLog.create({ data: { userId: req.userId, agentKey: agent.key, department: departmentKey, action: `requested_approval`, status: 'pending', approvalReq: true } })
    return { status: 'approval_required', approvalId: approval.id, plan }
  }

  if(plan.approvalLevel === 'REVIEW'){
    const approval = await prisma.approval.create({ data: { action: plan.action || 'action', payload: plan.payload || {}, level: 'REVIEW', status: 'PENDING', requestedBy: req.userId } })
    await prisma.auditLog.create({ data: { userId: req.userId, agentKey: agent.key, department: departmentKey, action: `requested_review`, status: 'pending', approvalReq: true } })
    return { status: 'review_required', approvalId: approval.id, plan }
  }

  // SAFE - execute
  const result = await agent.execute(plan)
  await prisma.auditLog.create({ data: { userId: req.userId, agentKey: agent.key, department: departmentKey, action: plan.action || 'exec', status: 'completed', approvalReq: false, result: JSON.stringify(result).slice(0, 2000) } })
  return { status: 'done', result }
}

function mapIntentToDepartment(intent: string){
  const lower = intent.toLowerCase()
  if(lower.includes('revenue') || lower.includes('invoice') || lower.includes('payment')) return 'Finance'
  if(lower.includes('lead') || lower.includes('pipeline') || lower.includes('client')) return 'Sales'
  if(lower.includes('campaign') || lower.includes('marketing') || lower.includes('seo')) return 'Marketing'
  if(lower.includes('project') || lower.includes('deadline') || lower.includes('operations')) return 'Operations'
  if(lower.includes('hire') || lower.includes('hr') || lower.includes('employee')) return 'HR'
  if(lower.includes('insight') || lower.includes('analy') || lower.includes('kpi')) return 'Analytics'
  return 'CEO'
}
