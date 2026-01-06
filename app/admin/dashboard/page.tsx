import Dashboard from '@/components/Dashboard'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function DashboardPage() {
  const session = await auth()
  
  // Protect dashboard - admin only
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    redirect('/login')
  }
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Dashboard />
    </main>
  )
}

