const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export async function post(path, data) {
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function get(path) {
  const res = await fetch(API_BASE + path);
  return res.json();
}

export async function del(path) {
  const res = await fetch(API_BASE + path, {
    method: 'DELETE',
  });

  if (res.status === 204) return { message: 'Deleted successfully' };
  return res.json();
}
