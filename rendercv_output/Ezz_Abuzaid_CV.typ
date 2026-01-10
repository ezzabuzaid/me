// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.1.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Ezz Abuzaid",
  footer: context { [#emph[Ezz Abuzaid -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in Dec 2025] ],
  locale-catalog-language: "en",
  page-size: "us-letter",
  page-top-margin: 0.7in,
  page-bottom-margin: 0.7in,
  page-left-margin: 0.7in,
  page-right-margin: 0.7in,
  page-show-footer: true,
  page-show-top-note: true,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(0, 79, 144),
  colors-headline: rgb(0, 79, 144),
  colors-connections: rgb(0, 79, 144),
  colors-section-titles: rgb(0, 79, 144),
  colors-links: rgb(0, 79, 144),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 0.6em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "Raleway",
  typography-font-family-name: "Raleway",
  typography-font-family-headline: "Raleway",
  typography-font-family-connections: "Raleway",
  typography-font-family-section-titles: "Raleway",
  typography-font-size-body: 10pt,
  typography-font-size-name: 30pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 10pt,
  typography-font-size-section-titles: 1.4em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: false,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: false,
  links-underline: false,
  links-show-external-link-icon: false,
  header-alignment: left,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.7cm,
  header-space-below-headline: 0.7cm,
  header-space-below-connections: 0.7cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: true,
  header-connections-display-urls-instead-of-usernames: false,
  header-connections-separator: "",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_full_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.5cm,
  section-titles-space-below: 0.3cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.3em,
  sections-space-between-regular-entries: 1.2em,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0.2cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: false,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0.12cm,
  entries-highlights-bullet:  "•" ,
  entries-highlights-nested-bullet:  "•" ,
  entries-highlights-space-left: 0cm,
  entries-highlights-space-above: 0.12cm,
  entries-highlights-space-between-items: 0.12cm,
  entries-highlights-space-between-bullet-and-text: 0.5em,
  date: datetime(
    year: 2025,
    month: 12,
    day: 30,
  ),
)


= Ezz Abuzaid

  #headline([Software Engineer])

#connections(
  [#connection-with-icon("location-dot")[Amman, Jordan]],
  [#link("mailto:ezzabuzaid@gmail.com", icon: false, if-underline: false, if-color: false)[#connection-with-icon("envelope")[ezzabuzaid\@gmail.com]]],
  [#link("tel:+962-7-9280-7794", icon: false, if-underline: false, if-color: false)[#connection-with-icon("phone")[07 9280 7794]]],
  [#link("https://ezz.sh/", icon: false, if-underline: false, if-color: false)[#connection-with-icon("link")[ezz.sh]]],
  [#link("https://linkedin.com/in/ezzabuzaid", icon: false, if-underline: false, if-color: false)[#connection-with-icon("linkedin")[ezzabuzaid]]],
  [#link("https://github.com/ezzabuzaid", icon: false, if-underline: false, if-color: false)[#connection-with-icon("github")[ezzabuzaid]]],
)


== Summary

Self-taught builder with 8 years shipping production software and 2 years building AI agents and LLM applications. Created multiple open-source frameworks from scratch including DeepAgents (agent orchestration), SDK-IT (SDK generation), and Serverize (container platform). Track record of rapidly turning ideas into working systems - from parsers and compilers to RAG pipelines and multi-agent architectures.

== Projects

#regular-entry(
  [
    #strong[#link("https://github.com/ezzabuzaid/deepagents")[DeepAgents]]

  ],
  [
    July 2025 – present

  ],
  main-column-second-row: [
    #summary[TypeScript-native AI agent framework designed to be batteries-included]

    - Implements agent handoffs inspired by OpenAI Swarm for orchestrating multi-agent systems

    - Context engine for token estimation, compaction strategies, and structured system prompts

    - Includes retrieval package with sqlite-vec for vector search and multi-source connectors (GitHub, RSS, files)

  ],
)

#regular-entry(
  [
    #strong[Proposal Generator Agent]

  ],
  [
    Jan 2024

  ],
  main-column-second-row: [
    #summary[Agentic workflow for business proposal drafting]

    - Human-in-the-loop design where users select context, AI drafts, users comment, AI refines

    - Multi-turn agent with iterative feedback loops

    - Harvests user-provided files to learn tone, design, and style

  ],
)

#regular-entry(
  [
    #strong[#link("https://limerence.january.sh/")[Text2SQL Agent]]

  ],
  [
    Oct 2025

  ],
  main-column-second-row: [
    #summary[AI agent that converts natural language queries to SQL]

    - Converts natural language to valid SQLite queries with parser validation

    - Supports drawing various charts from query results

    - Creates domain-specific agents through table\/view filtering

  ],
)

#regular-entry(
  [
    #strong[#link("https://github.com/januarylabs/sdk-it")[SDK-IT]]

  ],
  [
    Jan 2024 – present

  ],
  main-column-second-row: [
    #summary[Developer tool for SDK generation and OpenAPI automation]

    - Generates type-safe SDKs from OpenAPI specs and OpenAPI specs from TypeScript code

    - First-party React Query integration for frontend data fetching

    - Isomorphic design enables backend integration testing

  ],
)

#regular-entry(
  [
    #strong[#link("https://github.com/ezzabuzaid/serverize")[Serverize]]

  ],
  [
    Jan 2024 – present

  ],
  main-column-second-row: [
    #summary[Self-hosted container platform for development deployments]

    - Auto-generates Dockerfiles by analyzing codebase configuration

    - Supports 7+ frameworks including Next.js, Nuxt, Astro, and FastAPI

    - Secure secrets management with encrypted environment variables

  ],
)

== Experience

#regular-entry(
  [
    #strong[Senior Software Engineer], Kortext -- Contract - Remote

  ],
  [
    Oct 2021 – present

  ],
  main-column-second-row: [
    #summary[EdTech platform for digital learning]

    - Utilized TypeScript Compiler API to accelerate Angular upgrades via automatic migrations

    - Implemented and engineered the UX of Kortext AI chatbot

    - Restructured monolithic monorepo into domain-based architecture for team scalability

    - Drove technical improvements through written proposals and RFC process

    - Collaborated with QA, product managers, and designers to deliver features and resolve cross-functional issues

  ],
)

#regular-entry(
  [
    #strong[Senior Software Engineer], Equiti Group -- Amman, Jordan

  ],
  [
    Mar 2019 – Oct 2021

  ],
  main-column-second-row: [
    #summary[International CFD Forex broker]

    - Built Front-End CRM from scratch using Angular.

    - Contributed to converting monolithic .NetCore project to microservices using Node.js and .Net 5 with gRPC

    - Utilized Node.js to send RabbitMQ messages to browser via SSE

    - Handled stock data streams using reactive programming (RxJS and Rx.NET)

    - Established CI pipelines in Azure DevOps for Angular, Node.js, .NetCore, and Flutter

    - Wrote automated tests in JavaScript and C\# for product quality and stability

  ],
)

#regular-entry(
  [
    #strong[JavaScript Engineer], NoventApp for Business Solutions -- Amman, Jordan

  ],
  [
    Jan 2017 – Mar 2019

  ],
  main-column-second-row: [
    - Built food delivery application from scratch using Node.js, TypeScript, and Angular

    - Integrated Firebase Realtime-Database for live driver location tracking

  ],
)

== Education

#education-entry(
  [
    #strong[Al-Balqa Applied University - Faculty of Engineering], BS in Computer Engineering -- Amman, Jordan

  ],
  [
    Sept 2016 – June 2020

  ],
  main-column-second-row: [
  ],
)

== Languages

#strong[Arabic:] Native

#strong[English:] Full Professional Proficiency

== Skills

#strong[AI\/ML:] LLM Applications, RAG Systems, Agent Architectures, OpenAI API, Vercel AI SDK

#strong[Languages:] TypeScript, C\# and Dart.

#strong[Backend:] Node.js, .NetCore, gRPC, Prisma, PostgreSQL.

#strong[Frontend:] React, Angular, RxJS, PWA, SSR.

#strong[Infrastructure:] Docker, GCP, Azure DevOps, CI\/CD, Firebase.
