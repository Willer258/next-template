import { UsersTable, User } from '@/components/tables/users-table'

// Mock data - in production, this would come from your database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'OWNER',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'ADMIN',
    status: 'active',
    createdAt: '2024-02-20T10:00:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'MEMBER',
    status: 'active',
    createdAt: '2024-03-10T10:00:00Z',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'MEMBER',
    status: 'invited',
    createdAt: '2024-04-05T10:00:00Z',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'VIEWER',
    status: 'inactive',
    createdAt: '2024-01-25T10:00:00Z',
  },
]

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage your team members and their permissions
        </p>
      </div>

      <UsersTable data={mockUsers} />
    </div>
  )
}
