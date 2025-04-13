import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { PayloadAccessI, PayloadRefreshI } from '../payloads.interface';

export async function POST(req: Request) {
  const { name, email, phone, tg, city, newPassword, confirmPassword } = await req.json();

  const new_phone = phone.replace(/[^\d+]/g, '');

  const api_address = process.env.LOCAL_API_URL;

  const response = await fetch(`${api_address}/auth/registration`, {
    method: 'POST',
    body: JSON.stringify({ name: name, email: email, phone_number: new_phone, telegram: tg, city: city, password: newPassword, repeat_password: confirmPassword }),
    headers: { 'Content-Type': 'application/json' },
  });

  const responseData = await response.json();

  if (!response.ok && responseData.message.includes('user already exists')) {
    return new Response(JSON.stringify({ message: 'Такой пользователь уже существует' }), {
      status: response.status,
    });
  } else if (!response.ok) {
    return new Response(JSON.stringify({ message: 'Ошибка при регистрации' }), {
      status: response.status,
    });
  }

  const { access_token, refresh_token } = responseData;
  const payloadAccess: PayloadAccessI = jwtDecode(access_token);
  const payloadRefresh: PayloadRefreshI = jwtDecode(refresh_token);

  const cookieStore = await cookies();

  cookieStore.set('access_token', access_token, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    expires: payloadAccess.exp,
  });
  cookieStore.set('refresh_token', refresh_token, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    expires: payloadRefresh.exp,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
