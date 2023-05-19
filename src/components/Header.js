'use client'
import { Navbar, Button } from "flowbite-react";
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const goHome = () => router.push('/')

  return (
    <header>
      <Navbar
        fluid={false}
        rounded={false}
        className="!bg-gray-800 !color-white"
      >
        <Navbar.Brand>
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9 cursor-pointer"
            alt="Flowbite Logo"
            width={100}
            height={100}
            onClick={goHome}
          />
          <span
            className="self-center whitespace-nowrap text-xl font-semibold text-white cursor-pointer"
            onClick={goHome}
          >
            Task App
          </span>

        </Navbar.Brand>
        <div className="flex md:order-2">
          {
            pathname === '/' &&
            <Button onClick={() => router.push('/task/new')}>
              Add Task
            </Button>
          }
          {
            pathname === '/task/new' &&
            <Button onClick={goHome}>
              List Task
            </Button>
          }
          <Navbar.Toggle />
        </div>
      </Navbar>
    </header>
  )
}