import Navbar from '@/components/layouts/Navbar';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const disableNavbar = ['/404'];
  const { pathname } = useRouter();
  return (
    <div>
      {!disableNavbar.includes(pathname) && <Navbar />}
      <div className=" bg-primary h-[64px]"></div>
      <div>
        <Toaster />
        <Component {...pageProps} />
      </div>
    </div>
  );
}
