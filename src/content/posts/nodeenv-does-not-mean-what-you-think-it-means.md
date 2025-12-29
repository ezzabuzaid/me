---
title: "NODE_ENV doesn't mean what you think it means"
description: "Some thoughts on the ambiguous usage of NODE_ENV in Node.js applications."
featured: 1
publishedAt: "2025-11-11T00:00:00.00Z"
---

`NODE_ENV` is not a server discriminator or some kind of identifier for the server, rather it is an ambiguous umbrella variable that some developers use as an on-off switch for code that works in an environment and not in others.

Both “development" and "production" aren't environments - they're vague labels that mean different things to different developers.
To one developer, `NODE_ENV=development` means "running on my laptop with hot reload." To another, it means "connecting to the dev database cluster." To a third, it means "enable verbose logging."

This ambiguity is the problem. When you write:

```ts
if (process.env.NODE_ENV === "development") {
  // What behavior am I actually enabling here? // Local machine? Staging server? Debug mode?
}
```

Its value doesn't communicate its intent, seriously, what is `NODE_ENV=development`? What do you mean by **development** here? I don't know, do you? Does your teammate know?

Your actual environment is defined by explicit configuration: database URLs, API keys, feature flags, and log levels. Not by a single ambiguous string that tries to mean everything and ends up meaning nothing.

### Do Not Use `NODE_ENV` for Configuration

Use proper environment variables to manage configuration.

I've seen `NODE_ENV` used like this many times:

```ts
import { Reporter } from "package-that-have-flag-switch";

const reporter = new Reporter({
  shouldEnableReporting: process.env.NODE_ENV !== "development",
});
```

Alright, tell me, what is not `development`? You, me and everyone else don’t know.

```ts
import { Reporter } from "package-that-have-flag-switch";

const reporter = new Reporter({
  shouldEnableReporting: process.env.ENABLE_REPORTING,
});
```

See this now. You, me and everyone else can just look at this piece of code and understand this variable and what you meant by it.

No, do not tell me you have documented its usage. That makes it worse; you need to tell people to read this document.

### The `NODE_ENV=test`

Your application will behave differently when running tests - mocked HTTP clients, test databases, faster crypto. That's fine. The problem is using `NODE_ENV=test` to control that behavior:

Wrong

```ts
// Configuration masquerading as environment detection
const db =
  process.env.NODE_ENV === "test"
    ? "postgresql://localhost/test_db"
    : "postgresql://localhost/prod_db";
```

Right

```ts
// Explicit configuration
const db = process.env.DATABASE_URL;
```

Your test runner should set `DATABASE_URL=postgresql://localhost/test_db`. Your deployment should set `DATABASE_URL=postgresql://prod/app_db`. Same code, different configuration.

Again, same code, different configuration. **An environment is your code and configuration put together.**

### Always run your Node.js with `NODE_ENV=production` set

Yes, even on your laptop. Even in tests.

[A few libraries in the npm registry recognise using the **NODE_ENV** variable and default it to a **development** setting](https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production#:~:text=a%20few%20libraries%20in%20the%20npm%20registry%20recognize%20using%20the%20NODE_ENV%20variable%20and%20default%20it%20to%20a%20development%20setting) and [setting `NODE_ENV` to anything but production is considered an antipattern.](https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production#:~:text=setting%20NODE_ENV%20to%20anything%20but%20production%20is%20considered%20an%20antipattern.)

Why you ask? Because some npm packages use `NODE_ENV` to toggle behavior, and as mentioned above, if you set it to anything else, you're running different code in different places.

By setting `NODE_ENV=production` everywhere, you force consistency. The code that runs on your laptop is the same code that runs in production.

"**But I need dev warnings!**" Then use explicit flags:

```ts
// Instead of relying on NODE_ENV
const showDebugInfo = process.env.ENABLE_DEBUG === "true";
const verboseLogging = process.env.LOG_LEVEL === "verbose";
```

This way:

- Libraries get `NODE_ENV=production` and behave consistently.
- Your app uses explicit configuration for actual behavior changes.
- No surprises when you deploy.

### `NODE_ENV` is not the server name or its location

I have seen some people use `NODE_ENV` to name a server, like `NODE_ENV=production-us-east-1`. By doing this, you basically have some code that runs "dev" behavior in a server considered production.

It's not necessary that you write this code yourself for things to break. Some packages like Express.js rely on the `NODE_ENV` variable and default it to `development`. For instance, when `NODE_ENV` is not set to `production`, Express will enable verbose error messages with stack traces (a potential security risk in production).

So even if you don't check `NODE_ENV` in your own code, setting it to anything but `production` can silently degrade performance and expose security issues.

### Key Takeaways

- Don't diverge your code by running some of it sometimes.
- Do not use `NODE_ENV` as a feature flag. Use a dedicated feature flags service/package instead.
- `NODE_ENV` is not a server ID or server name.
