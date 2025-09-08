"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Clock, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api"
import type { Order } from "@/types"

const OrderSuccess = () => {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderNumber) {
        setLoading(false)
        return
      }

      try {
        // In a real app, you'd fetch by order number, but our API uses ID
        // For demo purposes, we'll fetch the latest orders and find by order number
        const response = await apiClient.getOrders({ page: '1', per_page: '10' })
        if (response.success && response.data) {
          const foundOrder = response.data.items.find(o => o.order_number === orderNumber)
          if (foundOrder) {
            setOrder(foundOrder)
          }
        }
      } catch (error) {
        console.error('Error fetching order details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderNumber])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-200 to-green-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-600/30 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-600">Loading order details... 주문 정보 로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-200 to-green-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-emerald-300 rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-500/20 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 border border-green-400/30 rotate-12"></div>
      </div>

      <div className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <Card className="mb-8 bg-white/90 backdrop-blur-md border-green-300 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-green-600 mb-2">
                    주문 완료! Order Confirmed!
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Thank you for your order! Your delicious Korean meal is being prepared.
                  </p>
                </div>

                {order && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-green-700 mb-2">Order Details</h3>
                    <div className="text-sm space-y-1">
                      <p><strong>Order Number:</strong> {order.order_number}</p>
                      <p><strong>Total Amount:</strong> ₱{order.total_amount}</p>
                      <p><strong>Payment Method:</strong> {order.payment_method.toUpperCase()}</p>
                      <p><strong>Status:</strong> <span className="capitalize">{order.order_status}</span></p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Package className="w-6 h-6 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium text-green-700">Order Received</p>
                      <p className="text-xs text-green-600">We're preparing your food</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                    <div className="text-left">
                      <p className="font-medium text-yellow-700">Estimated Time</p>
                      <p className="text-xs text-yellow-600">30-45 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium text-blue-700">Delivery</p>
                      <p className="text-xs text-blue-600">To your address</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            {order && order.order_items && (
              <Card className="mb-8 bg-white/90 backdrop-blur-md border-green-300 shadow-2xl">
                <CardHeader className="border-b border-green-200">
                  <CardTitle className="text-green-600">Your Order Items</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600">Qty: {item.quantity} × ₱{item.price}</p>
                        </div>
                        <div className="font-semibold text-green-600">
                          ₱{item.subtotal}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-green-200 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="font-bold text-xl text-green-600">₱{order.total_amount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            <Card className="mb-8 bg-white/90 backdrop-blur-md border-green-300 shadow-2xl">
              <CardHeader className="border-b border-green-200">
                <CardTitle className="text-green-600">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-gray-600">+63 917 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-sm text-gray-600">support@koreanfood.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                size="lg"
              >
                <Link href="/menu">Order More Food 🍜</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 border-green-300 text-green-600 hover:bg-green-50"
                size="lg"
              >
                <Link href="/orders">View All Orders 📋</Link>
              </Button>
            </div>

            <div className="text-center mt-8 p-4 bg-green-50/80 rounded-lg">
              <p className="text-green-700 font-medium mb-2">
                감사합니다! Thank you for choosing our Korean restaurant!
              </p>
              <p className="text-sm text-green-600">
                We'll send you updates about your order via email and SMS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess