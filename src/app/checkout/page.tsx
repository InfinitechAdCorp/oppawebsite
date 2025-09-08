"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cartStore"
import type { CheckoutInfo } from "@/types"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { Smartphone, Building2, Wallet, Banknote, FileText, Lock, Package, User, LogIn } from "lucide-react"
import Link from "next/link"

interface ExtendedCheckoutInfo extends Omit<CheckoutInfo, "paymentMethod"> {
  paymentMethod: "cash" | "gcash" | "paypal" | "bpi" | "maya"
  notes?: string
}

interface User {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  zip_code?: string
}

const Checkout = () => {
  const { items, getTotal, clearCart } = useCartStore()
  const total = getTotal()
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  const [checkoutInfo, setCheckoutInfo] = useState<ExtendedCheckoutInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "cash",
    notes: "",
  })

  // Check for authenticated user and auto-fill form
  useEffect(() => {
    const checkAuthAndFillForm = async () => {
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')

      if (token && userData) {
        try {
          // Verify token is still valid by making a test API call
          const response = await fetch('/api/orders?page=1&per_page=1', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const parsedUserData = JSON.parse(userData)
            setUser(parsedUserData)
            
            // Auto-fill form with user data
            setCheckoutInfo(prev => ({
              ...prev,
              name: parsedUserData.name || "",
              email: parsedUserData.email || "",
              phone: parsedUserData.phone || "",
              address: parsedUserData.address || "",
              city: parsedUserData.city || "",
              zipCode: parsedUserData.zip_code || "",
            }))

            toast({
              title: "Welcome back! 다시 오신 것을 환영합니다!",
              description: "Your information has been automatically filled. 정보가 자동으로 입력되었습니다.",
            })
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_data')
          }
        } catch (error) {
          console.error('Error checking auth:', error)
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user_data')
        }
      }
      setIsLoadingUser(false)
    }

    checkAuthAndFillForm()
  }, [])

  const handleInputChange = (field: keyof ExtendedCheckoutInfo, value: string) => {
    setCheckoutInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setReceiptFile(file)
      toast({
        title: "Receipt Uploaded",
        description: `Receipt "${file.name}" has been uploaded successfully.`,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!checkoutInfo.name || !checkoutInfo.email || !checkoutInfo.phone || !checkoutInfo.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Check if user is authenticated
    const token = localStorage.getItem('auth_token')
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order.",
        variant: "destructive",
      })
      router.push('/login')
      return
    }

    setIsProcessing(true)

    try {
      // Prepare order data for API
     const orderData = {
  items: items.map(item => ({
    name: item.name,
    description: item.description || "",
    price: item.price,
    quantity: item.quantity,
    category: item.category || "Korean Food",
    is_spicy: Boolean(item.isSpicy),
    is_vegetarian: Boolean(item.isVegetarian),
    image_url: typeof item.image === "string" ? item.image : "",
  })),
  payment_method: checkoutInfo.paymentMethod,
  delivery_address: checkoutInfo.address,
  delivery_city: checkoutInfo.city,
  delivery_zip_code: checkoutInfo.zipCode,
  customer_name: checkoutInfo.name,
  customer_email: checkoutInfo.email,
  customer_phone: checkoutInfo.phone,
  receipt_file: receiptFile ? receiptFile.name : "",
  notes: checkoutInfo.notes || "",
}

      // Create order through direct API call
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (response.ok && result.success && result.data) {
        clearCart()
        setIsOrderComplete(true)

        toast({
          title: "Order Placed Successfully! 주문 완료!",
          description: `Order ${result.data.order.order_number} has been created. Your Korean feast is being prepared!`,
        })

        // Redirect to order success page with order details
        router.push(`/order-success?order=${result.data.order.order_number}`)
      } else {
        throw new Error(result.message || 'Failed to create order')
      }

    } catch (error) {
      console.error('Error creating order:', error)
      toast({
        title: "Order Failed",
        description: error instanceof Error ? error.message : "Failed to place order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const deliveryFee = 3.99
  const finalTotal = total + deliveryFee

  if (items.length === 0 && !isOrderComplete) {
    router.push("/cart")
    return null
  }

  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-red-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-600/30 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-orange-600">Loading checkout... 결제 페이지 로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-red-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-orange-400 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-orange-300 rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-red-500/20 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 border border-orange-400/30 rotate-12"></div>
      </div>

      <div className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-orange-600 drop-shadow-lg">
              결제 <span className="text-red-600">Checkout</span>
            </h1>
            {user && (
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-orange-200">
                <User className="w-4 h-4 text-orange-600" />
                <span className="text-gray-700">Welcome, {user.name}!</span>
              </div>
            )}
          </div>

          {!user && (
            <Card className="mb-8 bg-gradient-to-r from-orange-100/80 to-red-100/80 backdrop-blur-sm border-orange-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-orange-600 mb-2">
                      로그인하여 더 빠른 결제를 경험하세요!
                    </h3>
                    <p className="text-gray-600">
                      Login for faster checkout with saved information. 저장된 정보로 더 빠른 결제가 가능합니다.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/login">
                      <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                        <LogIn className="w-4 h-4 mr-2" />
                        Login 로그인
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        <User className="w-4 h-4 mr-2" />
                        Register 회원가입
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-md border-orange-300 shadow-2xl">
              <CardHeader className="border-b border-orange-200">
                <CardTitle className="text-orange-600 text-xl">배송 및 결제 정보</CardTitle>
                <p className="text-red-600 text-sm">Delivery & Payment Information</p>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-orange-600 border-b border-orange-300 pb-2">
                      개인정보 <span className="text-red-600 text-base">Personal Information</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={checkoutInfo.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="bg-white/70 border-orange-300 text-gray-800 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-700">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={checkoutInfo.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="bg-white/70 border-orange-300 text-gray-800 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={checkoutInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        required
                        className="bg-white/70 border-orange-300 text-gray-800 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  <Separator className="bg-orange-300" />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-orange-600 border-b border-orange-300 pb-2">
                      배송주소 <span className="text-red-600 text-base">Delivery Address</span>
                    </h3>

                    <div>
                      <Label htmlFor="address" className="text-gray-700">
                        Street Address *
                      </Label>
                      <Input
                        id="address"
                        value={checkoutInfo.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter your street address"
                        required
                        className="bg-white/70 border-orange-300 text-gray-800 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-gray-700">
                          City *
                        </Label>
                        <Input
                          id="city"
                          value={checkoutInfo.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="Enter your city"
                          required
                          className="bg-white/70 border-orange-300 text-gray-800 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-gray-700">
                          ZIP Code *
                        </Label>
                        <Input
                          id="zipCode"
                          value={checkoutInfo.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          placeholder="Enter ZIP code"
                          required
                          className="bg-white/70 border-orange-300 text-gray-800 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-orange-300" />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-orange-600 border-b border-orange-300 pb-2">
                      결제방법 <span className="text-red-600 text-base">Payment Method</span>
                    </h3>

                    <RadioGroup
                      value={checkoutInfo.paymentMethod}
                      onValueChange={(value) =>
                        handleInputChange("paymentMethod", value as ExtendedCheckoutInfo["paymentMethod"])
                      }
                      className="grid grid-cols-2 gap-3"
                    >
                      <div
                        className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 
                                    border border-orange-300 hover:border-orange-400 transition-colors"
                      >
                        <RadioGroupItem value="gcash" id="gcash" className="border-orange-500 text-orange-600" />
                        <Label htmlFor="gcash" className="text-gray-700 cursor-pointer flex items-center gap-2">
                          <Smartphone className="w-4 h-4" /> GCash
                        </Label>
                      </div>

                      <div
                        className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 
                                    border border-orange-300 hover:border-orange-400 transition-colors"
                      >
                        <RadioGroupItem value="paypal" id="paypal" className="border-orange-500 text-orange-600" />
                        <Label htmlFor="paypal" className="text-gray-700 cursor-pointer flex items-center gap-2">
                          <Wallet className="w-4 h-4" /> PayPal
                        </Label>
                      </div>

                      <div
                        className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 
                                    border border-orange-300 hover:border-orange-400 transition-colors"
                      >
                        <RadioGroupItem value="bpi" id="bpi" className="border-orange-500 text-orange-600" />
                        <Label htmlFor="bpi" className="text-gray-700 cursor-pointer flex items-center gap-2">
                          <Building2 className="w-4 h-4" /> BPI Online
                        </Label>
                      </div>

                      <div
                        className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 
                                    border border-orange-300 hover:border-orange-400 transition-colors"
                      >
                        <RadioGroupItem value="maya" id="maya" className="border-orange-500 text-orange-600" />
                        <Label htmlFor="maya" className="text-gray-700 cursor-pointer flex items-center gap-2">
                          <Wallet className="w-4 h-4" /> Maya
                        </Label>
                      </div>

                      <div
                        className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 
                                    border border-orange-300 hover:border-orange-400 transition-colors col-span-2"
                      >
                        <RadioGroupItem value="cash" id="cash" className="border-orange-500 text-orange-600" />
                        <Label htmlFor="cash" className="text-gray-700 cursor-pointer flex items-center gap-2">
                          <Banknote className="w-4 h-4" /> Cash on Delivery
                        </Label>
                      </div>
                    </RadioGroup>

                    {checkoutInfo.paymentMethod === "gcash" && (
                      <div className="space-y-4 pt-4 border-t border-orange-300">
                        <div className="text-center">
                          <h4 className="text-orange-600 font-semibold mb-3">GCash Payment</h4>
                          <div className="bg-white p-4 rounded-lg inline-block">
                            <img
                              src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                              alt="GCash QR Code"
                              className="w-48 h-48 object-cover mx-auto rounded-lg"
                            />
                          </div>
                          <div className="mt-4 space-y-2">
                            <p className="text-gray-600 text-sm">Scan QR code with your GCash app</p>
                            <p className="text-orange-600 font-mono">GCash Number: +63 917 123 4567</p>
                            <p className="text-red-600 text-xs">Amount: ₱{finalTotal.toFixed(2)}</p>
                          </div>
                          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-300">
                            <Label
                              htmlFor="gcash-receipt"
                              className="text-orange-600 font-medium block mb-2 flex items-center gap-2"
                            >
                              <FileText className="w-4 h-4" /> Upload Payment Receipt
                            </Label>
                            <Input
                              id="gcash-receipt"
                              type="file"
                              accept="image/*"
                              onChange={handleReceiptUpload}
                              className="bg-white border-orange-300 text-gray-800 file:bg-orange-500 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 hover:file:bg-orange-600"
                            />
                            {receiptFile && (
                              <p className="text-green-600 text-sm mt-2">✓ {receiptFile.name} uploaded</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {checkoutInfo.paymentMethod === "paypal" && (
                      <div className="space-y-4 pt-4 border-t border-orange-300">
                        <div className="text-center">
                          <h4 className="text-orange-600 font-semibold mb-3">PayPal Payment</h4>
                          <div className="bg-white p-4 rounded-lg inline-block">
                            <img
                              src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                              alt="PayPal QR Code"
                              className="w-48 h-48 object-cover mx-auto rounded-lg"
                            />
                          </div>
                          <div className="mt-4 space-y-2">
                            <p className="text-gray-600 text-sm">Scan QR code with your PayPal app</p>
                            <p className="text-orange-600 font-mono">PayPal: koreanfood@restaurant.com</p>
                            <p className="text-red-600 text-xs">Amount: ₱{finalTotal.toFixed(2)}</p>
                          </div>
                          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-300">
                            <Label
                              htmlFor="paypal-receipt"
                              className="text-orange-600 font-medium block mb-2 flex items-center gap-2"
                            >
                              <FileText className="w-4 h-4" /> Upload Payment Receipt
                            </Label>
                            <Input
                              id="paypal-receipt"
                              type="file"
                              accept="image/*"
                              onChange={handleReceiptUpload}
                              className="bg-white border-orange-300 text-gray-800 file:bg-orange-500 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 hover:file:bg-orange-600"
                            />
                            {receiptFile && (
                              <p className="text-green-600 text-sm mt-2">✓ {receiptFile.name} uploaded</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {checkoutInfo.paymentMethod === "bpi" && (
                      <div className="space-y-4 pt-4 border-t border-orange-300">
                        <div className="text-center">
                          <h4 className="text-orange-600 font-semibold mb-3">BPI Online Banking</h4>
                          <div className="bg-white p-4 rounded-lg inline-block">
                            <img
                              src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                              alt="BPI QR Code"
                              className="w-48 h-48 object-cover mx-auto rounded-lg"
                            />
                          </div>
                          <div className="mt-4 space-y-2">
                            <p className="text-gray-600 text-sm">Scan QR code with your BPI app</p>
                            <p className="text-orange-600 font-mono">Account: 1234-5678-90</p>
                            <p className="text-red-600 text-xs">Amount: ₱{finalTotal.toFixed(2)}</p>
                          </div>
                          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-300">
                            <Label
                              htmlFor="bpi-receipt"
                              className="text-orange-600 font-medium block mb-2 flex items-center gap-2"
                            >
                              <FileText className="w-4 h-4" /> Upload Payment Receipt
                            </Label>
                            <Input
                              id="bpi-receipt"
                              type="file"
                              accept="image/*"
                              onChange={handleReceiptUpload}
                              className="bg-white border-orange-300 text-gray-800 file:bg-orange-500 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 hover:file:bg-orange-600"
                            />
                            {receiptFile && (
                              <p className="text-green-600 text-sm mt-2">✓ {receiptFile.name} uploaded</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {checkoutInfo.paymentMethod === "maya" && (
                      <div className="space-y-4 pt-4 border-t border-orange-300">
                        <div className="text-center">
                          <h4 className="text-orange-600 font-semibold mb-3">Maya Payment</h4>
                          <div className="bg-white p-4 rounded-lg inline-block">
                            <img
                              src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                              alt="Maya QR Code"
                              className="w-48 h-48 object-cover mx-auto rounded-lg"
                            />
                          </div>
                          <div className="mt-4 space-y-2">
                            <p className="text-gray-600 text-sm">Scan QR code with your Maya app</p>
                            <p className="text-orange-600 font-mono">Maya Number: +63 917 987 6543</p>
                            <p className="text-red-600 text-xs">Amount: ₱{finalTotal.toFixed(2)}</p>
                          </div>
                          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-300">
                            <Label
                              htmlFor="maya-receipt"
                              className="text-orange-600 font-medium block mb-2 flex items-center gap-2"
                            >
                              <FileText className="w-4 h-4" /> Upload Payment Receipt
                            </Label>
                            <Input
                              id="maya-receipt"
                              type="file"
                              accept="image/*"
                              onChange={handleReceiptUpload}
                              className="bg-white border-orange-300 text-gray-800 file:bg-orange-500 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 hover:file:bg-orange-600"
                            />
                            {receiptFile && (
                              <p className="text-green-600 text-sm mt-2">✓ {receiptFile.name} uploaded</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-orange-300" />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-orange-600 border-b border-orange-300 pb-2">
                      추가 메모 <span className="text-red-600 text-base">Additional Notes</span>
                    </h3>
                    <div>
                      <Label htmlFor="notes" className="text-gray-700">
                        Special Instructions (Optional)
                      </Label>
                      <Input
                        id="notes"
                        value={checkoutInfo.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        placeholder="Any special requests or delivery instructions..."
                        className="bg-white/70 border-orange-300 text-gray-800 placeholder:text-gray-500 focus:border-orange-500 focus:ring-orange-500/20"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing Order...
                      </span>
                    ) : (
                      `주문하기 Place Order - ₱${finalTotal.toFixed(2)}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="h-fit bg-white/80 backdrop-blur-md border-orange-300 shadow-2xl">
              <CardHeader className="border-b border-orange-200">
                <CardTitle className="text-orange-600 text-xl">주문 요약</CardTitle>
                <p className="text-red-600 text-sm">Order Summary</p>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-3 rounded-lg bg-orange-50 border border-orange-200"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-700">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          Qty: {item.quantity} × ₱{item.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="font-medium text-orange-600">₱{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-orange-300" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₱{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Fee</span>
                    <span>₱{deliveryFee.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-orange-300" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-orange-600">Total</span>
                    <span className="text-orange-600">₱{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-xs text-center pt-4 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <Lock className="w-4 h-4" /> <span>Your payment information is secure</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Package className="w-4 h-4" /> <span>Estimated delivery: 30-45 minutes</span>
                  </div>
                  <div className="text-orange-600">맛있는 한국 음식을 곧 만나보세요! 🍜</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout