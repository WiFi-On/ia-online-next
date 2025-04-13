import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { serialize } from 'cookie';
import { PayloadAccessI, PayloadRefreshI } from '../auth/payloads.interface';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cookieStore = await cookies();

  let access_token = cookieStore.get('access_token')?.value;

  const api_address = process.env.LOCAL_API_URL;

  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');
  const services = searchParams.get('services')?.split(',').map(Number) || [];
  const status_id = searchParams.get('status_id');
  const search = searchParams.get('search');
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  const getLeadsRequest = async (token: string) => {
    const queryParams: Record<string, string> = {};

    if (limit) queryParams.limit = limit;
    if (offset) queryParams.offset = offset;
    if (start_date) queryParams.start_date = start_date;
    if (end_date) queryParams.end_date = end_date;
    if (status_id) queryParams.status_id = status_id;
    if (search) queryParams.search = search;
    if (services.includes(1)) queryParams.is_internet = 'true';
    if (services.includes(2)) queryParams.is_cleaning = 'true';
    if (services.includes(3)) queryParams.is_shipping = 'true';

    const query = new URLSearchParams(queryParams).toString();

    return await fetch(`${api_address}/leads?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const setCookieHeaders: string[] = [];

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

  let response = await getLeadsRequest(access_token!);

  if (response.status === 401) {
    console.log('Токена нет');
    const refreshed = await refreshTokensOnServer(); // ждем завершения получения нового токена
    console.log('Отправили повторно');
    if (!refreshed.success || !refreshed.access_token) {
      console.log('Токен не вернули');
      return new Response(JSON.stringify({ message: 'Token refresh failed' }), { status: 401 });
    }
    console.log('Токен вернули');
    access_token = refreshed.access_token; // обновляем токен
    response = await getLeadsRequest(access_token); // повторно отправляем запрос с новым токеном
  }

  const responseData = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ message: responseData.message || 'Unknown error' }), {
      status: response.status,
    });
  }

  const headers = new Headers();
  setCookieHeaders.forEach((cookie) => headers.append('Set-Cookie', cookie));

  return new Response(JSON.stringify({ leads: responseData }), {
    status: 200,
    headers,
  });
}
