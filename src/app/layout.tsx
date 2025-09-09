import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import ServiceWorkerProvider from "@/components/ServiceWorkerProvider"

import "./globals.css"

export const metadata: Metadata = {
  title: "OPPA Restaurant - Authentic Korean Cuisine",
  description:
    "Experience authentic Korean flavors at OPPA Restaurant. Traditional dishes with a modern twist, made with the finest ingredients.",
  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OPPA",
  },
  icons: {
    apple: "/icon512_rounded.png",
    icon: "/icon512_rounded.png",
  },
}
export const viewport = {
   themeColor: "#ff470a",
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
          <ServiceWorkerProvider />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
