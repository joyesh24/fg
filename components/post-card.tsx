import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, ThumbsUp, Paperclip, X } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface PostCardProps {
  id: number
  title: string
  content: string
  author: string
  timestamp: string
  isVIP: boolean
  likes: number
  comments: Array<{ text: string, attachment?: string }>
  attachments: string[]
  userType: 'normal' | 'vip' | 'admin'
  onLike: () => void
  onComment: (comment: string, attachment?: File) => void
}

export function PostCard({
  id,
  title,
  content,
  author,
  timestamp,
  isVIP,
  likes,
  comments,
  attachments,
  userType,
  onLike,
  onComment
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [commentAttachment, setCommentAttachment] = useState<File | null>(null)

  const handleSubmitComment = () => {
    if (newComment.trim() || commentAttachment) {
      onComment(newComment.trim(), commentAttachment || undefined)
      setNewComment('')
      setCommentAttachment(null)
    }
  }

  const handleCommentAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCommentAttachment(e.target.files[0])
    }
  }

  return (
    <Card className={`overflow-hidden border-0 ${isVIP ? 'bg-purple-900/80' : 'bg-gray-800/80'} backdrop-blur-md`}>
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700 pb-4">
        <div>
          <h3 className="text-xl font-bold text-cyan-400 font-orbitron">{title}</h3>
          <p className="text-sm text-gray-400">{author} • {timestamp}</p>
        </div>
        {isVIP && (
          <Badge className="bg-purple-600 text-white px-2 py-1 text-xs font-orbitron">
            VIP
          </Badge>
        )}
      </CardHeader>
      <CardContent className="py-4">
        <p className="text-gray-200">{content}</p>
        {attachments.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {attachments.map((attachment, index) => (
              <div key={index} className="relative h-40 w-full">
                <Image src={attachment} alt={`Attachment ${index + 1}`} layout="fill" objectFit="cover" className="rounded-md" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
        <Button variant="ghost" className="flex gap-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950" onClick={onLike}>
          <ThumbsUp className="h-5 w-5" />
          <span>{likes}</span>
        </Button>
        <Button 
          variant="ghost" 
          className="flex gap-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare className="h-5 w-5" />
          <span>{comments.length}</span>
        </Button>
      </CardFooter>
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4 space-y-4"
          >
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                  <p className="text-sm text-gray-300">{comment.text}</p>
                  {comment.attachment && (
                    <div className="mt-2 relative h-20 w-full">
                      <Image src={comment.attachment} alt="Comment Attachment" layout="fill" objectFit="cover" className="rounded-md" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Add your comment..." 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <label htmlFor={`comment-attachment-${id}`} className="cursor-pointer">
                <Paperclip className="h-5 w-5 text-cyan-400" />
              </label>
              <input
                id={`comment-attachment-${id}`}
                type="file"
                className="hidden"
                onChange={handleCommentAttachment}
              />
              <Button variant="outline" className="font-orbitron" onClick={handleSubmitComment}>
                Send
              </Button>
            </div>
            {commentAttachment && (
              <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-2">
                <p className="text-sm text-cyan-400">{commentAttachment.name}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCommentAttachment(null)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-950"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

