import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { serialize } from 'cookie';
import { PayloadAccessI, PayloadRefreshI } from '../auth/payloads.interface';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const api_address = process.env.LOCAL_API_URL;

  const setCookieHeaders: string[] = [];

  // Используем сервер для рефреша токенов
  const refreshTokensOnServer = async (): Promise<{ success: boolean; access_token?: string }> => {
    const res = await fetch(`${api_address}/auth/refresh`, {
      method: 'GET',
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
    });

    if (!res.ok) {
      return { success: false };
    }

    const { access_token, refresh_token } = await res.json();

    const payloadAccess: PayloadAccessI = jwtDecode(access_token);
    const payloadRefresh: PayloadRefreshI = jwtDecode(refresh_token);

    setCookieHeaders.push(
      serialize('access_token', access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        expires: new Date(payloadAccess.exp * 1000),
      })
    );

    setCookieHeaders.push(
      serialize('refresh_token', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        expires: new Date(payloadRefresh.exp * 1000),
      })
    );

    return { success: true, access_token };
  };

  const accessToken = cookieStore.get('access_token');

  let decodedAccessToken: PayloadAccessI | null = null;

  if (!accessToken?.value) {
    const refreshed = await refreshTokensOnServer();
    if (!refreshed.success || !refreshed.access_token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    decodedAccessToken = jwtDecode(refreshed.access_token);
  } else {
    decodedAccessToken = jwtDecode(accessToken.value);
  }

  const headers = new Headers();
  setCookieHeaders.forEach((cookie) => headers.append('Set-Cookie', cookie));

  return new Response(JSON.stringify({ decodedAccessToken }), {
    status: 200,
    headers,
  });
}
