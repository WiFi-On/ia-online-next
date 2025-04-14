import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { PayloadAccessI, PayloadRefreshI } from '../payloads.interface';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const api_address = process.env.LOCAL_API_URL;

  const response = await fetch(`${api_address}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
      status: 401,
    });
  }

  const { access_token, refresh_token } = await response.json();

  const payloadAccess: PayloadAccessI = jwtDecode(access_token);
  const payloadRefresh: PayloadRefreshI = jwtDecode(refresh_token);

  const cookieStore = await cookies();

  cookieStore.set('access_token', access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(payloadAccess.exp * 1000),
  });
  cookieStore.set('refresh_token', refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(payloadRefresh.exp * 1000),
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
