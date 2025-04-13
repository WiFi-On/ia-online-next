export async function POST(req: Request) {
  const { email } = await req.json();

  const api_address = process.env.LOCAL_API_URL;

  // Функция отправки запроса на смену пароля
  const sendEmailRequest = async () => {
    return await fetch(`${api_address}/auth/recover`, {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  // Первый запрос
  const response = await sendEmailRequest();

  const responseData = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ message: responseData.message || 'Unknown error' }), {
      status: response.status,
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
