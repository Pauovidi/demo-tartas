import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Admin | Casa Bruna Demo",
  description: "Panel de administración demo",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase()
  const currentEmail = user?.email?.toLowerCase()

  if (!user) {
    redirect("/admin/login")
  }

  if (!adminEmail || currentEmail !== adminEmail) {
    redirect("/admin/login?error=not_authorized")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-foreground">Casa Bruna Admin</p>
        </div>
      </header>
      {children}
    </div>
  )
}
