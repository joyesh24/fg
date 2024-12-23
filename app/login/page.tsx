"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

export default function LoginPage() {
  const [userType, setUserType] = useState<"normal" | "vip" | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "1" && password === "1") {
      localStorage.setItem("userType", userType || "normal")
      router.push("/dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cyberpunk-city.jpg"
            alt="Cyberpunk City"
            fill
            className="object-cover opacity-50"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-[400px] bg-gray-800/80 border-cyan-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-3xl text-center text-cyan-400 font-orbitron">Choose User Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                variant="default"
                className="w-full h-16 text-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-orbitron transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                onClick={() => setUserType("normal")}
              >
                Login as Normal User
              </Button>
              <Button
                variant="outline"
                className="w-full h-16 text-xl border-2 border-purple-500 text-purple-400 hover:bg-purple-500/20 font-orbitron transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                onClick={() => setUserType("vip")}
              >
                Login as VIP User
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/cyberpunk-city.jpg"
          alt="Cyberpunk City"
          fill
          className="object-cover opacity-50"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[400px] bg-gray-800/80 border-cyan-500/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-cyan-400 font-orbitron">
              {userType === "normal" ? "Normal User Login" : "VIP User Login"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-200 text-lg">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-gray-700/50 border-gray-600 text-white text-lg py-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200 text-lg">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-700/50 border-gray-600 text-white text-lg py-6"
                />
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xl font-orbitron py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

