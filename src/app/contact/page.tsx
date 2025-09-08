"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information 정보 누락",
        description: "Please fill in all required fields. 필수 항목을 모두 입력해 주세요.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Message Sent! 메시지 전송 완료!",
          description: data.message || "Thank you for contacting us. We'll get back to you within 24 hours. 연락해 주셔서 감사합니다!",
          action: <CheckCircle className="h-5 w-5 text-green-500" />,
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        toast({
          title: "Error 오류",
          description: data.message || "Failed to send message. Please try again. 메시지 전송에 실패했습니다.",
          variant: "destructive",
          action: <AlertCircle className="h-5 w-5 text-red-500" />,
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast({
        title: "Connection Error 연결 오류",
        description: "Unable to send message. Please check your connection and try again. 연결을 확인하고 다시 시도해 주세요.",
        variant: "destructive",
        action: <AlertCircle className="h-5 w-5 text-red-500" />,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-orange-200 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-red-200 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border-2 border-yellow-200 rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 border-2 border-orange-200 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            연락하기{" "}
            <span className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">Contact</span>{" "}
            Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our menu or want to make a reservation? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-orange-200/50 hover:border-orange-300/70">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2 text-gray-800">Visit Us</h3>
                  <p className="text-sm text-gray-600">
                    123 Korean Street
                    <br />
                    Food District
                    <br />
                    City, State 12345
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-red-200/50 hover:border-red-300/70">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-red-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2 text-gray-800">Call Us</h3>
                  <p className="text-sm text-gray-600">
                    (555) 123-OPPA
                    <br />
                    (555) 123-6772
                    <br />
                    Available daily
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-yellow-200/50 hover:border-yellow-300/70">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2 text-gray-800">Email Us</h3>
                  <p className="text-sm text-gray-600">
                    hello@opparestaurant.com
                    <br />
                    reservations@opparestaurant.com
                    <br />
                    We respond within 24hrs
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-orange-200/50 hover:border-orange-300/70">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2 text-gray-800">Hours</h3>
                  <p className="text-sm text-gray-600">
                    Mon-Thu: 11AM-9PM
                    <br />
                    Fri-Sat: 11AM-10PM
                    <br />
                    Sunday: 12PM-8PM
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Special Information */}
            <Card className="bg-gradient-to-br from-orange-100/80 via-red-100/80 to-yellow-100/80 backdrop-blur-sm border-orange-200/50">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">예약 및 이벤트 Reservations & Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">Table Reservations</h4>
                  <p className="text-sm text-gray-600">
                    For parties of 6 or more, we recommend making a reservation. Call us at (555) 123-OPPA or use our
                    online booking system.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Private Events</h4>
                  <p className="text-sm text-gray-600">
                    We cater private events and parties! Contact us for custom menu options and pricing for your special
                    occasion.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-600 mb-2">Delivery & Takeout</h4>
                  <p className="text-sm text-gray-600">
                    Order online for delivery or pickup. Delivery available within a 5-mile radius with a $25 minimum
                    order.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">메시지 보내기 Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    Name * 이름
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your name"
                    required
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 h-12 text-base"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    Email * 이메일
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

                <div>
                  <Label htmlFor="phone" className="text-gray-700">
                    Phone 전화번호
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
                  <Label htmlFor="subject" className="text-gray-700">
                    Subject 제목
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="What's this about?"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 h-12 text-base"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700">
                    Message * 메시지
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 resize-none text-base min-h-[200px]"
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 h-12 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending... 전송 중...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      보내기 Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <Card className="mt-12 bg-white/80 backdrop-blur-sm border-orange-200/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">찾아오시는 길 Find Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg h-64 flex items-center justify-center border border-orange-200/50">
              <div className="text-center text-gray-600">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-orange-500" />
                <p className="font-medium">Interactive map would be displayed here</p>
                <p className="text-sm">123 Korean Street, Food District</p>
                <p className="text-xs text-gray-500 mt-2">Google Maps integration coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}