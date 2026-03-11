// my - app / lib / api.ts;
// const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:4000';

// export async function apiRequest<T>(
//   path: string,
//   options: { method?: string; token?: string; body?: unknown } = {},
// ): Promise<T> {
//   const { method = 'GET', token, body } = options;

//   const res = await fetch(`${API_BASE}${path}`, {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   const data = await res.json().catch(() => ({}));
//   if (!res.ok) throw new Error(data.error || 'Request failed');
//   return data as T;
// }

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:4000';

export async function apiRequest<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const { method = 'GET', body } = options;

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.error || 'Request failed');

  return data as T;
}
