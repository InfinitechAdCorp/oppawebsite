"use client"

import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import OppaLoader from "@/components/oppa-loader"
import { usePathname } from "next/navigation"

const queryClient = new QueryClient()

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showHeader = pathname !== "/login" && pathname !== "/register"

  return (
    <>
      <OppaLoader />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            {showHeader && <Header />}
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </>
  )
}
