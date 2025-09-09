"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MoreHorizontal,
  Eye,
  Plus,
  Search,
  Loader2,
  ArrowUpDown,
  Edit,
  Trash2,
  Upload,
  Flame,
  Leaf,
  Star,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

// Product data type
interface Product {
  id: number
  name: string
  description: string
  price: number | string // Allow both number and string from API
  image: string
  category: string
  is_spicy?: boolean
  is_vegetarian?: boolean
  is_featured?: boolean
  created_at: string
  updated_at: string
}

const categories = [
  "Appetizers",
  "Main Course",
  "Desserts",
  "Beverages",
  "Korean BBQ",
  "Noodles",
  "Rice Dishes",
  "Soups",
]

// Helper function to get valid image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) {
    return "/placeholder-food.jpg" // Fallback image
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath
  }

  // If it's a relative path, construct the full URL with Laravel public path
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  // Handle Laravel storage path - if it doesn't start with images/products/, add it
  let fullPath = imagePath
  if (!imagePath.startsWith("images/products/")) {
    fullPath = `images/products/${imagePath}`
  }

  return `${API_BASE_URL}/${fullPath}`
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // DataTable states
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState("")

  // State for mobile detection
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Create product modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newFormData, setNewFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    is_spicy: false,
    is_vegetarian: false,
    is_featured: false,
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const [deletingId, setDeletingId] = useState<number | null>(null)

  // Helper function to safely convert price to number
  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === "string" ? Number.parseFloat(price) : price
    return numPrice.toFixed(2)
  }

  // Handle form changes
  const handleNewFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, value: boolean) => {
    setNewFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setNewFormData((prev) => ({ ...prev, category: value }))
  }

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Create product
  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      const formData = new FormData()
      formData.append("name", newFormData.name)
      formData.append("description", newFormData.description)
      formData.append("price", newFormData.price)
      formData.append("category", newFormData.category)
      formData.append("is_spicy", newFormData.is_spicy.toString())
      formData.append("is_vegetarian", newFormData.is_vegetarian.toString())
      formData.append("is_featured", newFormData.is_featured.toString())

      if (selectedImage) {
        formData.append("image", selectedImage)
      }

      const response = await fetch("/api/product", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || "Failed to create product.")
      }

      toast({
        title: "Success",
        description: "Product created successfully!",
      })

      setIsCreateModalOpen(false)
      resetForm()
      fetchProducts()
    } catch (error: any) {
      console.error("Error creating product:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "There was an error creating the product.",
      })
    } finally {
      setIsCreating(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setNewFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      is_spicy: false,
      is_vegetarian: false,
      is_featured: false,
    })
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Delete product
  const handleDelete = async (id: number) => {
    setDeletingId(id)
    try {
      const response = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || "Failed to delete product.")
      }
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      })
      fetchProducts()
    } catch (error: any) {
      console.error("Error deleting product:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "There was an error deleting the product.",
      })
    } finally {
      setDeletingId(null)
    }
  }

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/product")
      const result = await response.json()
      if (response.ok) {
        setProducts(result)
      } else {
        throw new Error(result.message || "Failed to fetch products")
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load products",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Define columns for DataTable
  const columns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={getImageUrl(row.original.image) || "/placeholder.svg"}
            alt={row.original.name}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-normal"
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="min-w-0">
          <div className="font-semibold text-gray-900 truncate">{row.original.name}</div>
          <div className="text-xs text-gray-500 sm:hidden truncate">{row.original.category}</div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-normal hidden sm:flex"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge variant="outline" className="text-xs hidden sm:inline-flex">
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-normal"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-semibold text-middle">₱{formatPrice(row.original.price)}</div>,
    },
    {
      accessorKey: "properties",
      header: "Properties",
      cell: ({ row }) => (
        <div className="flex gap-1 flex-wrap">
          {row.original.is_featured && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0 bg-yellow-100 text-yellow-800">
              <Star className="w-3 h-3 sm:mr-1" />
              <span className="hidden sm:inline">Featured</span>
            </Badge>
          )}
          {row.original.is_spicy && (
            <Badge variant="destructive" className="text-xs px-1.5 py-0">
              <Flame className="w-3 h-3 sm:mr-1" />
              <span className="hidden sm:inline">Spicy</span>
            </Badge>
          )}
          {row.original.is_vegetarian && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0 bg-green-100 text-green-800">
              <Leaf className="w-3 h-3 sm:mr-1" />
              <span className="hidden sm:inline">Veg</span>
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-normal hidden lg:flex"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-sm hidden lg:block">
          {new Date(row.original.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original
        return (
          <div className="flex items-center gap-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProduct(product)}
                  className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-2"
                >
                  <Eye className="h-4 w-4" />
                  <span className="ml-1 sr-only sm:not-sr-only hidden sm:inline">View</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                {selectedProduct && (
                  <>
                    <SheetHeader>
                      <SheetTitle>Product Details</SheetTitle>
                      <SheetDescription>Complete information for this product</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <div className="flex justify-center mb-6">
                        <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                          <Image
                            src={getImageUrl(selectedProduct.image) || "/placeholder.svg"}
                            alt={selectedProduct.name}
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Product Name</Label>
                            <p className="text-lg font-semibold">{selectedProduct.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Category</Label>
                            <Badge variant="outline" className="text-sm">
                              {selectedProduct.category}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Price</Label>
                            <p className="text-xl font-bold text-green-600">₱{formatPrice(selectedProduct.price)}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Properties</Label>
                            <div className="flex gap-2 mt-1 flex-wrap">
                              {selectedProduct.is_featured && (
                                <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                              {selectedProduct.is_spicy && (
                                <Badge variant="destructive" className="text-xs">
                                  <Flame className="w-3 h-3 mr-1" />
                                  Spicy
                                </Badge>
                              )}
                              {selectedProduct.is_vegetarian && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  <Leaf className="w-3 h-3 mr-1" />
                                  Vegetarian
                                </Badge>
                              )}
                              {!selectedProduct.is_featured && !selectedProduct.is_spicy && !selectedProduct.is_vegetarian && (
                                <span className="text-sm text-gray-500">None</span>
                              )}
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Created On</Label>
                            <p className="text-sm">
                              {new Date(selectedProduct.created_at).toLocaleDateString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                            <p className="text-sm">
                              {new Date(selectedProduct.updated_at).toLocaleDateString("en-US", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-500">Description</Label>
                        <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                          {selectedProduct.description}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push(`/admin/product/${product.id}`)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Product
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Trash2 className="text-red-600 focus:text-red-600 mr-2 h-4 w-4" />
                      Delete Product
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the product "{product.name}" and
                        remove it from the system.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deletingId === product.id ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          "Delete Product"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  // Initialize table instance
  const table = useReactTable({
    data: products,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
  })

  if (loading) {
    return (
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex min-h-screen w-full bg-gradient-to-br from-orange-50 to-red-50">
          <AppSidebar />
          <div className={`flex-1 min-w-0 ${isMobile ? "ml-0" : "ml-72"}`}>
            <div className="flex items-center justify-center min-h-screen w-full">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg">
                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                <span className="text-gray-700 font-medium">Loading products...</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-orange-50 to-red-50">
        <AppSidebar />
        <div className={`flex-1 min-w-0 ${isMobile ? "ml-0" : "ml-72"}`}>
          {isMobile && (
            <div className="sticky top-0 z-50 flex h-12 items-center gap-2 border-b bg-white/90 backdrop-blur-sm px-4 md:hidden shadow-sm">
              <SidebarTrigger className="-ml-1" />
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Products
              </span>
            </div>
          )}
          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
            <div className="max-w-full space-y-4 sm:space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Products Management
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">
                    Manage your restaurant menu items with style
                  </p>
                </div>
              </div>

              {/* Filters and Search */}
              <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-orange-100">
                <CardHeader className="pb-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                        <Input
                          placeholder="Search products..."
                          value={globalFilter || ""}
                          onChange={(event) => setGlobalFilter(event.target.value)}
                          className="pl-9 pr-3 py-2 w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 focus:border-white/50 transition-all duration-200"
                        />
                      </div>

                      {/* Create Product button */}
                      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="shrink-0 bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">Add Product</span>
                            <span className="sm:hidden">Add</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto mx-4 bg-gradient-to-br from-orange-50 to-red-50">
                          <DialogHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 -m-6 mb-4 rounded-t-lg">
                            <DialogTitle className="text-xl font-bold">Add New Product</DialogTitle>
                            <DialogDescription className="text-orange-100">
                              Fill in the details for your new menu item.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleCreateSubmit} className="space-y-6 py-4">
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <Label htmlFor="name" className="text-gray-700 font-medium">
                                  Product Name
                                </Label>
                                <Input
                                  id="name"
                                  name="name"
                                  value={newFormData.name}
                                  onChange={handleNewFormChange}
                                  required
                                  disabled={isCreating}
                                  placeholder="e.g., Kimchi Fried Rice"
                                  className="mt-1 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                />
                              </div>

                              <div>
                                <Label htmlFor="description" className="text-gray-700 font-medium">
                                  Description
                                </Label>
                                <Textarea
                                  id="description"
                                  name="description"
                                  value={newFormData.description}
                                  onChange={handleNewFormChange}
                                  required
                                  rows={3}
                                  disabled={isCreating}
                                  placeholder="Describe the dish, ingredients, and preparation..."
                                  className="mt-1 resize-none border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="price" className="text-gray-700 font-medium">
                                    Price (₱)
                                  </Label>
                                  <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={newFormData.price}
                                    onChange={handleNewFormChange}
                                    required
                                    disabled={isCreating}
                                    placeholder="0.00"
                                    className="mt-1 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor="category" className="text-gray-700 font-medium">
                                    Category
                                  </Label>
                                  <Select
                                    value={newFormData.category}
                                    onValueChange={handleCategoryChange}
                                    disabled={isCreating}
                                  >
                                    <SelectTrigger className="mt-1 border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                          {category}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="image" className="text-gray-700 font-medium">
                                  Product Image
                                </Label>
                                <div className="flex items-center gap-4 mt-1">
                                  <Input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    disabled={isCreating}
                                    className="flex-1 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isCreating}
                                    size="sm"
                                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                                  >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Browse
                                  </Button>
                                </div>
                                {imagePreview && (
                                  <div className="mt-3">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-orange-200 shadow-md">
                                      <Image
                                        src={imagePreview || "/placeholder.svg"}
                                        alt="Preview"
                                        width={80}
                                        height={80}
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2 p-3 border-2 border-orange-200 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                                  <Switch
                                    id="is_featured"
                                    checked={newFormData.is_featured}
                                    onCheckedChange={(checked) => handleSwitchChange("is_featured", checked)}
                                    disabled={isCreating}
                                  />
                                  <Label
                                    htmlFor="is_featured"
                                    className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium"
                                  >
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    Featured
                                  </Label>
                                </div>

                                <div className="flex items-center space-x-2 p-3 border-2 border-orange-200 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                                  <Switch
                                    id="is_spicy"
                                    checked={newFormData.is_spicy}
                                    onCheckedChange={(checked) => handleSwitchChange("is_spicy", checked)}
                                    disabled={isCreating}
                                  />
                                  <Label
                                    htmlFor="is_spicy"
                                    className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium"
                                  >
                                    <Flame className="w-4 h-4 text-red-500" />
                                    Spicy
                                  </Label>
                                </div>

                                <div className="flex items-center space-x-2 p-3 border-2 border-orange-200 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                                  <Switch
                                    id="is_vegetarian"
                                    checked={newFormData.is_vegetarian}
                                    onCheckedChange={(checked) => handleSwitchChange("is_vegetarian", checked)}
                                    disabled={isCreating}
                                  />
                                  <Label
                                    htmlFor="is_vegetarian"
                                    className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium"
                                  >
                                    <Leaf className="w-4 h-4 text-green-500" />
                                    Vegetarian
                                  </Label>
                                </div>
                              </div>
                            </div>

                            <DialogFooter className="gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  setIsCreateModalOpen(false)
                                  resetForm()
                                }}
                                disabled={isCreating}
                                className="flex-1 sm:flex-none border-orange-300 text-orange-600 hover:bg-orange-50"
                              >
                                Cancel
                              </Button>
                              <Button
                                type="submit"
                                disabled={isCreating}
                                className="flex-1 sm:flex-none bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg"
                              >
                                {isCreating ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                  </>
                                ) : (
                                  "Create Product"
                                )}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-sm text-gray-600 mb-4 font-medium">
                    Showing {table.getFilteredRowModel().rows.length} of {products.length} products
                  </div>
                  <div className="w-full">
                    <div className="rounded-lg border border-orange-200 overflow-hidden shadow-lg">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                          <thead className="bg-gradient-to-r from-orange-100 to-red-100">
                            <tr className="border-b border-orange-200">
                              {table.getHeaderGroups().map((headerGroup) =>
                                headerGroup.headers.map((header) => (
                                  <th
                                    key={header.id}
                                    className="text-left p-3 sm:p-4 text-sm font-semibold text-gray-700 tracking-wide"
                                  >
                                    {header.isPlaceholder ? null : (
                                      <div className="flex items-center gap-2">
                                        {typeof header.column.columnDef.header === "function"
                                          ? header.column.columnDef.header(header.getContext())
                                          : header.column.columnDef.header}
                                      </div>
                                    )}
                                  </th>
                                )),
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {table.getRowModel().rows.map((row, index) => (
                              <tr
                                key={row.id}
                                className={`border-b border-orange-100 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-200 ${index % 2 === 0 ? "bg-white" : "bg-orange-25"}`}
                              >
                                {row.getVisibleCells().map((cell) => (
                                  <td key={cell.id} className="p-3 sm:p-4 text-sm">
                                    {typeof cell.column.columnDef.cell === "function"
                                      ? cell.column.columnDef.cell(cell.getContext())
                                      : (cell.getValue() as React.ReactNode)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {table.getRowModel().rows.length === 0 && (
                      <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-orange-200 mt-4">
                        <div className="bg-gradient-to-r from-orange-100 to-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="w-8 h-8 text-orange-500" />
                        </div>
                        <p className="text-lg font-medium text-gray-700">No products found</p>
                        {globalFilter && <p className="text-sm mt-1 text-gray-500">Try adjusting your search terms</p>}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}