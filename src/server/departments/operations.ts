import { Agent, AgentPlan, defaultExecute } from './agentBase'

export const Operations: Agent = {
  key: 'operations',
  name: 'Operations',
  async plan(){
    return { approvalLevel: 'SAFE', action: 'ops_status', payload: {} }
  },
  async execute(plan){
    return defaultExecute(plan)
  }
}
