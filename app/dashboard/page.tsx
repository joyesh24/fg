"use client"

import { useState, useEffect } from 'react'
import { PostCard } from '@/components/post-card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { User, Bell, Settings, LogOut, Plus, Search } from 'lucide-react'
import { CreatePostForm } from '@/components/create-post-form'
import { UserProfileCard } from '@/components/user-profile-card'
import { TrendingSidebar } from '@/components/trending-sidebar'
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"

interface Post {
  id: number
  title: string
  content: string
  author: string
  timestamp: string
  isVIP: boolean
  likes: number
  comments: Array<{ text: string, attachment?: string }>
  attachments: string[]
}

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Welcome to CyberConnect",
    content: "Dive into the neon-lit world of our cyberpunk social platform. Share your augmented reality experiences and connect with fellow netrunners.",
    author: "CyberMod",
    timestamp: "2023-06-10 10:00",
    isVIP: false,
    likes: 42,
    comments: [
      { text: "Awesome platform!" },
      { text: "Can't wait to explore more!", attachment: "/images/comment-attachment-1.jpg" }
    ],
    attachments: ["/images/cyber-world.jpg"]
  },
  {
    id: 2,
    title: "VIP Exclusive: Upcoming Cyber Enhancements",
    content: "Get a sneak peek at the latest neural implants and cybernetic upgrades. Only for our VIP members.",
    author: "TechGuru",
    timestamp: "2023-06-11 14:30",
    isVIP: true,
    likes: 78,
    comments: [
      { text: "Mind-blowing tech!" },
      { text: "When can we pre-order?", attachment: "/images/comment-attachment-2.jpg" }
    ],
    attachments: ["/images/cyber-implants.jpg", "/images/cyber-implants-2.jpg"]
  },
  {
    id: 3,
    title: "Night City Meetup",
    content: "Join us for a real-world gathering in the heart of Night City. Food, drinks, and holograms on us!",
    author: "EventOrganizer",
    timestamp: "2023-06-12 18:45",
    isVIP: false,
    likes: 56,
    comments: [
      { text: "Count me in!" },
      { text: "What's the dress code?", attachment: "/images/comment-attachment-3.jpg" }
    ],
    attachments: ["/images/night-city.jpg"]
  },
]

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [userType, setUserType] = useState<'normal' | 'vip' | 'admin'>('normal')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType") as 'normal' | 'vip' | 'admin' | null
    if (storedUserType === 'normal' || storedUserType === 'vip' || storedUserType === 'admin') {
      setUserType(storedUserType)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const handleComment = (postId: number, comment: string, attachment?: File) => {
    setPosts(posts.map(post => 
      post.id === postId ? { 
        ...post, 
        comments: [...post.comments, { 
          text: comment, 
          attachment: attachment ? URL.createObjectURL(attachment) : undefined 
        }] 
      } : post
    ))
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    router.push('/')
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="absolute inset-0">
        <Image
          src="/images/cyberpunk-city-2.jpg"
          alt="Cyberpunk City"
          fill
          className="object-cover opacity-20"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      <header className="relative bg-gray-800/80 backdrop-blur-md py-4 px-6 flex justify-between items-center border-b border-cyan-500/30">
        <motion.h1 
          className="text-4xl font-orbitron text-cyan-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {userType === 'vip' ? 'VIP Dashboard' : userType === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
        </motion.h1>
        <div className="flex items-center space-x-4">
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950">
            <Settings className="h-5 w-5" />
          </Button>
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-orbitron tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50">
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 backdrop-blur-md rounded-lg p-1 mb-8">
                <TabsTrigger value="feed" className="font-orbitron text-cyan-400">Feed</TabsTrigger>
                <TabsTrigger value="explore" className="font-orbitron text-cyan-400">Explore</TabsTrigger>
                <TabsTrigger value="messages" className="font-orbitron text-cyan-400">Messages</TabsTrigger>
              </TabsList>
              <TabsContent value="feed">
                <div className="mb-6">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search posts..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-800/50 backdrop-blur-md border-cyan-500/30 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <motion.div 
                  className="space-y-6 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {posts.filter(post => !post.isVIP || userType === 'vip' || userType === 'admin').map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <PostCard 
                        {...post} 
                        userType={userType}
                        onLike={() => handleLike(post.id)}
                        onComment={(comment, attachment) => handleComment(post.id, comment, attachment)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="explore">
                <Card className="bg-gray-800/50 backdrop-blur-md border-cyan-500/30">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-orbitron text-cyan-400 mb-4">Explore CyberConnect</h2>
                    <p className="text-gray-300">Discover new connections and trending topics in the cyberpunk world.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="messages">
                <Card className="bg-gray-800/50 backdrop-blur-md border-cyan-500/30">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-orbitron text-cyan-400 mb-4">Your Messages</h2>
                    <p className="text-gray-300">Stay connected with your fellow netrunners.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-8">
            <UserProfileCard userType={userType} />
            <TrendingSidebar />
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <CreatePostForm onCreatePost={(newPost) => {
                setPosts([{ id: posts.length + 1, likes: 0, comments: [], ...newPost }, ...posts])
                setShowCreatePost(false)
              }} />
              <Button onClick={() => setShowCreatePost(false)} className="mt-4 w-full">Cancel</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="fixed bottom-8 right-8 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => setShowCreatePost(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Plus className="h-6 w-6" />
      </motion.button>
    </div>
  )
}

