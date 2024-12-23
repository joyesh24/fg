"use client"

import { useState, useEffect } from 'react'
import { CreatePostForm } from '@/components/create-post-form'
import { PostCard } from '@/components/post-card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Post {
  id: number
  title: string
  content: string
  author: string
  timestamp: string
  isVIP: boolean
  likes: number
  comments: string[]
  attachments: string[]
}

const initialPosts: Post[] = [
  {
    id: 1,
    title: "Welcome to CyberConnect",
    content: "Dive into the neon-lit world of our cyberpunk social platform. Share your augmented reality experiences and connect with fellow netrunners.",
    author: "CyberMod",
    timestamp: "2023-06-10 10:00",
    isVIP: false,
    likes: 42,
    comments: ["Awesome platform!", "Can't wait to explore more!"],
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
    comments: ["Mind-blowing tech!", "When can we pre-order?"],
    attachments: ["/images/cyber-implants.jpg"]
  },
]

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const router = useRouter()

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    if (userType !== "admin") {
      router.push('/login')
    }
  }, [router])

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'likes' | 'comments'>) => {
    const post: Post = {
      ...newPost,
      id: posts.length + 1,
      likes: 0,
      comments: []
    }
    setPosts([post, ...posts])
  }

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const handleComment = (postId: number, comment: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
    ))
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/cyberpunk-admin-dashboard.jpg"
          alt="Cyberpunk Admin Dashboard"
          fill
          className="object-cover opacity-20"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      <header className="relative bg-gray-800/80 backdrop-blur-md py-6 px-6 flex justify-between items-center border-b border-purple-500/30">
        <h1 className="text-3xl font-orbitron text-purple-400">Admin Dashboard</h1>
        <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-lg font-orbitron tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50">
          Logout
        </Button>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CreatePostForm onCreatePost={handleCreatePost} />
        </motion.div>

        <div className="space-y-6 mt-8">
          {posts.map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PostCard 
                {...post} 
                userType="admin"
                onLike={() => handleLike(post.id)}
                onComment={(comment) => handleComment(post.id, comment)}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

