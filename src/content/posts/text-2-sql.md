---
title: "Text 2 SQL"
description: "On build agents generating SQL queries from natural language prompts."
featured: 1000
publishedAt: "2025-11-11T00:00:00.00Z"
---

An LLM is great at generating text based on patterns it has seen during training. This makes it a powerful tool for generating SQL queries from natural language prompts.

A simple agent that can do this would need to understand the database schema to generate accurate queries, the user input and good prompt engineering to guide the model towards generating valid SQL.

```ts
import { groq } from "@ai-sdk/groq";
import { tool } from "ai";
import z from "zod";
import { agent } from "@deepagents/agent";

export const text2sqlAgent = agent<{ sql: string }, { schema: Introspection }>({
  name: "text2sql",
  model: groq("openai/gpt-oss-20b"),
  prompt: (state) => `
      <objective>
        Generate an SQL query based on the user question and database schema.
      </objective>
      <schema>
        ${state.schema}
      </schema>
  `,
  output: z.object({
    sql: z
      .string()
      .describe("The SQL query generated to answer the user question."),
  }),
});

console.log(
  toOutput(
    await generate(
      text2sqlAgent,
      [user("List all users who signed up in the last 30 days.")],
      {
        schema: await introspectDB("postgres://user:pass@host:5432/db"),
      },
    ),
  ),
);
```

