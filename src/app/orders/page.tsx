"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Clock, CheckCircle, XCircle, Truck, User, LogIn } from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api"
import type { Order } from "@/types"
import { toast } from "@/hooks/use-toast"

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuthAndFetchOrders = async () => {
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')

      if (!token) {
        setLoading(false)
        return
      }

      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error('Error parsing user data:', error)
        }
      }

      try {
        const response = await apiClient.getOrders()
        if (response.success && response.data) {
          setOrders(response.data.items)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
        toast({
          title: "Error",
          description: "Failed to load orders. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndFetchOrders()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'confirmed':
      case 'preparing':
        return <Package className="w-4 h-4" />
      case 'ready':
      case 'out_for_delivery':
        return <Truck className="w-4 h-4" />
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed':
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'ready':
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-red-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-600/30 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-orange-600">Loading orders... 주문 내역 로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!user) {
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
            <div className="max-w-md mx-auto text-center py-16">
              <Card className="bg-white/80 backdrop-blur-md border-orange-300 shadow-2xl">
                <CardContent className="p-8">
                  <User className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h1>
                  <p className="text-gray-600 mb-6">
                    Please log in to view your order history.
                  </p>
                  <div className="flex gap-3">
                    <Link href="/login" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" className="flex-1">
                      <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                        Register
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
              주문 내역 <span className="text-red-600">Order History</span>
            </h1>
            {user && (
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-orange-200">
                <User className="w-4 h-4 text-orange-600" />
                <span className="text-gray-700">Welcome, {user.name}!</span>
              </div>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-md border-orange-300 shadow-2xl">
                <CardContent className="p-8">
                  <Package className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
                  <p className="text-gray-600 mb-6">
                    You haven't placed any orders yet. Start exploring our delicious Korean menu!
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    size="lg"
                  >
                    <Link href="/menu">Browse Menu 🍜</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="bg-white/80 backdrop-blur-md border-orange-300 shadow-2xl">
                  <CardHeader className="border-b border-orange-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-orange-600 text-xl">
                          Order {order.order_number}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(order.order_status)} flex items-center gap-1`}>
                          {getStatusIcon(order.order_status)}
                          <span className="capitalize">{order.order_status.replace('_', ' ')}</span>
                        </Badge>
                        <p className="text-lg font-bold text-orange-600 mt-2">
                          ₱{order.total_amount}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Order Items</h4>
                        <div className="space-y-2">
                          {order.order_items?.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                              <div>
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-gray-600">
                                  Qty: {item.quantity} × ₱{item.price}
                                </p>
                              </div>
                              <p className="font-semibold text-orange-600">₱{item.subtotal}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Details */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Order Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="font-medium capitalize">{order.payment_method}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Status:</span>
                            <Badge variant="outline" className="text-xs">
                              {order.payment_status}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Delivery Address:</span>
                            <span className="font-medium text-right max-w-48">
                              {order.delivery_address}, {order.delivery_city} {order.delivery_zip_code}
                            </span>
                          </div>
                          {order.notes && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Notes:</span>
                              <span className="font-medium text-right max-w-48">{order.notes}</span>
                            </div>
                          )}
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>₱{order.subtotal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery Fee:</span>
                            <span>₱{order.delivery_fee}</span>
                          </div>
                          <div className="flex justify-between font-semibold text-base">
                            <span>Total:</span>
                            <span className="text-orange-600">₱{order.total_amount}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {order.order_status === 'delivered' && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-medium">Order Delivered</span>
                        </div>
                        {order.delivered_at && (
                          <p className="text-sm text-green-600 mt-1">
                            Delivered on {new Date(order.delivered_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-orange-300 text-orange-600 hover:bg-orange-50"
              size="lg"
            >
              <Link href="/menu">Order More Food 🍜</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders