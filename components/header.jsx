import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

 const Header = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 bordeer-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* logo */}
          <Link href={"/"} className="flex items-center">
            <Image
              src="/spott.png"
              alt="Spott Logo"
              width={500}
              height={500}
              className="w-full h-11"
              priority
            />

            {/* Pro badge */}
          </Link>
          {/* Serach & Location - Desktop Only */}

          {/* Right Side Actions */}
        </div>

        {/* mobile Search & Location - Below Header */}
      </nav>

      {/* Modals */}
    </>
  );
} 

export default Header
