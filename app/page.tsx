'use client'

import { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function LandingPage() {
  const [showButton, setShowButton] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Glowing orb effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        {/* Main content container */}
        <div className="relative bg-black/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 md:p-12">
          {/* Terminal-like header */}
          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-gray-500 text-sm ml-4 font-mono">~/portfolio</span>
          </div>

          {/* Typing animation */}
          <div className="text-3xl md:text-5xl lg:text-6xl font-mono mb-12">
            <div className="font-code w-full">
              {mounted && (
                <TypeAnimation
                  sequence={[
                    "Hello there.",
                    () => setShowButton(true),
                  ]}
                  speed={10}
                  wrapper="span"
                  cursor={true}
                  repeat={0}
                  style={{ 
                    display: 'inline-block', 
                    textAlign: 'left', 
                    whiteSpace: 'pre-line',
                    background: 'white',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                />
              )}
            </div>
          </div>

          {/* Button */}
          <div className={`flex justify-center transition-all duration-700 transform ${
            showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="group relative rounded-xl border-gray-700 bg-black/50 hover:bg-transparent hover:border-green-400/50 transition-all duration-300 px-8 py-4 text-lg font-mono overflow-hidden"
            >
              <Link href="/portfolio" className="relative z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-green-400/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative flex items-center gap-2 text-gray-300 group-hover:text-green-400 transition-colors duration-300">
                  <span>Go to Portfolio</span>
                  <span className="text-green-400 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </Link>
            </Button>
          </div>

          {/* Footer hint */}
          <div className={`mt-12 text-center transition-all duration-1000 delay-500 ${
            showButton ? 'opacity-60' : 'opacity-0'
          }`}>
            <p className="text-gray-500 text-sm font-mono">Press Enter to continue...</p>
          </div>
        </div>
      </div>

      {/* Enter key hint */}
      <div className="absolute bottom-4 right-4 text-gray-600 text-xs font-mono hidden md:block">
        <kbd className="px-2 py-1 bg-gray-800/50 border border-gray-700 rounded">Enter</kbd> to navigate
      </div>
    </div>
  )
}
