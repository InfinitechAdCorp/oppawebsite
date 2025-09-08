import { type NextRequest, NextResponse } from "next/server"

const LARAVEL_API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function GET(request: NextRequest) {
  try {
    const authToken = request.headers.get("Authorization")

    if (!authToken) {
      return NextResponse.json({ success: false, message: "Authorization token required" }, { status: 401 })
    }

    const url = new URL(request.url)
    const searchParams = url.searchParams

    // Fixed: removed double /api/
    const laravelUrl = new URL(`${LARAVEL_API_BASE}/api/orders`)
    searchParams.forEach((value, key) => {
      laravelUrl.searchParams.append(key, value)
    })

    console.log("Fetching from:", laravelUrl.toString()) // Debug log

    const response = await fetch(laravelUrl.toString(), {
      method: "GET",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Laravel API error:", data) // Debug log
      return NextResponse.json(
        { success: false, message: data.message || "Failed to fetch orders" },
        { status: response.status },
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authToken = request.headers.get("Authorization")

    if (!authToken) {
      return NextResponse.json({ success: false, message: "Authorization token required" }, { status: 401 })
    }

    const body = await request.json()

    // Fixed: removed double /api/
    const response = await fetch(`${LARAVEL_API_BASE}/api/orders`, {
      method: "POST",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Laravel API error:", data) // Debug log
      return NextResponse.json(
        { success: false, message: data.message || "Failed to create order", errors: data.errors },
        { status: response.status },
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
