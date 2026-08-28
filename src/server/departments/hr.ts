import { Agent, AgentPlan, defaultExecute } from './agentBase'

export const HR: Agent = {
  key: 'hr',
  name: 'HR',
  async plan(){
    return { approvalLevel: 'SAFE', action: 'hr_status', payload: {} }
  },
  async execute(plan){
    return defaultExecute(plan)
  }
}
