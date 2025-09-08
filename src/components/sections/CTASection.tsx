import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-red-600 via-orange-500 to-red-700">
     

      <div className="relative container mx-auto px-4 text-center">
        <div className="mb-4">
          <span className="text-white/80 text-lg font-medium tracking-wider">안녕하세요 • Welcome</span>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
          <span className="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
            Ready to Experience
          </span>
          <br />
          <span className="text-yellow-200 drop-shadow-xl">Korean Flavors?</span>
        </h2>

        <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Order now and taste the authentic flavors of Korea delivered fresh to your door
          <br />
          <span className="text-orange-200 font-medium">맛있는 한국 음식 • Delicious Korean Food</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="text-lg px-10 py-7 bg-white/95 backdrop-blur-sm text-red-600 hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl border-2 border-white/20 font-semibold"
          >
            <Link href="/menu">🍜 Order Now • 주문하기</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg px-10 py-7 border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-xl font-semibold bg-transparent"
          >
            <Link href="/contact">📞 Call (555) 123-OPPA</Link>
          </Button>
        </div>

        <div className="mt-8 text-white/70 text-sm">
          <span className="inline-block mx-2">🇰🇷</span>
          <span>Authentic Korean Cuisine Since 2020</span>
          <span className="inline-block mx-2">🇰🇷</span>
        </div>
      </div>
    </section>
  )
}
