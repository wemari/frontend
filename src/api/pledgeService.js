// src/api/pledgeService.js
const BASE = process.env.REACT_APP_API_URL ;

export async function fetchPledges(memberId) {
  const res = await fetch(`${BASE}/members/${memberId}/pledges`);
  if (!res.ok) throw new Error('Failed to fetch pledges');
  return res.json();
}

export async function createPledge(memberId, data) {
  const res = await fetch(`${BASE}/pledges`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ member_id: memberId, ...data })
  });
  if (!res.ok) throw new Error('Failed to create pledge');
  return res.json();
}
