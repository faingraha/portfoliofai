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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="text-2xl md:text-4xl font-mono mb-8">
          <div className="font-code w-full">
            {mounted && (
              <TypeAnimation
                sequence={[
                  "Hello there.",
                  1200,
                  () => setShowButton(true),
                ]}
                wrapper="span"
                cursor={true}
                repeat={0}
                style={{ display: 'inline-block', textAlign: 'left', whiteSpace: 'pre-line' }}
              />
            )}
          </div>
        </div>
        <div className={`mt-8 flex justify-center transition-opacity duration-500 ${showButton ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            variant="outline" 
            size="lg"
            asChild
            className="rounded hover:bg-[#4ade80] hover:text-black transition-colors duration-300"
          >
            <Link href="/portfolio">Go to Portfolio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
