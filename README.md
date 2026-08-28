# Alex CEO - AI Operating System for Digital Marketing

A production-ready AI Operating System designed for digital marketing companies. Alex CEO orchestrates multiple AI agents across departments (Sales, Marketing, Finance, Operations, HR, Analytics) to automate and optimize business processes.

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│         CEO Dashboard UI (React)            │
│  - Command Center / Chat Interface          │
│  - Department Views (Sales/Mkt/Fin/Ops/HR) │
│  - Task Management, Approvals, Analytics    │
└──────────────────┬──────────────────────────┘
                   │
         ┌─────────▼─────────┐
         │  Express.js API   │
         │  Auth/RBAC Layer  │
         │  Approval Engine  │
         │  Audit Logger     │
         └─────────┬─────────┘
                   │
      ┌────────────┴────────────┐
      │                         │
  ┌───▼───────────┐   ┌────────▼───────┐
  │  AI Orchestr. │   │  PostgreSQL    │
  │  (OpenAI)     │   │  Database      │
  │  + Agents     │   │                │
  └───┬───────────┘   └────────────────┘
      │
   ┌──┴──────────────────────────────┐
   │     Department Agents           │
   ├──────────────────────────────────┤
   │ • Sales Agent                   │
   │ • Marketing Agent               │
   │ • Finance Agent (+ Approval)    │
   │ • Operations Agent              │
   │ • HR Agent                      │
   │ • Analytics Agent               │
   └──┬───────────────────────────────┘
      │
   ┌──┴──────────────────────────────┐
   │   Integration Adapters          │
   ├──────────────────────────────────┤
   │ • OpenAI                        │
   │ • Gmail/Email                   │
   │ • Google Calendar               │
   │ • Google Drive                  │
   │ • Stripe                        │
   │ • Meta/Facebook                 │
   │ • Google Ads                    │
   │ • WhatsApp Business API         │
   │ • CRM                           │
   │ • Accounting Systems            │
   └──────────────────────────────────┘
```

## Key Features

### Core System
- ✅ Central AI orchestrator (OpenAI-powered)
- ✅ Multi-agent architecture (7 departments)
- ✅ CEO Dashboard with real-time updates
- ✅ AI Command Center / chat interface
- ✅ Voice-ready architecture (extensible)
- ✅ User authentication & role-based access control
- ✅ Approval/audit system for sensitive actions
- ✅ Comprehensive audit trails
- ✅ Secure settings & secrets configuration
- ✅ Advanced error handling & retry logic

### Departments

#### Sales
- Lead discovery/import
- Lead qualification & scoring
- CRM management
- Pipeline management
- Follow-up scheduling
- Proposal generation
- Sales activity tracking
- Revenue pipeline visibility

#### Marketing
- Content planning & calendar
- Social media content generation
- Campaign planning
- SEO task management
- Google Ads/Meta Ads optimization
- Email marketing workflows
- Marketing analytics
- Content performance tracking

#### Finance
- Revenue tracking (with approval)
- Expense tracking
- Invoice management
- Accounts receivable/payable
- Cash-flow dashboard
- Profit/loss reporting
- Financial summaries
- Client payment status
- Budget monitoring
- Finance alerts
- **All financial actions require approval**

#### Operations
- Project management
- Task tracking
- Standard Operating Procedures (SOPs)
- Client onboarding
- Deadline tracking
- Team workload management
- Operational alerts

#### HR
- Team member management
- Role & responsibility tracking
- Performance metrics
- Leave/availability records
- Internal task assignment

#### Analytics
- Company KPIs
- Department-specific KPIs
- Revenue/profit dashboards
- Performance metrics
- Trend analysis

## Technology Stack

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 4.x
- **Language**: TypeScript
- **Database**: PostgreSQL 14+ with TypeORM
- **AI/LLM**: OpenAI API (GPT-4)
- **Authentication**: JWT + Session-based
- **Validation**: Zod
- **Logging**: Winston + Pino
- **Testing**: Jest + Supertest
- **Linting**: ESLint + Prettier
- **Task Queue**: Bull (Redis-backed)
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build**: Vite
- **State Management**: TanStack Query + Zustand
- **UI Library**: Shadcn/ui + Tailwind CSS
- **Charts**: Recharts
- **Real-time**: Socket.io client
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

### Infrastructure
- **Database**: PostgreSQL 14+
- **Cache**: Redis (for task queue)
- **Containerization**: Docker + Docker Compose
- **Environment**: .env-based configuration

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis (optional, for task queue)
- npm or yarn

### Installation

```bash
# Clone and navigate
git clone https://github.com/Alex77-code/alex-ceo.git
cd alex-ceo

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Setup database
npm run db:migrate
npm run db:seed

# Start development
npm run dev

# Backend: http://localhost:3001
# Frontend: http://localhost:5173
```

### Development Commands

```bash
# Start both frontend and backend
npm run dev

# Start backend only
npm run dev:backend

# Start frontend only
npm run dev:frontend

# Build for production
npm run build

# Run tests
npm run test

# Run linting
npm run lint

# Database operations
npm run db:migrate
npm run db:seed
npm run db:reset
```

## API Documentation

The API is documented via Swagger/OpenAPI, available at:
```
http://localhost:3001/api/docs
```

### Key Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh JWT token

**Dashboard**
- `GET /api/dashboard/overview` - Get dashboard summary
- `GET /api/dashboard/kpis` - Get KPIs
- `GET /api/dashboard/recent-activities` - Get recent activities

**AI Orchestration**
- `POST /api/orchestrator/command` - Send command to AI orchestrator
- `GET /api/orchestrator/status` - Get orchestrator status
- `GET /api/orchestrator/history` - Get command history

**Sales**
- `GET /api/sales/leads` - List leads
- `POST /api/sales/leads` - Create lead
- `GET /api/sales/pipeline` - Get pipeline view
- `POST /api/sales/proposals` - Generate proposal

**Marketing**
- `GET /api/marketing/campaigns` - List campaigns
- `POST /api/marketing/campaigns` - Create campaign
- `GET /api/marketing/content` - Get content calendar
- `POST /api/marketing/content/generate` - Generate content

**Finance**
- `GET /api/finance/dashboard` - Finance overview
- `GET /api/finance/invoices` - List invoices
- `POST /api/finance/invoices` - Create invoice (requires approval)
- `GET /api/finance/expenses` - List expenses
- `POST /api/finance/expenses` - Log expense (requires approval)
- `GET /api/finance/approvals` - Pending approvals

**Operations**
- `GET /api/operations/projects` - List projects
- `POST /api/operations/projects` - Create project
- `GET /api/operations/tasks` - List tasks
- `POST /api/operations/tasks` - Create task

**HR**
- `GET /api/hr/team` - List team members
- `GET /api/hr/performance` - Team performance metrics
- `POST /api/hr/leave` - Request leave

**Analytics**
- `GET /api/analytics/kpis` - Get all KPIs
- `GET /api/analytics/sales` - Sales analytics
- `GET /api/analytics/marketing` - Marketing analytics
- `GET /api/analytics/finance` - Finance analytics
- `GET /api/analytics/dashboards/:id` - Get custom dashboard

**Approvals**
- `GET /api/approvals` - List pending approvals
- `POST /api/approvals/:id/approve` - Approve action
- `POST /api/approvals/:id/reject` - Reject action

**Audit**
- `GET /api/audit/logs` - Get audit logs
- `GET /api/audit/logs/:id` - Get specific log

**Admin**
- `GET /api/admin/integrations` - Manage integrations
- `POST /api/admin/settings` - Update system settings
- `GET /api/admin/users` - Manage users
- `POST /api/admin/users` - Create user

## Database Schema

The system uses PostgreSQL with the following core tables:

```sql
-- Users & Auth
users
├── id (PK)
├── email (UNIQUE)
├── password (hashed)
├── name
├── role (enum: admin, manager, user, agent)
├── department_id (FK)
└── timestamps

