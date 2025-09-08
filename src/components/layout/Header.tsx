"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, ShoppingCart, LogOut } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { getItemCount } = useCartStore()
  const itemCount = getItemCount()

  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)

  // Don't render header on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }

  // Load user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user_data")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        setUser(null)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
    router.push("/login")
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const isActivePage = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 relative overflow-hidden">
      {/* Background / Effects */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-2 left-10 w-16 h-16 bg-orange-200/40 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-8 right-20 w-12 h-12 bg-red-200/50 rounded-full blur-lg animate-pulse delay-300"></div>
      </div>
      <div className="absolute inset-0 border-b border-orange-200/30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl border border-orange-300 shadow-lg">
              <span className="text-white font-bold text-xl drop-shadow-lg">오</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-800">OPPA Restaurant</span>
              <span className="text-xs text-orange-600 font-medium">한국 요리</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg border ${
                  isActivePage(item.href)
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg border-orange-300"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white border-orange-200 hover:border-orange-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Cart + User + Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="outline"
                size="sm"
                className="relative bg-gradient-to-r from-red-500 to-orange-500 border-orange-300 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-300"
              >
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-1 min-w-[20px] h-5 flex items-center justify-center text-xs bg-red-600 border-2 border-white shadow-lg animate-pulse">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Info (right side of cart) */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-700">👋 {user.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1 border-red-300 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md"
                >
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden bg-gradient-to-r from-red-500 to-orange-500 text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gradient-to-br from-red-600 via-orange-500 to-red-500">
                <div className="flex flex-col space-y-6 mt-6">
                  <nav className="flex flex-col space-y-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-base font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                          isActivePage(item.href)
                            ? "bg-white/30 text-white shadow-lg"
                            : "text-white/90 hover:bg-white/20 hover:text-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {/* Auth (mobile) */}
                    {user ? (
                      <div className="flex flex-col space-y-3 mt-4">
                        <span className="text-white text-sm">👋 {user.name}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            handleLogout()
                            setIsOpen(false)
                          }}
                          className="flex items-center space-x-1 border-white/50 text-white hover:bg-white/20"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </Button>
                      </div>
                    ) : (
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full bg-white text-red-600 hover:bg-white/90"
                        >
                          Login
                        </Button>
                      </Link>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header