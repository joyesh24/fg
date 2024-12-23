"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState } from "react"
import { Sparkles, ChevronRight } from 'lucide-react'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 700 }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      animate(cursorX, e.clientX, springConfig)
      animate(cursorY, e.clientY, springConfig)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const rotateX = useTransform(cursorY, [0, window.innerHeight], [5, -5])
  const rotateY = useTransform(cursorX, [0, window.innerWidth], [-5, 5])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-12-09_15-04-24.jpg-8mkklzW4BFAVbaFOCl1TzMqMwX6W1l.jpeg"
          alt="Cyberpunk Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
          style={{
            backgroundPosition: `${mousePosition.x / 50}px ${mousePosition.y / 50}px`
          }}
        />
      </div>
      
      <div className="absolute top-4 right-4 z-20 flex space-x-4">
        <Link href="/login">
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 text-lg font-orbitron tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50">
            Login
          </Button>
        </Link>
        <Link href="/admin-login">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 text-lg font-orbitron tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
            Admin
          </Button>
        </Link>
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center space-y-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ rotateX, rotateY, perspective: 1000 }}
      >
        <motion.h1
          className="text-6xl font-bold text-white text-center font-orbitron"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Welcome to CyberConnect
        </motion.h1>
        <motion.p
          className="text-xl text-cyan-300 text-center max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Dive into a world where technology and humanity intertwine. Connect, share, and explore the digital frontier.
        </motion.p>
        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="https://t.me/viper_xpro3" target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-6 text-2xl font-orbitron tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 group">
              Get Started
              <ChevronRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-cyan-500/20 to-transparent" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-purple-500/20 to-transparent" />

      <motion.div 
        className="absolute"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <div className="w-4 h-4 bg-cyan-500 rounded-full blur-sm" />
      </motion.div>

      <Sparkles className="absolute top-10 left-10 text-yellow-400 h-8 w-8 animate-pulse" />
      <Sparkles className="absolute bottom-10 right-10 text-purple-400 h-8 w-8 animate-pulse" />
    </div>
  )
}

