import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="flex flex-col gap-4 h-[80vh] justify-center items-center text-center">
        <h1 className="text-lg font-bold">Service</h1>
        <p className="">Silakan ke halaman ideas</p>
        <Link href={'/ideas'}>
          <Button variant="secondary">Lets' Go</Button>
        </Link>
      </div>
    </div>
  );
}
