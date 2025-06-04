"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Users,
  ShoppingBag,
  Package,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  Bell,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

interface Product {
  _id: string
  images: string[]
  genericName: string
  brandName: string
  originalPrice: number
  discountPrice: number
  category: string
  stock: number
  sales: number
  model: string
  color: string
  weight: string
  variants: { key: string; value: string }[]
  description: string
  reviews: { rating: number; comment: string; user: string }[]
  status: string
  createdAt: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    brandName: "",
    genericName: "",
    model: "",
    category: "",
  })
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ""

  const fetchRecentProducts = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/product/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      if (data.success) {
        setProducts(data.products || [])
      } else {
        console.error("AdminProducts - Failed to fetch products:", data.message)
        setError(data.message || "Failed to fetch products")
      }
    } catch (err) {
      console.error("AdminProducts - Error fetching products:", err)
      setError("Error fetching products")
    }
  }, [BASE_URL])

  const fetchFilteredProducts = async () => {
    try {
      const query = new URLSearchParams({
        brandName: filters.brandName,
        genericName: filters.genericName,
        model: filters.model,
        category: filters.category,
      }).toString()
      const response = await fetch(`${BASE_URL}/api/product/filter?${query}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      if (data.success) {
        setProducts(data.products || [])
      } else {
        console.error("AdminProducts - Failed to fetch filtered products:", data.message)
        setError(data.message || "Failed to fetch filtered products")
      }
    } catch (err) {
      console.error("AdminProducts - Error fetching filtered products:", err)
      setError("Error fetching filtered products")
    }
  }

  useEffect(() => {
    fetchRecentProducts()
  }, [BASE_URL, fetchRecentProducts])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchFilteredProducts()
  }

  const handleClearFilters = () => {
    setFilters({ brandName: "", genericName: "", model: "", category: "" })
    fetchRecentProducts()
  }

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product)
    setIsProductDialogOpen(true)
  }

  const approveProduct = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/product/${productId}/verify`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "active" }),
      })
      const data = await response.json()
      if (data.success) {
        setProducts((prev) => prev.filter((product) => product._id !== productId))
        setIsProductDialogOpen(false)
        alert("Product Verified Successfully!")
      } else {
        console.error("AdminProducts - Failed to approve product:", data.message)
        setError(data.message || "Failed to approve product")
      }
    } catch (err) {
      console.error("AdminProducts - Error approving product:", err)
      setError("Error approving product")
    }
  }

  const rejectProduct = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/product/${productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      if (data.success) {
        setProducts((prev) => prev.filter((product) => product._id !== productId))
        setIsProductDialogOpen(false)
      } else {
        console.error("AdminProducts - Failed to reject product:", data.message)
        setError(data.message || "Failed to reject product")
      }
    } catch (err) {
      console.error("AdminProducts - Error rejecting product:", err)
      setError("Error rejecting product")
    }
  }

  return (
    <div className="flex h-screen bg-muted/30">
      <div className="hidden md:flex w-64 flex-col bg-card border-r h-full">
        <div className="p-4 border-b">
          <h2 className="font-bold text-xl">Admin Dashboard</h2>
        </div>
        <div className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted"
            >
              <Users className="mr-3 h-5 w-5" />
              Verifications
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground"
            >
              <ShoppingBag className="mr-3 h-5 w-5" />
              Products
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted"
            >
              <Package className="mr-3 h-5 w-5" />
              Orders
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted"
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Analytics
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/auth/login">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center md:hidden">
              <Button variant="outline" size="icon">
                <span className="sr-only">Open menu</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              <h2 className="ml-2 font-semibold">Admin Dashboard</h2>
            </div>
            <div className="flex-1 flex justify-center px-2 md:ml-6 md:justify-end">
              <div className="max-w-lg w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input type="search" placeholder="Search..." className="pl-10 w-full md:w-60 lg:w-80" />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 dx-icon" />
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      A
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Admin User</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage and filter products</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filter Products</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFilterSubmit} className="grid md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="brandName" className="text-sm text-muted-foreground">
                    Brand Name
                  </label>
                  <Input
                    id="brandName"
                    name="brandName"
                    value={filters.brandName}
                    onChange={handleFilterChange}
                    placeholder="Enter brand name"
                  />
                </div>
                <div>
                  <label htmlFor="genericName" className="text-sm text-muted-foreground">
                    Product Name
                  </label>
                  <Input
                    id="genericName"
                    name="genericName"
                    value={filters.genericName}
                    onChange={handleFilterChange}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label htmlFor="model" className="text-sm text-muted-foreground">
                    Model
                  </label>
                  <Input
                    id="model"
                    name="model"
                    value={filters.model}
                    onChange={handleFilterChange}
                    placeholder="Enter model"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="text-sm text-muted-foreground">
                    Category
                  </label>
                  <Input
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    placeholder="Enter category"
                  />
                </div>
                <div className="md:col-span-4 flex gap-4">
                  <Button type="submit" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">ID</th>
                        <th className="px-4 py-3 text-left font-medium">Brand</th>
                        <th className="px-4 py-3 text-left font-medium">Name</th>
                        <th className="px-4 py-3 text-left font-medium">Price</th>
                        <th className="px-4 py-3 text-left font-medium">Category</th>
                        <th className="px-4 py-3 text-left font-medium">Model</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id} className="border-b">
                          <td className="px-4 py-3">{product._id.slice(0, 6)}</td>
                          <td className="px-4 py-3">{product.brandName}</td>
                          <td className="px-4 py-3">{product.genericName}</td>
                          <td className="px-4 py-3">₹{product.discountPrice.toFixed(2)}</td>
                          <td className="px-4 py-3">{product.category}</td>
                          <td className="px-4 py-3">{product.model}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => viewProductDetails(product)}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600"
                                onClick={() => approveProduct(product._id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="sr-only">Approve</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600"
                                onClick={() => rejectProduct(product._id)}
                              >
                                <XCircle className="h-4 w-4" />
                                <span className="sr-only">Reject</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Verification Details</DialogTitle>
            <DialogDescription>Review product information and details</DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Product Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">ID</p>
                    <p className="font-medium">{selectedProduct._id.slice(0, 6)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Brand Name</p>
                    <p className="font-medium">{selectedProduct.brandName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedProduct.genericName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Original Price</p>
                      <p className="font-medium">₹{selectedProduct.originalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Discount Price</p>
                      <p className="font-medium">₹{selectedProduct.discountPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Model</p>
                    <p className="font-medium">{selectedProduct.model}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Stock</p>
                      <p className="font-medium">{selectedProduct.stock}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sales</p>
                      <p className="font-medium">{selectedProduct.sales}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={selectedProduct.status === "active" ? "default" : "outline"}>
                      {selectedProduct.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Additional Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Color</p>
                      <p className="font-medium">{selectedProduct.color}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Weight</p>
                      <p className="font-medium">{selectedProduct.weight}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Variants</p>
                    <ul className="list-disc pl-5">
                      {selectedProduct.variants.map((variant, index) => (
                        <li key={index} className="text-sm">
                          {variant.key}: {variant.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Description</p>
                    <p className="font-medium">{selectedProduct.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Reviews</p>
                    {selectedProduct.reviews.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {selectedProduct.reviews.map((review, index) => (
                          <li key={index} className="text-sm">
                            {review.user}: {review.comment} (Rating: {review.rating}/5)
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm">No reviews yet</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Images</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.images.map((image, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <Image
                        src={image || "https://example.com/100x200.png"}
                        alt={`Product Image ${index + 1}`}
                        width={100}
                        height={200}
                        style={{ width: '100px', height: '200px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3 flex justify-end gap-4 mt-4">
                <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                  Close
                </Button>
                <Button variant="destructive" onClick={() => rejectProduct(selectedProduct._id)}>
                  Reject
                </Button>
                <Button onClick={() => approveProduct(selectedProduct._id)}>
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}