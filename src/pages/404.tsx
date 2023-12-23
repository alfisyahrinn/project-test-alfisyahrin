import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function Custom404() {
  const route = useRouter();
  console.log(route);

  return (
    <div className="d-flex justify-center items-center h-[100vh]">
      
      <div className="text-center">
        <Image className='text-center' src="404.svg" alt='404' width={300} height={300}/>
        <h1 className=" text-center text-2xl font-bold ">
          Halaman ini tidak ada, kembali ke{' '}
          <Link href="/" className="text-blue-500 underline-offset-2">
            home
          </Link>
        </h1>
      </div>
    </div>
  );
}
