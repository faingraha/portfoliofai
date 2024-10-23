'use client'

import Link from 'next/link'
import { Github, Instagram, Linkedin } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/portfolio', label: 'About me' },
    { href: '/portfolio/cv', label: 'Get my CV' },
    { href: '/portfolio/repos', label: 'Repos' },
    { href: '/portfolio/contact', label: 'Contact me' },
  ]

  return (
    <div className="bg-black text-gray-300 min-h-screen font-mono">
      <nav className=
        {`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-black/40 backdrop-blur-md' : 'bg-black'
        } p-4 animate-fade-in`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Side - Title */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl relative -top-0.5 text-white">Ron Gissin</h1>
            <div className="space-x-8">
              {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-gray-300 ${
                  pathname === item.href ? 'text-gray-100' : 'text-gray-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            </div>
          </div>
          <div className="space-x-4">
            <a href="https://www.instagram.com/ron_gissin"
               target="_blank" 
               rel="noopener noreferrer" 
               className="inline-block bg-instagram-gradient text-white rounded p-2">
              <Instagram size={24} />
            </a>
            <a href="https://github.com/RonGissin"
               target="_blank" 
               rel="noopener noreferrer" 
               className="inline-block bg-purple-600 hover:bg-purple-800 text-white rounded p-2">
              <Github size={24} />
            </a>
            <a
                href="https://www.linkedin.com/in/ron-gissin-984176157/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#0077B5] hover:bg-[#005582] text-white rounded p-2">
                <Linkedin size={24} />
            </a>
          </div>
        </div>
      </nav>
      <main className="container mx-auto mt-24 px-4">
          {children}
      </main>
    </div>
  )
}