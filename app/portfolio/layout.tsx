'use client'

import Link from 'next/link'
import { Github, Instagram, Linkedin, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster } from "@/components/ui/toaster"

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showFooter, setShowFooter] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 0)
      
      if (currentScrollY > lastScrollY) {
        setShowFooter(false)
      } else {
        setShowFooter(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Hanya menu About me dan Blog yang tersisa
  const navItems = [
  { href: '/portfolio', label: 'About me', newTab: false },
  { href: 'https://www.notion.so/Learning-Hub-1fa9f35cd4ea800c987ad3ca9f8b6e98', label: 'Learning Hub', newTab: true },
  { href: 'https://fainugraha.wordpress.com/', label: 'Blog', newTab: true }
]

  const socialLinks = [
    { href: "https://www.instagram.com/faingraha", icon: Instagram, bgClass: "bg-instagram-gradient" },
    { href: "https://github.com/faingraha", icon: Github, bgClass: "bg-purple-600 hover:bg-purple-800" },
    { href: "https://www.linkedin.com/in/fainugraha/", icon: Linkedin, bgClass: "bg-[#0077B5] hover:bg-[#005582]" },
  ]

  return (
    <div className="bg-black text-gray-300 min-h-screen font-mono">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/40 backdrop-blur-md' : 'bg-black'
      } p-4 animate-fade-in`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Side - Title and Nav Items */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl relative -top-0.5 text-white">Faingraha</h1>
            <div className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.newTab ? "_blank" : undefined}
                  className={`hover:text-gray-300 ${
                    pathname === item.href ? 'text-gray-100' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Social Links (Desktop) */}
          <div className="hidden lg:flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block text-white rounded p-2 ${link.bgClass}`}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.newTab ? "_blank" : undefined}
                className={`block hover:text-gray-300 ${
                  pathname === item.href ? 'text-gray-100' : 'text-gray-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block text-white rounded p-2 ${link.bgClass}`}
                >
                  <link.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
      <main className="container mx-auto mt-24 px-4 pb-16">
        {children}
      </main>
      <footer className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/40 backdrop-blur-md' : 'bg-black'
      } p-4 text-center ${showFooter ? 'translate-y-0' : 'translate-y-full'}`}>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Muhamad Fai Nugraha
        </p>
      </footer>
      <Toaster />
    </div>
  )
}
