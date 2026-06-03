export type AdminFetchResult<T> = {
  ok: boolean;
  data?: T;
  error?: string;
  status: number;
};

export async function adminFetch<T = unknown>(
  url: string,
  options?: RequestInit
): Promise<AdminFetchResult<T>> {
  const headers = new Headers(options?.headers);
  const isFormData = options?.body instanceof FormData;
  if (!isFormData && options?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, { ...options, headers });
  let json: { success?: boolean; data?: T; error?: string };
  try {
    json = await res.json();
  } catch {
    return {
      ok: false,
      error: "Respuesta inválida del servidor",
      status: res.status,
    };
  }

  if (!json.success) {
    return {
      ok: false,
      error: json.error || "Ocurrió un error",
      status: res.status,
    };
  }

  return { ok: true, data: json.data, status: res.status };
}

export function linesToArray(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function arrayToLines(arr: string[] | undefined | null): string {
  return (arr ?? []).join("\n");
}
