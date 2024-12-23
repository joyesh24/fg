"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Upload } from 'lucide-react'
import Image from "next/image"

export default function CreatePost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-orbitron text-white mb-8">Create New Post</h1>
        
        <Card className="bg-black/40 backdrop-blur-xl border-cyan-500/30">
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-cyan-300">Title</Label>
              <Input 
                id="title" 
                placeholder="Enter post title" 
                className="bg-white/5 border-cyan-500/30 text-white placeholder:text-cyan-300/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content" className="text-cyan-300">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                className="min-h-[200px] bg-white/5 border-cyan-500/30 text-white placeholder:text-cyan-300/50"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-cyan-300">Post Visibility</Label>
              <RadioGroup defaultValue="normal" className="space-y-3">
                <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-lg border border-cyan-500/30 cursor-pointer hover:bg-cyan-500/10 transition-colors">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="text-white font-medium cursor-pointer">Post for Normal Users</Label>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-lg border border-purple-500/30 cursor-pointer hover:bg-purple-500/10 transition-colors">
                  <RadioGroupItem value="vip" id="vip" />
                  <Label htmlFor="vip" className="text-white font-medium cursor-pointer">Post for VIP Users</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-cyan-300">Media Upload</Label>
              <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-cyan-500/50" />
                <p className="mt-2 text-sm text-cyan-300/60">
                  Drag and drop your files here, or click to select files
                </p>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-orbitron tracking-wide py-6 text-lg">
              Create Post
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

