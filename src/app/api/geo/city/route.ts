export async function POST(req: Request) {
  const { input } = await req.json();

  const url = process.env.DADATA_URL as string;
  const token = process.env.DADATA_API_KEY as string;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ query: input, count: 5 }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ message: 'Ошибка при получении адресов' }), {
      status: response.status,
    });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data));
}
