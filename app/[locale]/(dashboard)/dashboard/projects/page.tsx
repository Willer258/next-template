"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Folder, Plus, Search, Users, Calendar as CalendarIcon, TrendingUp, Eye } from 'lucide-react'

interface Project {
  id: number
  name: string
  description: string
  status: 'active' | 'completed' | 'on-hold' | 'archived'
  progress: number
  team: number
  deadline: string
  budget: string
  priority: 'low' | 'medium' | 'high'
  category: string
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design',
      status: 'active',
      progress: 65,
      team: 6,
      deadline: '2025-03-15',
      budget: '€50,000',
      priority: 'high',
      category: 'Design'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Native iOS and Android application',
      status: 'active',
      progress: 40,
      team: 8,
      deadline: '2025-06-30',
      budget: '€120,000',
      priority: 'high',
      category: 'Development'
    },
    {
      id: 3,
      name: 'Marketing Campaign Q1',
      description: 'Digital marketing strategy for Q1 2025',
      status: 'active',
      progress: 85,
      team: 4,
      deadline: '2025-02-28',
      budget: '€30,000',
      priority: 'medium',
      category: 'Marketing'
    },
    {
      id: 4,
      name: 'CRM Integration',
      description: 'Integrate new CRM system with existing tools',
      status: 'on-hold',
      progress: 25,
      team: 5,
      deadline: '2025-04-20',
      budget: '€45,000',
      priority: 'medium',
      category: 'Integration'
    },
    {
      id: 5,
      name: 'E-commerce Platform',
      description: 'Build new online store with payment integration',
      status: 'active',
      progress: 55,
      team: 10,
      deadline: '2025-05-15',
      budget: '€85,000',
      priority: 'high',
      category: 'Development'
    },
    {
      id: 6,
      name: 'Brand Identity Update',
      description: 'Refresh company branding and visual identity',
      status: 'completed',
      progress: 100,
      team: 3,
      deadline: '2024-12-20',
      budget: '€25,000',
      priority: 'low',
      category: 'Design'
    },
  ])

  const getStatusBadge = (status: Project['status']) => {
    const variants = {
      active: { variant: 'default' as const, label: 'Active' },
      completed: { variant: 'secondary' as const, label: 'Completed' },
      'on-hold': { variant: 'outline' as const, label: 'On Hold' },
      archived: { variant: 'destructive' as const, label: 'Archived' }
    }
    return variants[status]
  }

  const getPriorityColor = (priority: Project['priority']) => {
    const colors = {
      low: 'text-blue-500',
      medium: 'text-yellow-500',
      high: 'text-red-500'
    }
    return colors[priority]
  }

  const filteredProjects = projects.filter(project =>
    project.status !== 'archived' &&
    (project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const stats = {
    total: projects.filter(p => p.status !== 'archived').length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    avgProgress: Math.round(
      projects.filter(p => p.status !== 'archived')
        .reduce((sum, p) => sum + p.progress, 0) / projects.filter(p => p.status !== 'archived').length
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            All Projects
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your projects
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Start a new project and assign team members
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" placeholder="Enter project name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Project description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="integration">Integration</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input id="budget" placeholder="€0" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="team">Team Size</Label>
                <Input id="team" type="number" placeholder="0" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Excluding archived
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Badge className="bg-green-500">{stats.active}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully finished
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <span className="text-xs font-semibold text-muted-foreground">{stats.avgProgress}%</span>
          </CardHeader>
          <CardContent>
            <Progress value={stats.avgProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Across all projects
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/projects">All</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/projects/active">Active</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/projects/archived">Archived</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
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
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusBadge(project.status).variant}>
                      {getStatusBadge(project.status).label}
                    </Badge>
                    <span className={`text-xs font-semibold uppercase ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
