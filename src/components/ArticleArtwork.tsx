const covers: Record<string, { label: string; symbol: string; color: string }> =
  {
    ways_of_writing: { label: "Ways of writing", symbol: "Aa", color: "lime" },
    "content-pipeline": {
      label: "Content pipeline",
      symbol: ">_",
      color: "forest",
    },
    agent_vs_harness: {
      label: "Agent / harness",
      symbol: "{ }",
      color: "blue",
    },
    "nodeenv-does-not-mean-what-you-think-it-means": {
      label: "NODE_ENV",
      symbol: "env",
      color: "paper",
    },
    "gentle-introduction-to-typescript-compiler-api": {
      label: "Inside the compiler",
      symbol: "ts",
      color: "blue",
    },
    "running-untrusted-javascript-code": {
      label: "Outside the sandbox",
      symbol: "</>",
      color: "forest",
    },
  };

export function ArticleArtwork({
  slug,
  topic,
}: {
  slug: string;
  topic: string;
}) {
  const index = [...slug].reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  );
  const cover = covers[slug] ?? {
    label: topic,
    symbol: [">_", "{ }", "[ ]", "Aa"][index % 4],
    color: ["lime", "forest", "blue", "paper"][index % 4],
  };

  return (
    <div class={`generated-cover cover-${cover.color}`} aria-hidden="true">
      <svg
        class="cover-diagram"
        viewBox="0 0 480 480"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M0 80H480M0 160H480M0 240H480M0 320H480M0 400H480M80 0V480M160 0V480M240 0V480M320 0V480M400 0V480"
          stroke="currentColor"
          opacity=".1"
        />
        <path
          d="M80 160H320V320H400M80 160L240 80H400M80 320H160V400H320"
          stroke="currentColor"
          opacity=".35"
        />
        {[
          [80, 160],
          [320, 160],
          [320, 320],
          [400, 320],
          [80, 320],
          [160, 400],
          [320, 400],
          [240, 80],
          [400, 80],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="4"
            fill="currentColor"
          />
        ))}
        <circle
          cx="240"
          cy="240"
          r="132"
          stroke="currentColor"
          strokeDasharray="1 7"
          opacity=".4"
        />
      </svg>
      <span class="cover-number">
        FIELD NOTES / {String(index % 100).padStart(2, "0")}
      </span>
      <span class="cover-symbol">{cover.symbol}</span>
      <span class="cover-label">{cover.label}</span>
    </div>
  );
}
