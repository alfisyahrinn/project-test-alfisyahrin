import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Service() {
  // useEffect(() => {
  //   getBlogs();
  //   // const fetchData = async () => {
  //   //   setIsLoading(true);
  //   //   const dataProduct = await getData();
  //   //   setdata(dataProduct.data);
  //   //   setIsLoading(false);
  //   // };
  //   // fetchData();
  // }, []);
  const { toast } = useToast();
  useEffect(() => {
    axios
      .get('https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=10')
      .then((response) => {
        console.log('Data:', response.data); // Output hasil respons dari server
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: error.message,
          description: error.response ? error.response.data.message : 'Somothing Wrong',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  }, []);
  return <div>Ini adalah halaman Service</div>;
}
