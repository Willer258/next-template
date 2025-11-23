"use client"

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar as CalendarIcon, Clock, Plus, Video, Users, MapPin } from 'lucide-react'

interface Event {
  id: number
  title: string
  date: Date
  time: string
  type: 'meeting' | 'call' | 'event' | 'deadline'
  description: string
  attendees?: number
  location?: string
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(),
      time: '10:00 AM',
      type: 'meeting',
      description: 'Weekly team sync',
      attendees: 8,
      location: 'Conference Room A'
    },
    {
      id: 2,
      title: 'Client Call',
      date: new Date(),
      time: '2:00 PM',
      type: 'call',
      description: 'Discuss project requirements',
      attendees: 3
    },
    {
      id: 3,
      title: 'Product Launch',
      date: new Date(Date.now() + 86400000),
      time: '9:00 AM',
      type: 'event',
      description: 'New feature release',
      attendees: 50,
      location: 'Main Hall'
    },
  ])

  const getEventTypeColor = (type: Event['type']) => {
    const colors = {
      meeting: 'bg-blue-500',
      call: 'bg-green-500',
      event: 'bg-purple-500',
      deadline: 'bg-red-500'
    }
    return colors[type]
  }

  const getEventTypeBadge = (type: Event['type']) => {
    const variants = {
      meeting: 'default',
      call: 'secondary',
      event: 'outline',
      deadline: 'destructive'
    }
    return variants[type] as any
  }

  const todaysEvents = events.filter(event =>
    event.date.toDateString() === (date || new Date()).toDateString()
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Calendar
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your schedule and upcoming events
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Add a new event to your calendar
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Event title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Event description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location (Optional)</Label>
                <Input id="location" placeholder="Event location" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>
                {todaysEvents.length} event{todaysEvents.length !== 1 ? 's' : ''} scheduled for {(date || new Date()).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todaysEvents.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No events scheduled for this day</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todaysEvents.map((event) => (
                    <div
                      key={event.id}
                      className="animate-in fade-in slide-in-from-left-5 duration-500"
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${getEventTypeColor(event.type)} bg-opacity-10`}>
                              {event.type === 'meeting' && <Users className="h-5 w-5" />}
                              {event.type === 'call' && <Video className="h-5 w-5" />}
                              {event.type === 'event' && <CalendarIcon className="h-5 w-5" />}
                              {event.type === 'deadline' && <Clock className="h-5 w-5" />}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold">{event.title}</h3>
                                  <p className="text-sm text-muted-foreground">{event.description}</p>
                                </div>
                                <Badge variant={getEventTypeBadge(event.type)}>
                                  {event.type}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {event.time}
                                </div>
                                {event.attendees && (
                                  <div className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    {event.attendees} attendees
                                  </div>
                                )}
                                {event.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {event.location}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Events scheduled for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events.filter(e => e.date > new Date()).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${getEventTypeColor(event.type)}`} />
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} at {event.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getEventTypeBadge(event.type)}>{event.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Event Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm">Meetings</span>
                  </div>
                  <span className="font-semibold">
                    {events.filter(e => e.type === 'meeting').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm">Calls</span>
                  </div>
                  <span className="font-semibold">
                    {events.filter(e => e.type === 'call').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-sm">Events</span>
                  </div>
                  <span className="font-semibold">
                    {events.filter(e => e.type === 'event').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm">Deadlines</span>
                  </div>
                  <span className="font-semibold">
                    {events.filter(e => e.type === 'deadline').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
