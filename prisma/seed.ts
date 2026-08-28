import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main(){
  // roles
  const adminRole = await prisma.role.upsert({ where: { name: 'admin' }, update: {}, create: { name: 'admin' } })
  const userRole = await prisma.role.upsert({ where: { name: 'user' }, update: {}, create: { name: 'user' } })

  const password = await bcrypt.hash('password123', 10)

  await prisma.user.upsert({
    where: { email: 'ceo@company.com' },
    update: {},
    create: {
      email: 'ceo@company.com',
      name: 'CEO Alex',
      password,
      roleId: adminRole.id
    }
  })

  const departments = ['CEO','Sales','Marketing','Finance','Operations','HR','Analytics']
  for(const key of departments){
    await prisma.department.upsert({ where: { key }, update: {}, create: { key, name: key } })
  }

  // sample data
  await prisma.client.createMany({ data: [
    { name: 'Acme Corp', status: 'active' },
    { name: 'Globex', status: 'active' }
  ]})

  await prisma.lead.createMany({ data: [
    { name: 'John Doe', source: 'LinkedIn', value: 5000, status: 'new' },
    { name: 'Jane Smith', source: 'Website', value: 12000, status: 'contacted' }
  ]})

  await prisma.campaign.createMany({ data: [
    { name: 'Q4 Growth', status: 'active' }
  ]})

  await prisma.task.createMany({ data: [
    { title: 'Follow up lead John', status: 'open', priority: 1 },
    { title: 'Prepare Q4 plan', status: 'in_progress', priority: 2 }
  ]})

  await prisma.financialRecord.createMany({ data: [
    { type: 'revenue', amount: 15000 },
    { type: 'expense', amount: 4000 }
  ]})

  console.log('Seed finished')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => process.exit())
