'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const targetText = 'Hello there.'

  useEffect(() => {
    if (index < targetText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + targetText[index])
        setIndex(index + 1)
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      const delay = setTimeout(() => {
        setShowButton(true)
      }, 300)
      return () => clearTimeout(delay)
    }
  }, [index])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 font-mono">
      {/* Teks animasi */}
      <h1 className="text-4xl md:text-6xl font-medium tracking-wide mb-10">
        <span className="whitespace-pre bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {text}
        </span>
        <span className="animate-blink">|</span>
      </h1>

      {/* Tombol Enter lebih besar */}
      <div
        className={`transition-all duration-700 ${
          showButton
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5 pointer-events-none'
        }`}
      >
        <Button
          variant="outline"
          size="lg"
          asChild
          className="text-xl px-14 py-6 font-mono text-white border-gray-700 bg-black hover:bg-white hover:text-black transition-all duration-300"
        >
          <Link href="/portfolio">Enter</Link>
        </Button>
      </div>
    </div>
  )
}
