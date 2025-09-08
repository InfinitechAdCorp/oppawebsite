"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const dishes = [
    {
      name: "Bibimbap",
      desc: "A wholesome rice bowl with fresh veggies, beef, and spicy gochujang.",
      img: "/korean-bibimbap-rice-bowl-with-vegetables-and-beef.jpg",
    },
    {
      name: "Korean BBQ",
      desc: "Juicy grilled meats served with classic side dishes and sauces.",
      img: "/korean-bbq-grilled-meat-with-side-dishes.jpg",
    },
    {
      name: "Kimchi Stew",
      desc: "Traditional spicy kimchi jjigae, simmered to perfection.",
      img: "/korean-kimchi-stew-jjigae-in-stone-pot.jpg",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dishes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [dishes.length])

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-orange-800 to-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Dancheong-inspired geometric patterns */}
        <div className="absolute top-10 left-5 w-20 h-20 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full text-red-400 animate-pulse">
            <pattern id="dancheong1" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="currentColor" opacity="0.3" />
              <circle cx="10" cy="10" r="3" fill="#fbbf24" opacity="0.8" />
            </pattern>
            <rect width="100" height="100" fill="url(#dancheong1)" />
          </svg>
        </div>

        {/* Traditional Korean cloud pattern (구름무늬) */}
        <div className="absolute top-1/4 right-10 w-32 h-16 opacity-15">
          <svg viewBox="0 0 120 60" className="w-full h-full text-yellow-400">
            <path
              d="M10,30 Q20,10 40,30 Q60,10 80,30 Q100,10 110,30 Q100,50 80,30 Q60,50 40,30 Q20,50 10,30 Z"
              fill="currentColor"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Korean taegeuk-inspired circular patterns */}
        <div
          className="absolute bottom-1/4 left-10 w-24 h-24 opacity-20 animate-spin"
          style={{ animationDuration: "20s" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
            <path
              d="M50,5 A45,45 0 0,1 50,95 A22.5,22.5 0 0,1 50,50 A22.5,22.5 0 0,0 50,5 Z"
              fill="#dc2626"
              opacity="0.4"
            />
            <path
              d="M50,95 A45,45 0 0,1 50,5 A22.5,22.5 0 0,1 50,50 A22.5,22.5 0 0,0 50,95 Z"
              fill="#1e40af"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Traditional Korean lattice pattern (창살무늬) */}
        <div className="absolute top-1/3 left-1/3 w-16 h-16 opacity-25">
          <svg
            viewBox="0 0 60 60"
            className="w-full h-full text-orange-400 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            <defs>
              <pattern id="lattice" patternUnits="userSpaceOnUse" width="15" height="15">
                <rect width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.8" />
                <circle cx="7.5" cy="7.5" r="2" fill="currentColor" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="60" height="60" fill="url(#lattice)" />
          </svg>
        </div>

        {/* Korean wave pattern (물결무늬) */}
        <div className="absolute bottom-10 right-1/4 w-28 h-12 opacity-20">
          <svg viewBox="0 0 100 40" className="w-full h-full text-red-400">
            <path
              d="M0,20 Q25,5 50,20 T100,20 Q75,35 50,20 T0,20 Z"
              fill="currentColor"
              className="animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </svg>
        </div>

        {/* Small traditional Korean flower motifs (꽃무늬) */}
        <div
          className="absolute top-20 right-1/3 w-8 h-8 opacity-30 animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          <svg viewBox="0 0 40 40" className="w-full h-full text-yellow-300">
            <circle cx="20" cy="20" r="3" fill="currentColor" />
            <circle cx="20" cy="10" r="2" fill="currentColor" opacity="0.8" />
            <circle cx="30" cy="20" r="2" fill="currentColor" opacity="0.8" />
            <circle cx="20" cy="30" r="2" fill="currentColor" opacity="0.8" />
            <circle cx="10" cy="20" r="2" fill="currentColor" opacity="0.8" />
          </svg>
        </div>

        <div
          className="absolute bottom-1/3 left-1/4 w-6 h-6 opacity-40 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          <svg viewBox="0 0 30 30" className="w-full h-full text-orange-300">
            <circle cx="15" cy="15" r="2" fill="currentColor" />
            <circle cx="15" cy="8" r="1.5" fill="currentColor" opacity="0.7" />
            <circle cx="22" cy="15" r="1.5" fill="currentColor" opacity="0.7" />
            <circle cx="15" cy="22" r="1.5" fill="currentColor" opacity="0.7" />
            <circle cx="8" cy="15" r="1.5" fill="currentColor" opacity="0.7" />
          </svg>
        </div>

        {/* Existing bokeh orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-orange-500/30 rounded-full blur-lg animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-40 left-10 w-24 h-24 bg-orange-500/30 rounded-full blur-lg animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-red-500/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-300/25 rounded-full blur-md animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "2s" }}
        ></div>

        {/* Medium bokeh orbs */}
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-orange-400/20 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-60 left-1/3 w-12 h-12 bg-red-400/30 rounded-full blur-md animate-bounce"
          style={{ animationDuration: "2.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-yellow-500/15 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Small floating bokeh orbs */}
        <div
          className="absolute top-80 left-20 w-8 h-8 bg-orange-300/40 rounded-full blur-sm animate-bounce"
          style={{ animationDuration: "3.5s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/2 w-6 h-6 bg-yellow-400/50 rounded-full blur-sm animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute top-1/2 right-16 w-10 h-10 bg-red-300/35 rounded-full blur-md animate-bounce"
          style={{ animationDuration: "4.5s", animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left side - Text content */}
            <div className="flex-1 text-center lg:text-left text-white">
              {/* Main Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                <span className="text-yellow-400">OPPA</span> Restaurant
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 mb-8">
                "Where Tradition Meets Modern Taste"
              </p>

              {/* Short slogan */}
              <p className="text-base md:text-lg lg:text-xl mb-8 text-gray-400 italic">
                Serving authentic Korean flavors, crafted with love and passion
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-6 shadow-xl"
                >
                  <Link href="/menu">Explore Our Menu</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                >
                  <Link href="/contact">Make Reservation</Link>
                </Button>
              </div>
            </div>

            {/* Right side - 3D Carousel */}
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-80 h-96 mx-auto mb-8" style={{ perspective: "1000px" }}>
                {dishes.map((dish, i) => {
                  const offset = i - currentSlide
                  const absOffset = Math.abs(offset)
                  const isActive = offset === 0
                  const isNext = offset === 1 || offset === -(dishes.length - 1)
                  const isPrev = offset === -1 || offset === dishes.length - 1

                  return (
                    <div
                      key={i}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out transform-gpu ${
                        isActive
                          ? "z-30 scale-100 opacity-100 translate-x-0 rotateY-0"
                          : isNext
                            ? "z-20 scale-75 opacity-60 translate-x-24 rotateY-45"
                            : isPrev
                              ? "z-20 scale-75 opacity-60 -translate-x-24 rotateY--45"
                              : "z-10 scale-50 opacity-20 translate-x-0 rotateY-90"
                      }`}
                      style={{
                        transform: `
                          translateX(${offset * 100}px) 
                          rotateY(${offset * 45}deg) 
                          scale(${isActive ? 1 : 0.75})
                          translateZ(${isActive ? 0 : -100}px)
                        `,
                      }}
                    >
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-2xl h-full">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={dish.img || "/placeholder.svg"}
                            alt={dish.name}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <div className="p-6 text-left">
                          <h3 className="text-2xl font-semibold mb-3 text-yellow-400">{dish.name}</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">{dish.desc}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Carousel indicators */}
              <div className="flex justify-center gap-2">
                {dishes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentSlide ? "bg-yellow-400 scale-125" : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
