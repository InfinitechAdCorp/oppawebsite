'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const Footer = () => {
  const pathname = usePathname()

  // Hide footer on any admin routes
  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg">
                <span className="text-white font-bold">O</span>
              </div>
              <span className="text-xl font-bold">OPPA Restaurant</span>
            </div>
            <p className="text-white/80 text-sm">
              Authentic Korean cuisine with a modern twist. Experience the flavors of Korea in a warm, welcoming atmosphere.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-white/80 hover:text-white transition-colors text-sm">Home</Link>
              <Link href="/menu" className="text-white/80 hover:text-white transition-colors text-sm">Menu</Link>
              <Link href="/about" className="text-white/80 hover:text-white transition-colors text-sm">About Us</Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors text-sm">Contact</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-white/60" />
                <span className="text-white/80">123 Korean Street, Food District</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-white/60" />
                <span className="text-white/80">(555) 123-OPPA</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-white/60" />
                <span className="text-white/80">hello@opparestaurant.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-white/60" />
                <span className="text-white/80">Mon-Thu: 11AM-9PM</span>
              </div>
              <div className="text-white/80 ml-6">Fri-Sat: 11AM-10PM</div>
              <div className="text-white/80 ml-6">Sunday: 12PM-8PM</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2024 OPPA Restaurant. All rights reserved. Made with ❤️ for Korean food lovers.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