-- Organization
departments
├── id (PK)
├── name (Sales, Marketing, Finance, Operations, HR, Analytics)
├── description
└── config (JSON)

agents
├── id (PK)
├── name
├── department_id (FK)
├── type (enum: orchestrator, sales, marketing, finance, operations, hr, analytics)
├── config (JSON)
└── enabled (boolean)

-- Sales
leads
├── id (PK)
├── email
├── phone
├── company
├── status (enum: new, contacted, qualified, proposal, won, lost)
├── score (0-100)
├── source
└── timestamps

contacts
├── id (PK)
├── lead_id (FK)
├── name, email, phone
└── role

opportunities
├── id (PK)
├── lead_id (FK)
├── amount
├── stage (prospecting, qualification, proposal, negotiation, closed)
├── close_date
└── timestamps

-- Marketing
campaigns
├── id (PK)
├── name
├── type (email, social, paid_ads, seo)
├── status
├── budget
└── timestamps

content
├── id (PK)
├── campaign_id (FK)
├── title
├── body
├── type (post, email, ad, article)
├── status (draft, scheduled, published)
└── timestamps

-- Finance
invoices
├── id (PK)
├── client_id (FK)
├── amount
├── status (draft, sent, paid, overdue, cancelled)
├── due_date
├── approval_status (pending, approved, rejected)
└── timestamps

expenses
├── id (PK)
├── category
├── amount
├── description
├── approval_status (pending, approved, rejected)
└── timestamps

payments
├── id (PK)
├── invoice_id (FK)
├── amount
├── method
├── status (pending, completed, failed)
└── timestamps

financial_records
├── id (PK)
├── type (revenue, expense, adjustment)
├── amount
├── category
├── description
├── approval_required (boolean)
├── approval_status (pending, approved, rejected)
└── timestamps

-- Operations
projects
├── id (PK)
├── name
├── description
├── status (planning, active, completed)
├── start_date, end_date
├── owner_id (FK -> users)
└── timestamps

tasks
├── id (PK)
├── project_id (FK)
├── title
├── description
├── assignee_id (FK -> users)
├── status (todo, in_progress, review, done)
├── priority (low, medium, high, critical)
├── due_date
└── timestamps

-- HR
team_members
├── id (PK)
├── user_id (FK)
├── role
├── hire_date
├── department_id (FK)
└── active (boolean)

performance_records
├── id (PK)
├── team_member_id (FK)
├── metric
├── value
├── period
└── timestamp

-- Core Audit & Approval
approvals
├── id (PK)
├── type (finance, delete, publish, security_change)
├── action_type (invoice, expense, refund, data_deletion, etc)
├── entity_id
├── entity_type
├── requested_by_id (FK -> users)
├── approved_by_id (FK -> users)
├── status (pending, approved, rejected)
├── reason (for approval/rejection)
└── timestamps

audit_logs
├── id (PK)
├── user_id (FK)
├── action
├── entity_type
├── entity_id
├── changes (JSONB: before/after)
├── ip_address
├── user_agent
└── timestamp

notifications
├── id (PK)
├── user_id (FK)
├── type
├── title
├── message
├── data (JSONB)
├── read (boolean)
└── timestamp

-- Integrations & Settings
integrations
├── id (PK)
├── name
├── provider (openai, gmail, stripe, etc)
├── auth_type (oauth2, api_key, webhook)
├── encrypted_config (JSONB encrypted)
├── status (active, inactive, error)
├── last_sync
└── timestamps

settings
├── id (PK)
├── key (UNIQUE)
├── value
├── type (string, json, boolean, number)
├── secret (boolean)
└── description

