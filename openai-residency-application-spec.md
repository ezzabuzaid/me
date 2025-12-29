# OpenAI Residency 2026 Application Spec

## Position Details
- **Role:** Residency 2026
- **Location:** San Francisco, CA (hybrid, 3 days/week in-office)
- **Duration:** 6 months
- **Compensation:** $18,333/month

---

## Personal Information

| Field | Value |
|-------|-------|
| **Full Name** | Ezz Abuzaid |
| **Email** | ezzabuzaid@gmail.com |
| **Phone** | +962792807794 |
| **Location** | Amman, Jordan |
| **Age** | 27 years old |
| **Languages** | Arabic (native), English |
| **GitHub** | [github.com/ezzabuzaid](https://github.com/ezzabuzaid) |
| **LinkedIn** | [linkedin.com/in/ezzabuzaid](https://linkedin.com/in/ezzabuzaid) |

---

## Eligibility Questions

| Question | Answer |
|----------|--------|
| **Visa Sponsorship Required?** | Yes |
| **Can work from SF HQ 3 days/week?** | Yes (willing to relocate) |
| **Start Date** | Within 1-3 months |

---

## Education

| Field | Value |
|-------|-------|
| **Degree** | Bachelor's in Computer Science/Engineering |
| **University** | Al-Balqa Applied University (Polytechnic) |
| **Location** | Jordan |
| **Graduation Year** | 2020 |

---

## Professional Background

| Field | Value |
|-------|-------|
| **Years Programming** | 8 years (since 2017) |
| **Current Status** | Self-employed / Freelance |
| **Primary Work** | Software Development |
| **Primary Languages** | JavaScript, TypeScript |
| **Previous Languages** | Dart, C# |
| **AI/ML Experience** | 2 years professional AI agent work |
| **Clients** | Enterprise + Personal/Open Source |

### AI Agent Experience
- **Types Built:** LLM-powered applications, Autonomous agents, RAG/Knowledge systems, Multi-agent systems
- **Tools Used:** OpenAI API/SDK, Vercel AI SDK
- **Focus:** Production AI agent systems

---

## Three Achievements (REQUIRED QUESTION)

### 1. DeepAgents Framework
**What:** TypeScript-native agent framework designed to be "batteries-included"
**Why it matters:** Created a simpler, more accessible alternative to LangChain specifically for the TypeScript ecosystem
**GitHub:** Available on github.com/ezzabuzaid

### 2. January Framework
**What:** TypeScript backend framework using compile-time primitives and internal DSL
**Architecture:** Workflow-based with compile-time code generation
**Example:**
```typescript
import { saveEntity } from '@extensions/postgresql';
import { tables } from '@workspace/entities';

workflow('CreateUserWorkflow', {
  tag: 'users',
  trigger: trigger.http({
    method: 'post',
    path: '/',
  }),
  execute: async ({ trigger }) => {
    await saveEntity(tables.users, {
      name: trigger.body.name,
      email: trigger.body.email,
    });
  }
});
```
**Why it matters:** Demonstrates deep understanding of framework design, DSL creation, and compile-time optimizations

### 3. Serverize
**What:** Self-hosted container platform (similar to fly.io but for development)
**Features:**
- Named channels with named releases
- Per-channel secrets management
- Container-based architecture
**Development Time:** Built from idea to working product in under 1 month
**Why it matters:** Shows ability to rapidly prototype and ship infrastructure-level products
**GitHub:** Open source, available on github.com/ezzabuzaid

### Other Notable Projects
- **sqlite-parser:** SQLite parser (core SQL subset) - built as a learning exercise
- **text2sql agent:** Agent that converts natural language to SQL queries

---

## Motivation Statement (REQUIRED QUESTION)

**Primary Motivation:** Work on frontier AI

**Why OpenAI specifically:**
- Attracted to OpenAI's "ship fast" research culture
- Want to work at the forefront of AI capabilities
- Interested in the GPT/Models team

**What I hope to gain:**
1. Research skills - transition from engineering to research
2. Network and mentorship from world-class researchers
3. Path to full-time conversion at OpenAI

**What excites me about AI:**
- Applications of AI, specifically developer tools
- Making AI useful for real-world problems

---

## Research Question/Problem (REQUIRED QUESTION)

**Area of Interest:** Agent reasoning and memory

**Concrete Research Problem:**
"Agents are impressive at first glance but with repetitive usage they are not" - investigating why agent performance degrades over extended use and how to build more consistent, reliable agent systems.

**Specific interests:**
- How agents should remember and learn from experience
- Why agents behave inconsistently in similar situations
- Improving agent reliability over long-horizon tasks

---

## Top 3 Research Interest Areas (REQUIRED QUESTION)

1. **AI Agents** - Building reliable, consistent autonomous agent systems
2. **Code AI** - AI for code generation, understanding, and developer tools
3. **Tool Use** - How AI can better use tools and APIs

---

## Optional Questions

### Learning Story: Learning AI/Agents Quickly
**Timeline:** Went from zero AI knowledge to building production AI agents in 3-6 months
**What I learned:** LLM APIs, prompt engineering, RAG systems, agent architectures, multi-agent systems
**Outcome:** Now building enterprise AI agent solutions professionally

### Idea to Reality: Building Serverize
**Timeline:** Concept to working product in under 1 month
**Process:** Identified need for self-hosted development deployment platform, designed architecture with channels/releases/secrets, built and shipped quickly
**Outcome:** Open source project available for others to use

### OpenAI-Specific Interests
**Team Interest:** GPT/Models team
**Why:** Want to understand how frontier models are built and improved, contribute to the core capabilities that power all OpenAI products

---

## Strengths & Considerations

### Strengths
- **Builder mentality:** 8 years of shipping real products
- **AI agent expertise:** 2 years building production agents
- **Framework design:** Built multiple frameworks (January, DeepAgents)
- **Fast learner:** Self-taught AI in 3-6 months, built Serverize in < 1 month
- **Full-stack:** Can build everything from parsers to platforms
- **Open source:** Active contributor, public portfolio

### Areas for Growth
- **Mathematical foundations:** Basic/rusty - will need to strengthen linear algebra, probability, statistics, calculus
- **Formal research experience:** Engineering-focused background, no publications
- **Language expansion:** Primarily TypeScript, may need Python proficiency for ML research

---

## Work History (TO BE FILLED IN)

> **Note:** Detailed work history needs to be added. Please provide:
> - Company names
> - Job titles
> - Dates (month/year - month/year)
> - Brief descriptions of responsibilities

| Company | Role | Dates | Description |
|---------|------|-------|-------------|
| *TBD* | *TBD* | *TBD* | *TBD* |

---

## Application Checklist

- [ ] Resume (PDF) - generate with rendercv
- [ ] Fill in work history above
- [ ] Review and polish three achievements text
- [ ] Review and polish motivation statement
- [ ] Review and polish research question
- [ ] Optional: Cover letter
- [ ] Submit at: https://jobs.ashbyhq.com/openai/f96dbc99-6253-4e40-9263-0accd934345d/application

---

## Resume Generation Notes

Using rendercv to generate resume. Key sections:
1. Contact info
2. Summary highlighting AI agent expertise + builder mentality
3. Projects: DeepAgents, January, Serverize
4. Work experience (to be filled)
5. Education: Al-Balqa Applied University, CS, 2020
6. Skills: TypeScript, JavaScript, AI/ML, Agent Development, Framework Design

---

*Document generated: December 2024*
*For: OpenAI Residency 2026 Application*
