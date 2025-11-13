import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Building2, Activity, DollarSign } from 'lucide-react'

const stats = [
  {
    title: 'Total Users',
    value: '1,234',
    change: '+12% from last month',
    icon: Users,
  },
  {
    title: 'Organizations',
    value: '89',
    change: '+5% from last month',
    icon: Building2,
  },
  {
    title: 'Active Sessions',
    value: '456',
    change: '+23% from last hour',
    icon: Activity,
  },
  {
    title: 'Revenue',
    value: '$12,345',
    change: '+18% from last month',
    icon: DollarSign,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your SaaS metrics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                No recent activity to display.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Statistics will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
