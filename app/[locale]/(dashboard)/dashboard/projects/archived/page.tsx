"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Folder, Search, Users, Calendar as CalendarIcon, ArrowLeft, Archive, RotateCcw } from 'lucide-react'

interface Project {
  id: number
  name: string
  description: string
  progress: number
  team: number
  completedDate: string
  category: string
  finalBudget: string
}

export default function ArchivedProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const archivedProjects: Project[] = [
    {
      id: 6,
      name: 'Brand Identity Update',
      description: 'Refresh company branding and visual identity',
      progress: 100,
      team: 3,
      completedDate: '2024-12-20',
      category: 'Design',
      finalBudget: '€25,000'
    },
    {
      id: 7,
      name: 'Legacy System Migration',
      description: 'Migrate data from old system to new platform',
      progress: 100,
      team: 7,
      completedDate: '2024-11-15',
      category: 'Development',
      finalBudget: '€65,000'
    },
    {
      id: 8,
      name: 'Product Photography',
      description: 'Professional photo shoot for all products',
      progress: 100,
      team: 2,
      completedDate: '2024-10-30',
      category: 'Marketing',
      finalBudget: '€15,000'
    },
    {
      id: 9,
      name: 'Security Audit',
      description: 'Complete security review and penetration testing',
      progress: 100,
      team: 4,
      completedDate: '2024-09-25',
      category: 'Security',
      finalBudget: '€40,000'
    },
  ]

  const filteredProjects = archivedProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalBudget = archivedProjects.reduce((sum, p) => {
    const amount = parseInt(p.finalBudget.replace(/[€,]/g, ''))
    return sum + amount
  }, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
            Archived Projects
          </h1>
          <p className="text-muted-foreground mt-1">
            Completed and archived projects
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Archived Projects</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{archivedProjects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {archivedProjects.reduce((sum, p) => sum + p.team, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Members involved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <span className="text-xs font-semibold text-green-500">Completed</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total investment
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search archived projects..."
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
          <Button variant="default" asChild>
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
            <Card className="hover:shadow-lg transition-shadow border-gray-500/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gray-500 to-gray-400">
                      <Archive className="h-5 w-5 text-white" />
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
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-semibold text-green-500">{project.progress}%</span>
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
                    <span>{new Date(project.completedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>

                <div className="pt-2 border-t space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Archived</Badge>
                    <span className="text-sm font-semibold text-green-500">{project.finalBudget}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Restore Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
