# Local dev notes

Run these commands to get started:

1. copy .env.example to .env and set DATABASE_URL and JWT_SECRET
2. npm install
3. npx prisma generate
4. npx prisma migrate dev --name init
5. npm run prisma:seed
6. npm run dev

Testing:

npm test

Integrations: set keys in .env
