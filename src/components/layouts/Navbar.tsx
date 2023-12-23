import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu } from 'lucide-react';
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('scrolling up');
  const [prevOffset, setPrevOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      if (currentOffset > prevOffset) {
        setScrollDirection('scrolling down');
      } else if (currentOffset < prevOffset) {
        setScrollDirection('scrolling up');
      }
      setPrevOffset(currentOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevOffset]);

  return scrollDirection;
};
export default function Navbar() {
  const router = useRouter();
  const scrollDirection = useScrollDirection();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const headerClassName = scrollDirection === 'scrolling down' ? 'fixed-header hidden transition-transform duration-300 ease-in-out' : 'fixed-header';
  const backColor = scrollDirection === 'scrolling up' ? 'flex justify-between items-center h-16 px-8  lg:px-16 bg-primary bg-opacity-80' : 'flex justify-between items-center h-16  px-8 lg:px-16 bg-primary';
  return (
    <div className={`${headerClassName} transition-all duration-1000 ease-in-out`}>
      <div className={backColor}>
        <Image src="/logo.png" alt="Logo" width={100} height={40} />
        <div className={`block lg:hidden ${showMenu ? 'absolute top-4 right-8' : ''}`}>
          <button onClick={toggleMenu}>
            <Menu className="w-7 h-7 text-white" />
          </button>
        </div>

        <ul className={`lg:flex gap-4  ${showMenu ? 'absolute top-16 right-0 text-right py-6 rounded-bl space-y-3 px-16 bg-primary' : 'hidden'}`}>
          <li className={`text-white ${router.pathname == '/' ? 'border-b-2 font-semibold' : ''}`}>
            <Link href={'/'}>Work</Link>
          </li>
          <li className={`text-white ${router.pathname == '/about' ? 'border-b-2 font-semibold' : ''}`}>
            <Link href={'/about'}>About</Link>
          </li>
          <li className={`text-white ${router.pathname == '/service' ? 'border-b-2 font-semibold' : ''}`}>
            <Link href={'/service'}>Service</Link>
          </li>
          <li className={`text-white ${router.pathname == '/ideas' ? 'border-b-2 font-semibold' : ''}`}>
            <Link href={'/ideas'}>Ideas</Link>
          </li>
          <li className={`text-white ${router.pathname == '/careers' ? 'border-b-2 font-semibold' : ''}`}>
            <Link href={'/careers'}>Careers</Link>
          </li>
          <li className={`text-white ${router.pathname == '/contact' ? 'border-b-2 font-semibold' : ''}`}>
            <Link href={'/contact'}>Contanct</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
