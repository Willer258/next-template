"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Folder, Search, Users, Calendar as CalendarIcon, ArrowLeft, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface Project {
  id: number
  name: string
  description: string
  progress: number
  team: number
  deadline: string
  priority: 'low' | 'medium' | 'high'
  category: string
}

export default function ActiveProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const activeProjects: Project[] = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design',
      progress: 65,
      team: 6,
      deadline: '2025-03-15',
      priority: 'high',
      category: 'Design'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Native iOS and Android application',
      progress: 40,
      team: 8,
      deadline: '2025-06-30',
      priority: 'high',
      category: 'Development'
    },
    {
      id: 3,
      name: 'Marketing Campaign Q1',
      description: 'Digital marketing strategy for Q1 2025',
      progress: 85,
      team: 4,
      deadline: '2025-02-28',
      priority: 'medium',
      category: 'Marketing'
    },
    {
      id: 5,
      name: 'E-commerce Platform',
      description: 'Build new online store with payment integration',
      progress: 55,
      team: 10,
      deadline: '2025-05-15',
      priority: 'high',
      category: 'Development'
    },
  ]

  const getPriorityColor = (priority: Project['priority']) => {
    const colors = {
      low: 'text-blue-500',
      medium: 'text-yellow-500',
      high: 'text-red-500'
    }
    return colors[priority]
  }

  const filteredProjects = activeProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const avgProgress = Math.round(
    activeProjects.reduce((sum, p) => sum + p.progress, 0) / activeProjects.length
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Active Projects
          </h1>
          <p className="text-muted-foreground mt-1">
            Projects currently in progress
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Badge className="bg-green-500">{activeProjects.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeProjects.reduce((sum, p) => sum + p.team, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total assigned
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProgress}%</div>
            <Progress value={avgProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search active projects..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/projects">All</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/dashboard/projects/active">Active</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/projects/archived">Archived</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow border-green-500/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-600">
                      <Folder className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-3 line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{project.team} members</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date(project.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge className="bg-green-500">Active</Badge>
                  <span className={`text-xs font-semibold uppercase ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
