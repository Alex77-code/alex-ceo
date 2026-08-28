import { CEO } from './ceo'
import { Sales } from './sales'
import { Marketing } from './marketing'
import { Finance } from './finance'
import { Operations } from './operations'
import { HR } from './hr'
import { Analytics } from './analytics'

const map: Record<string, any> = {
  CEO,
  Sales,
  Marketing,
  Finance,
  Operations,
  HR,
  Analytics
}

export function getAgentForDepartment(key: string){
  return map[key] || CEO
}
