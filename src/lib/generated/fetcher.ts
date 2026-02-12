export type FetcherConfig = RequestInit & { baseUrl?: string };

type OrvalRequestArgs = {
  url: string;
  method: string;
  params?: Record<string, any>;
  signal?: AbortSignal;
  data?: any;
  body?: any;
  headers?: HeadersInit;
};

/**
 * Custom fetcher compatible with Orval's `mutator` signature.
 *
 * Orval will call this as:
 *   customFetcher<T>({ url, method, ... }, options)
 */
export async function customFetcher<T>(
  { url, method, params, data, body, signal, headers }: OrvalRequestArgs,
  options: FetcherConfig = {},
): Promise<T> {
  const { baseUrl = "https://jsonplaceholder.typicode.com", ...baseConfig } =
    options;

  // Build query string from params (if provided)
  let finalUrl = url;
  if (params && Object.keys(params).length > 0) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        search.append(key, String(value));
      }
    });
    const qs = search.toString();
    if (qs) {
      finalUrl += (finalUrl.includes("?") ? "&" : "?") + qs;
    }
  }

  const requestInit: RequestInit = {
    ...baseConfig,
    method,
    signal: signal ?? baseConfig.signal,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
      ...(baseConfig.headers || {}),
    },
    body:
      data !== undefined
        ? typeof data === "string"
          ? data
          : JSON.stringify(data)
        : body ?? baseConfig.body,
  };

  const response = await fetch(`${baseUrl}${finalUrl}`, requestInit);

  if (!response.ok) {
    let errorBody: unknown;
    try {
      errorBody = await response.json();
    } catch {
      // ignore parse error
    }

    const error = new Error(
      `Request to ${finalUrl} failed with status ${response.status}`,
    ) as Error & { status?: number; data?: unknown };
    error.status = response.status;
    error.data = errorBody;
    throw error;
  }

  if (response.status === 204) {
    // No Content
    return undefined as T;
  }

  return (await response.json()) as T;
}

