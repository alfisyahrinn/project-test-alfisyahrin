import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Home() {
  const { toast } = useToast();
  const [text, setText] = useState('alfi');
  const keren = () => {
    toast({
      description: 'asdjkasjdkasd',
    });
    setText('bambang');
  };
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