-- Analytics & Metrics
kpis
├── id (PK)
├── department_id (FK)
├── name
├── metric_type (number, percentage, currency)
├── current_value
├── target_value
├── period
└── timestamp

messages
├── id (PK)
├── sender_id (FK -> users)
├── receiver_id (FK -> users) [nullable for group]
├── thread_id [for conversations]
├── content
├── type (text, ai_response, notification, approval_request)
├── metadata (JSONB)
└── timestamp
```

## Security Architecture

### Authentication & Authorization
- JWT tokens with configurable expiration
- Refresh token rotation
- Session-based authentication
- Role-Based Access Control (RBAC):
  - `admin`: Full system access
  - `manager`: Department management + approvals
  - `user`: Standard operations
  - `agent`: AI agent operations only

### Secrets Management
- All API keys stored encrypted in database
- Never exposed to frontend
- Environment variables for server config
- Secure rotation policies

### Approval & Audit System

**Approval Levels:**

1. **SAFE** (Auto-approve)
   - Reading data
   - Creating standard tasks
   - Updating own profile
   - Viewing analytics

2. **REVIEW** (Prepare + Request Approval)
   - Creating invoices > $1,000
   - Sending bulk emails
   - Publishing marketing content
   - Deleting standard records

3. **CRITICAL** (Require Explicit Approval)
   - Sending money/refunds
   - Writing off financial records
   - Deleting client/lead data
   - Bulk external communication
   - Publishing sensitive content
   - Security setting changes
   - User permission modifications
   - Integration credential changes

**Every action is logged:**
- WHO performed it
- WHAT action
- WHEN (timestamp)
- WHERE (IP address, session)
- WHY (context/reason)
- BEFORE/AFTER data states

## Integrations Setup

### Required API Keys

| Service | Key Name | Type | Setup |
|---------|----------|------|-------|
| OpenAI | `OPENAI_API_KEY` | API Key | https://platform.openai.com |
| Gmail | `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET` | OAuth2 | https://console.developers.google.com |
| Google Calendar | `GOOGLE_CALENDAR_CLIENT_ID`, `GOOGLE_CALENDAR_CLIENT_SECRET` | OAuth2 | https://console.developers.google.com |
| Google Drive | `GOOGLE_DRIVE_CLIENT_ID`, `GOOGLE_DRIVE_CLIENT_SECRET` | OAuth2 | https://console.developers.google.com |
| Google Ads | `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET` | OAuth2 + Developer Token | https://ads.google.com/home/ |
| Meta/Facebook | `META_ACCESS_TOKEN`, `META_BUSINESS_ACCOUNT_ID` | API Key + Business Account ID | https://developers.facebook.com |
| Stripe | `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY` | API Keys | https://dashboard.stripe.com |
| WhatsApp Business API | `WHATSAPP_BUSINESS_API_KEY`, `WHATSAPP_BUSINESS_ACCOUNT_ID` | API Key + Account ID | https://www.whatsapp.com/business/api/ |
| CRM | `CRM_API_KEY`, `CRM_BASE_URL` | API Key | Depends on CRM provider |
| Accounting System | `ACCOUNTING_API_KEY`, `ACCOUNTING_BASE_URL` | API Key | Depends on accounting provider |

### Integration Status
- ✅ OpenAI (Ready)
- 🔄 Gmail (Adapter ready, OAuth flow pending)
- 🔄 Google Calendar (Adapter ready, OAuth flow pending)
- 🔄 Google Drive (Adapter ready, OAuth flow pending)
- 🔄 Google Ads (Adapter ready, OAuth flow pending)
- 🔄 Meta/Facebook (Adapter ready, OAuth flow pending)
- 🔄 Stripe (Adapter ready, webhook setup needed)
- 🔄 WhatsApp Business (Adapter ready, webhook setup needed)
- 🔄 CRM (Generic adapter ready, config needed)
- 🔄 Accounting (Generic adapter ready, config needed)

## Testing

```bash
# Run all tests
npm run test

