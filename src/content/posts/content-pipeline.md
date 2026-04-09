---
title: "Content Pipeline"
description: "How I use Codex automations and a custom agent skill to publish four blog series on a schedule without burning out."
publishedAt: "2026-04-09T00:00:00.00Z"
featured: 1
tags: ["AI", "Agents", "Automation", "Writing"]
---

I wanted to publish consistently but I’m terrible at it. I’d write one post, feel good about it, then go silent for months. The problem was never ideas — it was the effort of sitting down, drafting, editing, and shipping on a schedule. So I built a system that does most of the heavy lifting for me.

## Sourcing Content

Before any automation runs, I needed topics. I sat down with Claude Code and pointed it at four sources:

**Prospect emails** — Gmail holds every conversation I've had with potential users. Their questions, objections, and feature requests are content gold. If three people ask the same question, that's a Need & Want post.

**Google Tasks** — I've dumped blog ideas into Google Tasks for a long time without writing any of them. Most were half-formed, but Claude Code helped me sort through them, merge duplicates, and match each one to a series.

**Git commits** — The commit history is a record of every decision I made. An interesting refactor, a tricky architectural call, a performance fix — each one is a potential Engineering Deep Dive. Claude Code scans recent commits and flags the ones worth explaining.

**Codebase notes** — TODOs, inline comments, README gaps. The codebase itself tells you what's undocumented.

From those four sources, I curated a content calendar — a prioritized list of topics, assigned to the right series, with a publishing schedule. That calendar is the brain. Everything downstream just executes it.

## The Series

I split my content into four series, each with its own purpose and rhythm.

**Engineering Deep Dive** — A detailed post about a specific engineering decision or architectural choice. Published weekly on Tuesdays. The backlog comes straight from the codebase — if I made an interesting technical call, it becomes a post.

**Dev Log** — Daily writing that documents whatever I’m building. Low effort, high frequency. Think of it as a public scratchpad.

**Feature Spotlight** — A dedicated article about a single feature. Published biweekly on Wednesdays. I pull the backlog from the pricing page — every feature listed there deserves its own explanation.

**Need & Want** — Demo-driving articles. When someone asks for a feature or describes a need, that request becomes a post. No fixed schedule, but if the backlog grows, these go out weekly on Fridays.

## The Machinery

Each series has its own Codex automation — a scheduled task with a prompt that tells it what to write next. The automations don’t decide what to write; the content calendar already answers that. They just pick up the next topic and execute.

<div class="pipeline-flow">
  <div class="stage"><span class="label">Sources</span><span class="desc">Gmail, Google Tasks, git commits, codebase notes</span></div>
  <div class="arrow">↓</div>
  <div class="stage"><span class="label">Calendar</span><span class="desc">Prioritized topics assigned to series</span></div>
  <div class="arrow">↓</div>
  <div class="stage"><span class="label">Codex</span><span class="desc">Scheduled automation picks up next topic</span></div>
  <div class="arrow">↓</div>
  <div class="stage"><span class="label">Agent</span><span class="desc">Writing skill drafts the full post</span></div>
  <div class="arrow">↓</div>
  <div class="stage"><span class="label">Review</span><span class="desc">I read, fix tone, add personal touches</span></div>
  <div class="arrow">↓</div>
  <div class="stage"><span class="label">Publish</span><span class="desc">Ship to site, syndicate to socials</span></div>
</div>

Here’s what a typical automation prompt looks like:

<div class="bt-card">
Write next from <span class="hl">Calendar</span> blog using <span class="hl">.claude/skills/blog-writer/SKILL.md</span>. Strictly follow all phases, spawn all subagents and see all skill references.
</div>

The drafts come from an agent skill I built specifically for writing blog posts. It takes the topic, researches the codebase for context, and produces a full draft. I do the final review — read it, fix the parts that sound off, add personal touches, and publish.

> [!TIP] The division of labor
> The agent handles the blank-page problem. I handle the voice.

The site has a library of rich components — animated callouts, interactive code blocks, comparison tables, and more. The agent is equipped with an animation skill and encouraged to reach for these components instead of plain text whenever they serve the content. Each time it writes a post, it can reuse an existing component or create a new one tailored to the piece. Over time, this grows the component library organically. Posts written months apart end up sharing visual language, and the library gets richer with every draft.

## From Calendar to Graph

Right now, the content calendar is a flat list — topics in order, assigned to series. That’s fine for getting started. But flat lists don’t capture how content actually relates.

Every post I write links back to other posts. These backlinks form a graph, and as the graph grows, the calendar should reflect it.

<div class="content-graph"><span class="node">[Engineering Deep Dive: Caching]</span>
        <span class="edge">↓</span>              <span class="edge">↘</span>
<span class="node">[Feature Spotlight: CDN]</span>  <span class="edge">→</span>  <span class="node">[Dev Log: Cache Bugs]</span>
        <span class="edge">↑</span>
<span class="node">[Need & Want: Speed Request]</span></div>

The Engineering Deep Dive on a caching decision links to the Feature Spotlight that explains the feature it caches for. A Need & Want post links to the Dev Log entry where I first ran into the problem.

The next step is to feed Google Search Console data back into the calendar in a structured way. Two signals matter most: which posts get the most impressions, and what keywords people search for. Impressions tell me what resonates. Keywords tell me what’s missing.

With that data, the calendar stops being "what should I write next" and becomes "what connects to what." A new topic doesn’t just land at the bottom of a list — it slots into the graph based on which existing posts it strengthens. A post with high impressions but no backlinks pointing to it is a dead end worth fixing. A keyword cluster with no coverage is a gap worth filling.

The goal is a content graph, not a content calendar. Linear planning gets you started. Graph-based planning keeps the whole body of work compounding.

## Syndication

> [!NOTE] Reality check
> A blog post that lives only on my site reaches whoever already visits my site — which, starting from zero, is nobody.

So each post needs to travel.

The plan is to syndicate to X and LinkedIn. Not the full article — a shorter version adapted to each platform, linking back to the original. A thread on X that pulls out the key insight. A LinkedIn post that frames it for a broader audience. Same core idea, different packaging.

This part is still manual. I publish to the site, then write the social versions myself. It works, but it's the last bottleneck in the pipeline. Everything upstream — the calendar, the drafts, the scheduling — runs on automation. Syndication is the obvious next piece to automate: take the published post, generate platform-specific versions, and queue them up.

## Next Steps

1. Add NotebookLM infographics as article hero images.
2. Support multiple languages, mainly English and Arabic.
3. Investigate interactive posts, where the actual app renders inside the article and readers can play with it.
