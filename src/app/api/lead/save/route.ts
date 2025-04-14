import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { serialize } from 'cookie';
import { PayloadAccessI, PayloadRefreshI } from '../../auth/payloads.interface';

export async function POST(req: Request) {
  const { name, phone, address, comment, services } = await req.json();
  const cookieStore = await cookies();

  let access_token = cookieStore.get('access_token')?.value;
  const refresh_token = cookieStore.get('refresh_token')?.value;

  if (!refresh_token) {
    return new Response(JSON.stringify({ message: 'No refresh token' }), { status: 401 });
  }

  const api_address = process.env.LOCAL_API_URL;
  const setCookieHeaders: string[] = [];

  // Функция отправки запроса на сохранение лида
  const sendLeadRequest = async (token: string) => {
    return await fetch(`${api_address}/lead/save`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        phone_number: phone,
        address,
        comment,
        is_internet: services.includes(1),
        is_cleaning: services.includes(2),
        is_shipping: services.includes(3),
      }),
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
        sameSite: 'strict',
        path: '/',
        expires: new Date(payloadAccess.exp * 1000),
      })
    );

    setCookieHeaders.push(
      serialize('refresh_token', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        expires: new Date(payloadRefresh.exp * 1000),
      })
    );

    return { success: true, access_token };
  };

  // Первый запрос
  let response = await sendLeadRequest(access_token!);

  // Если access_token истёк — обновим токены и попробуем снова
  if (response.status === 401) {
    const refreshed = await refreshTokensOnServer();

    if (!refreshed.success || !refreshed.access_token) {
      return new Response(JSON.stringify({ message: 'Token refresh failed' }), { status: 401 });
    }

    access_token = refreshed.access_token;
    response = await sendLeadRequest(access_token);
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
