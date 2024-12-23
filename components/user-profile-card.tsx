import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { User, Star, Zap, Award } from 'lucide-react'

interface UserProfileCardProps {
  userType: 'normal' | 'vip' | 'admin'
}

export function UserProfileCard({ userType }: UserProfileCardProps) {
  const stats = [
    { label: 'Posts', value: 42, icon: <User className="h-4 w-4 text-cyan-400" /> },
    { label: 'Followers', value: 1337, icon: <Star className="h-4 w-4 text-yellow-400" /> },
    { label: 'Following', value: 420, icon: <Zap className="h-4 w-4 text-purple-400" /> },
  ]

  return (
    <Card className="bg-gray-800/80 backdrop-blur-md border-cyan-500/30 overflow-hidden">
      <CardHeader className="relative">
        <div className="absolute top-4 right-4">
          {userType === 'vip' && <Star className="text-yellow-400 h-6 w-6" />}
          {userType === 'admin' && <Zap className="text-purple-400 h-6 w-6" />}
        </div>
        <CardTitle className="text-2xl font-orbitron text-cyan-400 flex items-center gap-2">
          <User className="h-8 w-8" />
          {userType === 'vip' ? 'VIP User' : userType === 'admin' ? 'Admin' : 'User'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <motion.div 
                className="text-2xl font-bold text-cyan-400 flex items-center justify-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 + 0.1 * index }}
              >
                {stat.icon}
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 text-yellow-400">
            <Award className="h-5 w-5" />
            <span className="font-orbitron">Level 5 Netrunner</span>
          </div>
          <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </div>
          <div className="mt-1 text-xs text-gray-400 text-right">3000 / 5000 XP</div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

