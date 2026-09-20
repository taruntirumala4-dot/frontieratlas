const defaultApiUrl = process.env.NODE_ENV === "development"
  ? "http://127.0.0.1:8787"
  : "https://frontieratlas-backend.morningsignal-india.workers.dev";

function getApiBase(): string {
  // In development, directly connect to 127.0.0.1:8787 (avoids 5000ms Windows IPv6 localhost lag)
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8787";
  }
  // In production, use empty string so requests go through Next.js rewrites (same origin, no CORS)
  return "";
}

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const base = getApiBase();
  let url = `${base}${path}`;
  
  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      credentials: "include",
      next: { revalidate: 120 },
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    } as any);
  } catch (fetchErr) {
    // If local backend (127.0.0.1:8787) is not running, fall back to the live deployed API
    if (base.includes("localhost") || base.includes("127.0.0.1")) {
      url = `https://frontieratlas-backend.morningsignal-india.workers.dev${path}`;

      response = await fetch(url, {
        ...options,
        credentials: "include",
        next: { revalidate: 120 },
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      } as any);
    } else {
      throw fetchErr;
    }
  }

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errJson = await response.json();
      errorDetail = errJson?.detail || errJson?.message || JSON.stringify(errJson);
    } catch {
      try {
        errorDetail = await response.text();
      } catch {}
    }
    const message = `API error: ${response.status} ${response.statusText}${errorDetail ? ` - ${errorDetail}` : ''}`;
    throw new Error(message);
  }

  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    const preview = text.length > 500 ? `${text.slice(0, 500)}…` : text;
    if (process.env.NODE_ENV === "development") {
      console.error(`[fetchApi] JSON parse error on ${url}. Status: ${response.status}. Body preview: "${preview}"`);
    }
    throw new Error(`Invalid JSON response from API: ${url}`, { cause: error });
  }
}
