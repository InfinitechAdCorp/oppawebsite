"use client"
import {
  Home,
  Package,
  Megaphone,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Flame,
  TrendingUp,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

// Navigation items
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
    color: "text-orange-600",
    bgColor: "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50",
  },
  {
    title: "Products",
    icon: Package,
    color: "text-red-600",
    bgColor: "hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50",
    items: [
      {
        title: "All Products",
        url: "/admin/product",
      },
      {
        title: "Categories",
        url: "/admin/categories",
      },
    ],
  },
  {
    title: "Orders",
    url: "/admin/order",
    icon: ShoppingCart,
    color: "text-orange-600",
    bgColor: "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50",
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: Users,
    color: "text-red-600",
    bgColor: "hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50",
  },
  {
    title: "Announcements",
    url: "/admin/announcements",
    icon: Megaphone,
    color: "text-orange-600",
    bgColor: "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50",
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: BarChart3,
    color: "text-red-600",
    bgColor: "hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50",
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
    color: "text-orange-600",
    bgColor: "hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    router.push("/login")
  }

  return (
    <Sidebar className="border-r border-orange-100">
      <SidebarContent className="bg-gradient-to-b from-orange-50 via-red-50 to-orange-50">
        <SidebarGroup>
          <div className="px-4 py-6 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg mx-3 mt-3 mb-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <SidebarGroupLabel className="text-white font-bold text-lg">Restaurant Admin</SidebarGroupLabel>
                <p className="text-orange-100 text-xs">Management Portal</p>
              </div>
            </div>
          </div>

          <SidebarGroupContent className="px-2">
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`${item.bgColor} transition-all duration-200 rounded-lg mx-1 group hover:shadow-sm`}
                        >
                          <item.icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform`} />
                          <span className="font-medium">{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 text-gray-400" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-6 mt-1">
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                                className="hover:bg-orange-100 rounded-md transition-colors"
                              >
                                <Link href={subItem.url} className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                  {subItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className={`${item.bgColor} transition-all duration-200 rounded-lg mx-1 group hover:shadow-sm ${
                        pathname === item.url
                          ? "bg-gradient-to-r from-red-100 to-orange-100 border-l-4 border-red-500"
                          : ""
                      }`}
                    >
                      <Link href={item.url || "#"} className="flex items-center gap-3">
                        <item.icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform`} />
                        <span className="font-medium">{item.title}</span>
                        {pathname === item.url && <TrendingUp className="ml-auto h-4 w-4 text-red-500" />}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 bg-gradient-to-r from-red-50 to-orange-50 border-t border-orange-200">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-gradient-to-r hover:from-red-100 hover:to-orange-100 transition-all duration-200 rounded-lg group"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2 text-red-500 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
