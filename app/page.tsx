'use client'

import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function LandingPage() {
  const [showButton, setShowButton] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="relative text-2xl md:text-4xl font-mono mb-8 h-72 w-full max-w-3xl mx-auto px-4">
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div className="font-code w-full md:w-[600px]">
            <TypeAnimation
              sequence={[
                "Hi, I'm Ron Gissin.",
                1000,
                "\n",
                1000,
                "A software engineer looking to build interesting things.",
                () => setShowButton(true),
              ]}
              wrapper="span"
              cursor={true}
              repeat={0}
              style={{ display: 'inline-block', textAlign: 'left' }}
            />
          </div>
        </div>
        {showButton && (
          <div className="absolute top-30 md:top-40 left-0 right-0 flex justify-center">
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="animate-fade-in rounded hover:bg-[#4ade80] hover:text-black transition-colors duration-300"
            >
              <Link href="/portfolio">Go to Portfolio</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}