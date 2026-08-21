type HealthPayload = {
  source: string;
  fetchedAt: string;
  ok: boolean;
  summary: string;
  data: Record<string, unknown> | null;
  error?: string;
};

async function getHealthData(): Promise<HealthPayload> {
  const fetchedAt = new Date().toISOString();
  const source = "https://api.github.com/repos/vercel/next.js";

  try {
    const response = await fetch(source, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "foundations-app-health-check",
      },
    });

    if (!response.ok) {
      return {
        source,
        fetchedAt,
        ok: false,
        summary: `Upstream responded with HTTP ${response.status}`,
        data: null,
        error: response.statusText || "Request failed",
      };
    }

    const json = (await response.json()) as {
      full_name?: string;
      stargazers_count?: number;
      open_issues_count?: number;
      language?: string;
      html_url?: string;
    };

    return {
      source,
      fetchedAt,
      ok: true,
      summary: "Server Component successfully fetched public repository metadata.",
      data: {
        full_name: json.full_name ?? null,
        stargazers_count: json.stargazers_count ?? null,
        open_issues_count: json.open_issues_count ?? null,
        language: json.language ?? null,
        html_url: json.html_url ?? null,
      },
    };
  } catch (error) {
    return {
      source,
      fetchedAt,
      ok: false,
      summary: "Fetch failed inside the Server Component.",
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default async function HealthPage() {
  const health = await getHealthData();

  return (
    <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-12 md:py-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-ink">
        Health check
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
        Live fetched data
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        This route is a Server Component. It fetches public GitHub API data for the Next.js repo—no
        API keys, no secrets.
      </p>

      <div
        className={`mt-8 rounded border p-5 ${health.ok ? "border-accent bg-surface" : "border-red-300 bg-red-50"}`}
      >
        <p className="font-semibold text-foreground">{health.ok ? "Status: OK" : "Status: Error"}</p>
        <p className="mt-2 text-sm text-muted">{health.summary}</p>
        <dl className="mt-4 grid gap-2 text-sm md:grid-cols-2">
          <div>
            <dt className="text-muted">Source</dt>
            <dd className="break-all font-medium">{health.source}</dd>
          </div>
          <div>
            <dt className="text-muted">Fetched at (UTC)</dt>
            <dd className="font-medium">{health.fetchedAt}</dd>
          </div>
        </dl>
      </div>

      {health.data ? (
        <div className="mt-6 overflow-x-auto border border-line bg-surface p-4">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold">Payload</h2>
          <pre className="mt-3 text-sm text-muted">{JSON.stringify(health.data, null, 2)}</pre>
        </div>
      ) : null}

      {health.error ? (
        <p className="mt-4 text-sm text-red-700" role="alert">
          Error detail: {health.error}
        </p>
      ) : null}
    </section>
  );
}
