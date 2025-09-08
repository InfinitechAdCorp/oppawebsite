import Link from "next/link"
import { Button } from "@/components/ui/button"
import MenuItemCard from "@/components/ui/menu-item-card"
import { menuItems } from "@/data/menuData"

export default function FeaturedMenu() {
  const featuredItems = menuItems.slice(0, 3)

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-orange-100 to-amber-100">
        {/* Large prominent bokeh circles in red-orange tones */}
        <div className="absolute top-20 left-16 w-64 h-64 bg-gradient-to-br from-red-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-24 w-48 h-48 bg-gradient-to-br from-orange-500/25 to-red-500/25 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-gradient-to-br from-red-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-br from-orange-400/30 to-red-400/30 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-red-400/15 to-orange-400/15 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-orange-500/35 to-red-500/35 rounded-full blur-xl animate-pulse delay-200"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 drop-shadow-sm">
            Featured <span className="text-orange-600 drop-shadow-sm">Dishes</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto drop-shadow-sm">
            Discover our most popular Korean dishes, crafted with authentic flavors and fresh ingredients
          </p>
        </div>

        <div className="backdrop-blur-sm bg-white/30 rounded-3xl p-8 mb-12 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <div
                key={item.id}
                className="transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="backdrop-blur-md bg-white/40 rounded-2xl p-1 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <MenuItemCard item={item} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block backdrop-blur-md bg-white/20 rounded-2xl p-2 border border-white/30 shadow-xl">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 hover:from-orange-600 hover:via-amber-600 hover:to-red-600 px-12 py-6 shadow-2xl text-white font-semibold rounded-xl border-0 backdrop-blur-sm hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
            >
              <Link href="/menu" className="flex items-center gap-2">
                View Full Menu
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
