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

  #headline([Software Engineer & AI Agent Developer])

#connections(
  [#connection-with-icon("location-dot")[Amman, Jordan]],
  [#link("mailto:ezzabuzaid@gmail.com", icon: false, if-underline: false, if-color: false)[#connection-with-icon("envelope")[ezzabuzaid\@gmail.com]]],
  [#link("tel:+962-7-9280-7794", icon: false, if-underline: false, if-color: false)[#connection-with-icon("phone")[07 9280 7794]]],
  [#link("https://linkedin.com/in/ezzabuzaid", icon: false, if-underline: false, if-color: false)[#connection-with-icon("linkedin")[ezzabuzaid]]],
  [#link("https://github.com/ezzabuzaid", icon: false, if-underline: false, if-color: false)[#connection-with-icon("github")[ezzabuzaid]]],
)


== Summary

Software engineer with 8 years of experience building developer tools, frameworks, and AI-powered applications. Specialized in AI agent development with 2 years of production experience building LLM applications, autonomous agents, RAG systems, and multi-agent architectures. Creator of multiple open-source frameworks including DeepAgents (agent development), January (backend DSL), and Serverize (container platform). Strong track record of rapidly shipping production systems.

== Projects

#regular-entry(
  [
    #strong[#link("https://github.com/ezzabuzaid/deepagents")[DeepAgents]]

  ],
  [
    Jan 2023 – present

  ],
  main-column-second-row: [
    #summary[TypeScript-native AI agent framework designed to be batteries-included]

    - Built comprehensive agent development framework for the TypeScript\/JavaScript ecosystem

    - Simpler and more accessible alternative to LangChain for TS developers

    - Supports autonomous agents, RAG systems, and multi-agent architectures

  ],
)

#regular-entry(
  [
    #strong[#link("https://github.com/ezzabuzaid/january")[January]]

  ],
  [
    Jan 2022 – present

  ],
  main-column-second-row: [
    #summary[TypeScript backend framework with compile-time DSL and workflow-based architecture]

    - Designed internal DSL using compile-time primitives for type-safe backend development

    - Workflow-based architecture that simplifies complex backend operations

    - Automatic code generation reduces boilerplate and enforces consistent patterns

  ],
)

#regular-entry(
  [
    #strong[#link("https://github.com/ezzabuzaid/serverize")[Serverize]]

  ],
  [
    June 2023 – present

  ],
  main-column-second-row: [
    #summary[Self-hosted container platform for development deployments]

    - Built from idea to working product in under 1 month

    - Features named channels with versioned releases and per-channel secrets management

    - Container-based architecture similar to fly.io but optimized for development workflows

  ],
)

#regular-entry(
  [
    #strong[#link("https://github.com/ezzabuzaid/sqlite-parser")[sqlite-parser]]

  ],
  [
    Jan 2023

  ],
  main-column-second-row: [
    #summary[SQLite query parser written from scratch]

    - Implemented parser for core SQL subset (SELECT, INSERT, UPDATE, DELETE)

    - Built as deep-dive learning exercise into compiler\/parser design

    - Foundation for text2sql agent project

  ],
)

#regular-entry(
  [
    #strong[Text2SQL Agent]

  ],
  [
    Jan 2023

  ],
  main-column-second-row: [
    #summary[AI agent that converts natural language queries to SQL]

    - Converts natural language to valid SQLite queries

    - Integrates with sqlite-parser for query validation

    - Demonstrates practical application of LLM + traditional tools

  ],
)

== Experience

#regular-entry(
  [
    #strong[Senior Software Engineer], Kortext -- Remote

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

    - Led code reviews, technical decisions, and mentored team members

  ],
)

#regular-entry(
  [
    #strong[Software Engineer], Equiti.com -- Amman, Jordan

  ],
  [
    Mar 2019 – Oct 2021

  ],
  main-column-second-row: [
    #summary[International CFD Forex broker]

    - Built Front-End CRM from scratch using Angular 9 and Material Design

    - Decreased loading latency by leveraging Angular SSR and PWA

    - Converted Monolithic .NetCore project to Microservices using Node.js and .Net 5 with gRPC

    - Utilized Node.js to send RabbitMQ messages to browser via SSE

    - Handled stock data streams using reactive programming (RxJS and Rx.NET)

    - Established CI pipelines in Azure DevOps for Angular, Node.js, .NetCore, and Flutter

    - Optimized SEO for multiple web products (TradeHub.com, FXPesa.com)

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
    - Developed Food delivery application using Node.js, MySQL, TypeORM, TypeScript, and Angular

    - Implemented policy-based caching in browser to increase data retrieval speed

    - Integrated Firebase Realtime-Database to track drivers' locations

    - Built PWA features including Add To Home Screen, Push Notifications, and Offline mode

    - Built Angular boilerplate project used as template for 3 other projects

    - Migrated application from Angular 2 to Angular 7

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

#strong[Languages:] TypeScript, JavaScript, C\#

#strong[Frontend:] Angular, RxJS, Material Design, PWA, SSR, Sass, Bootstrap

#strong[Backend:] Node.js, Express.js, .NetCore, gRPC, TypeORM, MySQL

#strong[AI\/ML:] OpenAI API, Vercel AI SDK, LLM Applications, RAG, Agent Architectures

#strong[Infrastructure:] Docker, Azure DevOps, CI\/CD, Firebase, RabbitMQ, Git

#strong[Testing:] Jasmine, Jest, xUnit, Automated Testing

#strong[Tools:] GitHub, Jira, Microsoft DevOps, Azure

#strong[Research Interests:] AI Agents, Code AI, Tool Use, Agent Reasoning & Memory

== Technical Strengths

Builder Mentality: 8 years shipping production software, from parsers to platforms

AI Agent Expertise: 2 years building production AI agents for enterprise clients

Framework Design: Created multiple developer frameworks (January, DeepAgents)

Fast Learner: Self-taught AI development in 3-6 months; built Serverize in \< 1 month

Open Source: Active contributor with public portfolio of significant projects
