import '@/styles/global.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/docs/site.webmanifest" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />

        <meta property="og:title" content="Мы – сервис для риелторов, который превращает клиентов в дополнительный доход." />
        <meta property="og:description" content="Подключайте интернет, клининг и переезды через нашу уникальную платформу и получайте быстрое вознаграждение." />
        <meta property="og:image" content="https://ia-on.ru/icons/android-chrome-512x512.png" />
        <meta property="og:url" content="https://ia-on.ru" />
        <meta property="og:type" content="website" />
      </head>
      <body>{children}</body>
    </html>
  );
}
