import '@/styles/global.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <title>Яонлайн - партнёрский сервис</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://ia-on.ru" />

        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/docs/site.webmanifest" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />

        <meta name="description" content="Подключай интернет, клининг и переезды — зарабатывай с Яонлайн. Партнёрская программа для риелторов и агентов №1." />

        <meta property="og:title" content="Мы – сервис для риелторов, который превращает клиентов в дополнительный доход." />
        <meta property="og:description" content="Подключайте интернет, клининг и переезды через нашу уникальную платформу и получайте быстрое вознаграждение." />
        <meta property="og:image" content="https://ia-on.ru/icons/android-chrome-512x512logotext.png" />
        <meta property="og:url" content="https://ia-on.ru" />
        <meta property="og:type" content="website" />
      </head>
      <body>{children}</body>
    </html>
  );
}
