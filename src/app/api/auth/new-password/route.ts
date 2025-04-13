import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { serialize } from 'cookie';
import { PayloadAccessI, PayloadRefreshI } from '../payloads.interface';

export async function POST(req: Request) {
  const { old_password, new_password, repeat_new_password } = await req.json();
  const cookieStore = await cookies();

  let access_token = cookieStore.get('access_token')?.value;
  const refresh_token = cookieStore.get('refresh_token')?.value;

  if (!refresh_token) {
    return new Response(JSON.stringify({ message: 'No refresh token' }), { status: 401 });
  }

  const api_address = process.env.LOCAL_API_URL;
  const setCookieHeaders: string[] = [];

  // Функция отправки запроса на смену пароля
  const sendChangePasswordRequest = async (token: string) => {
    return await fetch(`${api_address}/auth/new_password`, {
      method: 'POST',
      body: JSON.stringify({ old_password, new_password, repeat_new_password }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

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

  // Первый запрос
  let response = await sendChangePasswordRequest(access_token!);

  // Если access_token истёк — обновим токены и попробуем снова
  if (response.status === 401) {
    const refreshed = await refreshTokensOnServer();

    if (!refreshed.success || !refreshed.access_token) {
      return new Response(JSON.stringify({ message: 'Token refresh failed' }), { status: 401 });
    }

    access_token = refreshed.access_token;
    response = await sendChangePasswordRequest(access_token);
  }

  const responseData = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ message: responseData.message || 'Unknown error' }), {
      status: response.status,
    });
  }

  const headers = new Headers();
  setCookieHeaders.forEach((cookie) => headers.append('Set-Cookie', cookie));

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers,
  });
}
