import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const darkModeScript = `
    (function() {
      let theme = localStorage.getItem('theme');
      
      if (!theme) {
        theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? 'dark' 
          : 'light';
      }
      
      document.documentElement.classList.add(theme === 'dark' ? 'dark-mode' : 'light-mode');
    })();
  `;

  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}