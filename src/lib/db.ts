// Simple REST client for Supabase PostgREST queries
// Used instead of supabase-js client due to PostgrestVersion compatibility issues

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const headers = () => ({
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation',
});

const authHeaders = (token: string) => ({
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation',
});

const restUrl = (table: string, params?: string) =>
  `${SUPABASE_URL}/rest/v1/${table}${params ? `?${params}` : ''}`;

export const dbSelect = async <T = unknown>(table: string, params?: string): Promise<T[]> => {
  const resp = await fetch(restUrl(table, `select=*${params ? `&${params}` : ''}`), { headers: headers() });
  if (!resp.ok) throw new Error(`DB select error: ${resp.status}`);
  return resp.json();
};

export const dbSelectAuth = async <T = unknown>(table: string, token: string, params?: string): Promise<T[]> => {
  const resp = await fetch(restUrl(table, `select=*${params ? `&${params}` : ''}`), { headers: authHeaders(token) });
  if (!resp.ok) throw new Error(`DB select error: ${resp.status}`);
  return resp.json();
};

export const dbInsert = async <T = unknown>(table: string, data: Record<string, unknown>, token: string): Promise<T[]> => {
  const resp = await fetch(restUrl(table), {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`DB insert error: ${resp.status} ${err}`);
  }
  return resp.json();
};

export const dbUpdate = async (table: string, id: string, data: Record<string, unknown>, token: string): Promise<void> => {
  const resp = await fetch(restUrl(table, `id=eq.${id}`), {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`DB update error: ${resp.status} ${err}`);
  }
};

export const dbDelete = async (table: string, id: string, token: string): Promise<void> => {
  const resp = await fetch(restUrl(table, `id=eq.${id}`), {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`DB delete error: ${resp.status} ${err}`);
  }
};
