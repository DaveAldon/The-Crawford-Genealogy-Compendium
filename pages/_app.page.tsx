import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);

  return <Component {...pageProps} />;
};

export default App;
