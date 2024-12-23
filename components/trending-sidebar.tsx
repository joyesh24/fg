import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { HashIcon as Hashtag, TrendingUp, Users, Zap } from 'lucide-react'

const trendingTopics = [
  { topic: 'CyberImplants', count: 1420, icon: <Zap className="text-yellow-400 h-4 w-4" /> },
  { topic: 'NeonNights', count: 980, icon: <TrendingUp className="text-green-400 h-4 w-4" /> },
  { topic: 'VirtualReality', count: 754, icon: <Users className="text-blue-400 h-4 w-4" /> },
  { topic: 'AICon2077', count: 621, icon: <Zap className="text-purple-400 h-4 w-4" /> },
  { topic: 'QuantumHacking', count: 543, icon: <TrendingUp className="text-red-400 h-4 w-4" /> },
]

export function TrendingSidebar() {
  return (
    <Card className="bg-gray-800/80 backdrop-blur-md border-cyan-500/30 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
        <CardTitle className="text-2xl font-orbitron text-cyan-400 flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-4">
          {trendingTopics.map((topic, index) => (
            <motion.li
              key={topic.topic}
              className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="flex items-center gap-2">
                {topic.icon}
                <Hashtag className="text-cyan-400 h-4 w-4" />
                <span className="text-gray-200 font-medium">{topic.topic}</span>
              </div>
              <span className="text-sm text-cyan-400 font-bold">{topic.count}</span>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