# Run backend tests with coverage
npm run test:backend -- --coverage

# Run frontend tests with coverage
npm run test:frontend -- --coverage

# Watch mode
npm run test -- --watch
```

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Docker
```bash
docker-compose up -d
```

### Environment Production Checklist
- [ ] All API keys configured
- [ ] Database URL pointing to production PostgreSQL
- [ ] NODE_ENV=production
- [ ] JWT_SECRET changed to secure random string
- [ ] SESSION_SECRET changed to secure random string
- [ ] SENTRY_DSN configured for error tracking
- [ ] Email service configured (SendGrid/AWS SES)
- [ ] Stripe keys set to production
- [ ] Database backups configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] HTTPS enforced
- [ ] Security headers enabled
- [ ] Audit logging verified

## Project Structure

```
alex-ceo/
├── backend/
│   ├── src/
│   │   ├── index.ts                    # Server entry
│   │   ├── config/                     # Configuration
│   │   ├── database/
│   │   │   ├── entities/               # TypeORM entities
│   │   │   ├── migrations/             # Database migrations
│   │   │   └── seeds/                  # Test data
│   │   ├── routes/                     # API routes
│   │   ├── controllers/                # Route handlers
│   │   ├── services/                   # Business logic
│   │   ├── agents/                     # AI agents
│   │   ├── integrations/               # External APIs
│   │   ├── middleware/                 # Express middleware
���   │   ├── utils/                      # Utilities
│   │   ├── types/                      # TypeScript types
│   │   └── __tests__/                  # Tests
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── main.tsx                    # Entry point
│   │   ├── App.tsx                     # Main component
│   │   ├── components/                 # React components
│   │   ├── pages/                      # Page components
│   │   ├── hooks/                      # Custom hooks
│   │   ├── stores/                     # Zustand stores
│   │   ├── services/                   # API services
│   │   ├── types/                      # TypeScript types
│   │   ├── styles/                     # Tailwind CSS
│   │   └── __tests__/                  # Tests
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml                  # Docker setup
├── .env.example                        # Example env vars
├── package.json                        # Root package.json
└── README.md                           # This file
```

## Development Workflow

1. **Create feature branch**: `git checkout -b feature/description`
2. **Make changes** with tests
3. **Run linting**: `npm run lint`
4. **Run tests**: `npm run test`
5. **Commit**: `git commit -m "Clear message"`
6. **Push**: `git push origin feature/description`
7. **Create Pull Request**

## Troubleshooting

### Database Connection Issues
```bash
# Reset database
npm run db:reset

# Run migrations
npm run db:migrate

# Seed test data
npm run db:seed
```

### Port Already in Use
```bash
# Backend (default 3001)
PORT=3002 npm run dev:backend

# Frontend (default 5173)
npm run dev:frontend -- --port 5174
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm run build:backend
npm run build:frontend
```

## Contributing

1. Read the architecture documentation
2. Follow the code style (ESLint + Prettier)
3. Write tests for new features
4. Update documentation
5. Create a clear PR description

## License

MIT

## Support & Documentation

- **Architecture Docs**: See `ARCHITECTURE.md`
- **Integration Guide**: See `INTEGRATIONS.md`
- **API Docs**: http://localhost:3001/api/docs
- **Database Schema**: See SQL schema above

## Roadmap

- [ ] Voice input/output integration (Deepgram, Eleven Labs)
- [ ] Advanced AI training on company data
- [ ] Automated reporting
- [ ] Predictive analytics
- [ ] Mobile app (React Native)
- [ ] Webhook automations
- [ ] Integration marketplace
- [ ] Custom dashboard builder
- [ ] Advanced scheduling
- [ ] Multi-language support

---

**Created**: 2026-08-28
**Status**: Alpha - Production Foundation Complete
