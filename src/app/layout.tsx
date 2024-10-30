import Link from 'next/link'
import { useState, useEffect } from 'react'

import './globals.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body>
        {/* <nav className="p-6 border-b border-gray-300">
          <Link href={'/'}>
            <span className="mr-6 cursor-pointer">Home</span>
          </Link>
          <Link href={'/private'}>
            <span className="mr-6 cursor-pointer">Private</span>
          </Link>
        </nav> */}
        <div className="py-8 px-16">
          {children}
        </div>
      </body>
    </html>
  )
}