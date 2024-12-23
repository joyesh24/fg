import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Paperclip, X } from 'lucide-react'

interface CreatePostFormProps {
  onCreatePost: (post: {
    title: string
    content: string
    author: string
    timestamp: string
    isVIP: boolean
    attachments: string[]
  }) => void
}

export function CreatePostForm({ onCreatePost }: CreatePostFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [postType, setPostType] = useState<'normal' | 'vip'>('normal')
  const [attachments, setAttachments] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreatePost({
      title,
      content,
      author: 'Admin',
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
      isVIP: postType === 'vip',
      attachments: attachments.map(file => URL.createObjectURL(file))
    })
    setTitle('')
    setContent('')
    setPostType('normal')
    setAttachments([])
  }

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prevAttachments => [...prevAttachments, ...Array.from(e.target.files || [])])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(prevAttachments => prevAttachments.filter((_, i) => i !== index))
  }

  return (
    <Card className="bg-gray-800/80 backdrop-blur-md border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-cyan-400">Create New Post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-200">Title</Label>
            <Input 
              id="title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title" 
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="content" className="text-gray-200">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              className="min-h-[100px] bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div className="space-y-2 mt-4">
            <Label className="text-gray-200">Post Type</Label>
            <RadioGroup 
              value={postType}
              onValueChange={(value) => setPostType(value as 'normal' | 'vip')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="normal" />
                <Label htmlFor="normal" className="text-gray-200">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vip" id="vip" />
                <Label htmlFor="vip" className="text-gray-200">VIP</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mt-4">
            <Label htmlFor="attachment" className="text-gray-200 flex items-center space-x-2 cursor-pointer">
              <Paperclip className="h-5 w-5" />
              <span>Add Attachment</span>
            </Label>
            <Input 
              id="attachment" 
              type="file" 
              className="hidden" 
              onChange={handleAttachment}
              multiple
            />
          </div>

          {attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-gray-200">Attachments:</p>
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-2">
                  <p className="text-sm text-cyan-400">{file.name}</p>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeAttachment(index)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-950"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button type="submit" className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xl font-orbitron py-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
            Create Post
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

