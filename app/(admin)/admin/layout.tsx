import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin | Casa Bruna Demo",
  description: "Panel de administración demo",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
