import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { getAdminRole } from '@/lib/admin-auth'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  // Check if user is authenticated
  if (!session || !session.user?.email) {
    redirect('/login')
  }

  // Check if user has admin role
  const role = getAdminRole(session.user.email)
  
  if (!role) {
    redirect('/dashboard') // Redirect regular users to customer dashboard
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav role={role} userEmail={session.user.email} userName={session.user.name || 'Admin'} />
      {children}
    </div>
  )
}
