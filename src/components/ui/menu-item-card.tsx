"use client"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Flame, Leaf } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { toast } from "@/hooks/use-toast"
import type { MenuItem } from "@/types"

interface MenuItemCardProps {
  item: MenuItem
}

const getImageUrl = (imagePath: string): string => {
  if (!imagePath) {
    return "/placeholder.svg"
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
  let fullPath = imagePath
  if (!imagePath.startsWith("images/products/")) {
    fullPath = `images/products/${imagePath}`
  }

  return `${API_BASE_URL}/${fullPath}`
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(item)
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const isSpicy = item.isSpicy || item.is_spicy || false
  const isVegetarian = item.isVegetarian || item.is_vegetarian || false

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-red-800 via-orange-700 to-amber-700 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 relative flex flex-col w-full aspect-[4/5] sm:aspect-auto">
      {/* Korean Flag - Only show on larger screens */}
      <div className="absolute top-3 left-3 z-10 hidden sm:block">
        <div className="w-7 h-5 bg-white rounded-sm flex items-center justify-center shadow-md">
          <div className="text-xs">🇰🇷</div>
        </div>
      </div>

      {/* Korean Text - Only show on larger screens */}
      <div className="absolute top-3 right-3 z-10 hidden sm:block">
        <span className="text-white text-xs font-medium drop-shadow-lg">한국 요리</span>
      </div>

      {/* Badges - Only show on larger screens */}
      <div className="absolute top-12 right-3 z-10 flex-col gap-1 hidden sm:flex">
        {isSpicy && (
          <Badge variant="destructive" className="bg-red-600 text-white text-[10px] px-1 py-0">
            <Flame className="w-3 h-3 mr-0.5" />
            Hot
          </Badge>
        )}
        {isVegetarian && (
          <Badge variant="secondary" className="bg-green-500 text-white text-[10px] px-1 py-0">
            <Leaf className="w-3 h-3 mr-0.5" />
            Veg
          </Badge>
        )}
      </div>

      {/* Mobile: Plus button positioned at top right */}
      <div className="absolute top-2 right-2 z-20 sm:hidden">
        <Button
          onClick={handleAddToCart}
          size="sm"
          className="w-8 h-8 rounded-full bg-white/90 text-orange-600 hover:bg-white hover:text-orange-700 font-bold shadow-lg backdrop-blur-sm border border-white/30 transition-all duration-300 p-0 flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <CardContent className="p-2 sm:p-5 text-center flex-1 flex flex-col justify-between">
        {/* Image - Centered and sized for square layout */}
        <div className="flex justify-center mb-1 sm:mb-4 mt-2 sm:mt-6">
          <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 sm:border-3 md:border-4 border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm flex-shrink-0">
            <Image
              src={getImageUrl(item.image) || "/placeholder.svg"}
              alt={item.name}
              width={128}
              height={128}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between px-0.5 min-h-0">
          {/* Title and Price Container */}
          <div className="flex flex-col justify-center flex-1 min-h-0">
            {/* Title */}
            <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 uppercase tracking-wide drop-shadow-lg leading-tight line-clamp-2 sm:line-clamp-none">
              {item.name}
            </h3>

            {/* Description - Only show on larger screens */}
            <p className="text-white/90 text-xs md:text-sm mb-4 leading-relaxed drop-shadow-md line-clamp-3 hidden sm:block">
              {item.description}
            </p>
          </div>

          {/* Price - Always at bottom on mobile, with category on larger screens */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mt-auto flex-shrink-0">
            <span className="text-lg sm:text-lg md:text-xl lg:text-2xl font-bold text-white drop-shadow-lg">
              ₱{" "}
              {typeof item.price === "number"
                ? item.price.toFixed(2)
                : Number.parseFloat(String(item.price)).toFixed(2)}
            </span>
            <span className="text-xs text-white/80 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/30 text-center hidden sm:block">
              {item.category}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Footer with Add to Cart button - Only show on larger screens */}
      <CardFooter className="p-4 md:p-5 hidden sm:block">
        <Button
          onClick={handleAddToCart}
          className="w-full text-sm md:text-base lg:text-lg py-3 md:py-4 bg-white/90 text-orange-600 hover:bg-white hover:text-orange-700 font-bold shadow-lg backdrop-blur-sm border border-white/30 transition-all duration-300 min-h-[40px] md:min-h-[48px]"
          size="sm"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5 mr-1.5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
