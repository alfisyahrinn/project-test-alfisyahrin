import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
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
      <p>{text}</p>
      <Button variant="secondary" onClick={keren}>
        Click Me!
      </Button>
    </div>
  );
}
