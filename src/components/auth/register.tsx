"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, Eye, EyeOff, Phone, MapPin, Building, Hash, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip_code: "",
    password: "",
    password_confirmation: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.password_confirmation) {
      toast.error("Missing Information 정보 누락", {
        description: "Please fill in all required fields. 필수 항목을 모두 입력해 주세요.",
      })
      return
    }

    if (formData.password !== formData.password_confirmation) {
      toast.error("Password Mismatch 비밀번호 불일치", {
        description: "Passwords do not match. Please check and try again. 비밀번호가 일치하지 않습니다.",
      })
      return
    }

    if (formData.password.length < 8) {
      toast.error("Password Too Short 비밀번호가 너무 짧습니다", {
        description: "Password must be at least 8 characters long. 비밀번호는 8자 이상이어야 합니다.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        // Store token and user data
        localStorage.setItem('auth_token', data.data.token)
        localStorage.setItem('user_data', JSON.stringify(data.data.user))

        toast.success("Registration Successful! 회원가입 성공!", {
          description: "Welcome to OPPA Restaurant! OPPA 레스토랑에 오신 것을 환영합니다!",
        })

        // Small delay before redirect for user to see success message
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        toast.error("Registration Failed 회원가입 실패", {
          description: data.message || "Registration failed. Please try again. 회원가입에 실패했습니다.",
        })
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error("Connection Error 연결 오류", {
        description: "Unable to register. Please check your connection and try again. 연결을 확인하고 다시 시도해 주세요.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="min-h-screen py-8 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-orange-200 rounded-full"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border-2 border-red-200 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border-2 border-yellow-200 rounded-full"></div>
          <div className="absolute bottom-32 right-10 w-28 h-28 border-2 border-orange-200 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border-orange-200/50 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-gray-800 mb-2">
                OPPA Restaurant
              </CardTitle>
              <h2 className="text-2xl text-gray-800">
                회원가입 <span className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">Register</span>
              </h2>
              <p className="text-gray-600 mt-2">Join OPPA Restaurant family! OPPA 레스토랑 가족이 되어주세요!</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 flex items-center gap-2 mb-2">
                      <User className="w-4 h-4" />
                      Full Name * 이름
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 h-12 text-base"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address * 이메일
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 h-12 text-base"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number 전화번호
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 h-12 text-base"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray-700 flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    Address 주소
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter your address"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 h-12 text-base"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-700 flex items-center gap-2 mb-2">
                      <Building className="w-4 h-4" />
                      City 도시
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Enter your city"
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 h-12 text-base"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="zip_code" className="text-gray-700 flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4" />
                      ZIP Code 우편번호
                    </Label>
                    <Input
                      id="zip_code"
                      value={formData.zip_code}
                      onChange={(e) => handleInputChange("zip_code", e.target.value)}
                      placeholder="12345"
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 h-12 text-base"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password" className="text-gray-700 flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4" />
                      Password * 비밀번호
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Enter password (min 8 characters)"
                        required
                        minLength={8}
                        className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 h-12 text-base pr-10"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password_confirmation" className="text-gray-700 flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4" />
                      Confirm Password * 비밀번호 확인
                    </Label>
                    <div className="relative">
                      <Input
                        id="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.password_confirmation}
                        onChange={(e) => handleInputChange("password_confirmation", e.target.value)}
                        placeholder="Confirm password"
                        required
                        className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 h-12 text-base pr-10"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 h-14 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account... 계정 생성 중...
                    </span>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      회원가입 Create Account
                    </>
                  )}
                </Button>

                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Already have an account? 이미 계정이 있으신가요?{" "}
                    <Link href="/login" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                      Login here 로그인
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  )
}