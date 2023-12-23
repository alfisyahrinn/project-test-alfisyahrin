import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/id';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';

type blog = {
  content: String;
  create_at: String;
  published_at: number;
  slug: String;
  title: String;
  small_image: [url: any];
};
export default function Blog() {
  const API_URL = 'https://suitmedia-backend.suitdev.com/api/ideas';
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState('-published_at');
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(274);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const getBlogs = (selectedPageSize: any) => {
    axios
      .get(`${API_URL}?page[number]=${currentPage}&page[size]=${selectedPageSize}&sort=${sort}&append[]=small_image`)
      .then((response) => {
        if (response.status === 200) {
          setdata(response.data.data);
          setIsLoading(false);
          console.log('dare :', response.data.data);
          setLastPage(response.data.meta.last_page);
        }
      })
      .catch((error) => {
        console.error('Error', error);

        toast({
          variant: 'destructive',
          description: error.message,
          title: error.response ? error.response.data.message : 'Somothing Wrong',
          action: (
            <ToastAction altText="Try again" onClick={getBlogs}>
              Try again
            </ToastAction>
          ),
        });
      });
  };

  const handlePage = (e: any) => {
    const selectedPageSize = e.target.value;
    setPageSize(() => {
      getBlogs(selectedPageSize);
      return selectedPageSize;
    });
  };

  const handleSort = (e: any) => {
    setSort(e.target.value);
    setPageSize(10);
  };

  const totalPages = lastPage;
  const maxVisiblePages = 5;

  const targetRef = useRef<HTMLDivElement | null>(null);
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    if (targetRef.current !== null) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const renderPageNumbers = () => {
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisiblePages) {
      startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      endPage = startPage + maxVisiblePages - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxVisiblePages + 1;
      }
    }

    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handlePageChange(i)} className={` py-1 px-2 rounded-md ${i === currentPage ? 'font-bold bg-primary text-white' : ''}`}>
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(lastPage);
  };

  const showEnd = currentPage * pageSize;
  const showStart = showEnd - pageSize;

  // current page
  useEffect(() => {
    const currentPageLocal = window.localStorage.getItem('currentPage');
    if (currentPageLocal) {
      setCurrentPage(Number(currentPageLocal));
    } else {
      setCurrentPage(1);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('currentPage', JSON.stringify(currentPage));
  }, [currentPage]);

  // page page
  useEffect(() => {
    const pageSizeLocal = window.localStorage.getItem('pageSize');
    if (pageSizeLocal) {
      setPageSize(Number(pageSizeLocal));
    } else {
      setPageSize(10);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('pageSize', JSON.stringify(pageSize));
  }, [pageSize]);

  useEffect(() => {
    const sortLocal = window.localStorage.getItem('sort');
    if (sortLocal) {
      setSort(String(sortLocal));
    } else {
      // Jika currentPageLocal tidak ada di localStorage, maka gunakan nilai default 10
      setSort('-published_at');
    }
    console.log('di get : ', currentPage);
  }, []);

  // Setelah itu, gunakan useEffect untuk menyimpan currentPage ke localStorage saat currentPage berubah
  useEffect(() => {
    console.log('menjalankan set : ', sort);
    window.localStorage.setItem('sort', sort);
  }, [sort]);

  useEffect(() => {
    console.log('useEffect');
    console.log('di Use', currentPage);
    getBlogs(10);
  }, [pageSize, sort, currentPage]);
  const { toast } = useToast();
  return (
    <div>
      <div className=" h-[300px] relative overflow-hidden">
        {/* Gambar dengan posisi absolute, diatur di bawah teks */}
        <img src="/papan-tulis.jpg" alt="hero" className="w-[100vw] absolute z-0 right-11 bottom-[70px] -rotate-6 transform scale-x-125" />
        <div className="flex flex-col justify-center items-center text-center relative z-10 h-full">
          <h1 className="text-white text-5xl">Ideas</h1>
          <p className="text-white text-lg">Where all our great things begin</p>
        </div>
      </div>
      <div className="px-4 lg:px-16 mt-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <p className="mb-6 lg:mb-0">
            Showing {showStart + 1} - {showEnd} of {total}
          </p>
          <div className="flex flex-row gap-4">
            <div className="flex items-center mb-2 lg:mb-0">
              <label htmlFor="showPerPage" className="mr-2">
                Show per page:
              </label>
              <select id="showPerPage" value={pageSize} onChange={handlePage} className="py-2 px-7 border-gray-500 border-2 rounded-full">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="sortBy" className="mr-2">
                Sort by:
              </label>
              <select id="sortBy" value={sort} onChange={handleSort} className="py-2 px-7 border-gray-500 border-2 rounded-full">
                <option value="-published_at">Newest</option>
                <option value="published_at">Latest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center mt-36">
          <img src="/logo-range.png" alt="Logo" width={100} height={40} className="animate-bounce" />
        </div>
      ) : (
        <div className="px-4 lg:px-16 lg:mt-4 mt-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {data.map((items: blog, index) => {
              return (
                <div key={index} className="bg-white rounded-lg shadow-xl p-0 flex flex-col mb-4" ref={index === 0 ? targetRef : null}>
                  {items.small_image && items.small_image.length > 0 && items.small_image[0].url && <img src={items.small_image[0].url} alt="hero" className="w-full lg:h-48 h-60 object-cover mb-4 rounded-t-lg" loading="lazy" />}
                  <div className="flex flex-col flex-grow px-4">
                    <div className="flex-1">
                      <p className="text-gray-500 mb-2">{moment(items.published_at).format('Do MMM YYYY')}</p>
                      <h1 className="text-xl font-bold mb-4 line-clamp-3">{items.title}</h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="mt-14 mb-36">
        {isLoading ? (
          ''
        ) : (
          <div className="mt-5 mb-36 flex justify-center gap-4">
            <div className="flex">
              <button onClick={handleFirstPage}>
                {' '}
                <ChevronsLeftIcon className="h-7 w-7" />
              </button>
              <button>
                {' '}
                <ChevronLeft className="h-7 w-7" />
              </button>
            </div>
            {renderPageNumbers()}
            <div className="flex">
              <button>
                {' '}
                <ChevronRight className="h-7 w-7" />
              </button>
              <button onClick={handleLastPage}>
                {' '}
                <ChevronsRightIcon className="h-7 w-7" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
