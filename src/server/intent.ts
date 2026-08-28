export function detectIntent(text: string){
  // naive intent detection: return a short label
  const t = (text||'').toLowerCase()
  if(t.includes('today')) return 'today_status'
  if(t.includes('priority') || t.includes('highest priority')) return 'priority_tasks'
  if(t.includes('follow-up') || t.includes('follow up')) return 'follow_up_leads'
  if(t.includes('revenue') || t.includes('this month')) return 'revenue_month'
  if(t.includes('create campaign') || t.includes('marketing campaign')) return 'create_campaign'
  if(t.includes('sales pipeline') || t.includes('analyze')) return 'pipeline_analysis'
  return 'general'
}
