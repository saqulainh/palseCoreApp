/**
 * PulseCore API Client
 * Centralized fetch wrapper with auth headers, error handling, and streaming support.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = 10000, headers: customHeaders, ...rest } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...rest,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...customHeaders,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new ApiError(
        `API Error: ${res.status} ${res.statusText}`,
        res.status,
        errorData
      );
    }

    return res.json() as Promise<T>;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Stream a response from the API (for AI Coach chat).
 * Yields chunks of text as they arrive.
 */
async function* streamRequest(
  endpoint: string,
  body: Record<string, unknown>
): AsyncGenerator<string> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok || !res.body) {
    throw new ApiError(`Stream error: ${res.status}`, res.status);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}

// ── Convenience methods ──

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),

  put: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),

  delete: <T>(endpoint: string, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),

  stream: streamRequest,
};

export { ApiError };
