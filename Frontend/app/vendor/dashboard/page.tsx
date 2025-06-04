"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  ChevronDown,
  LogOut,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Tag,
  Trash2,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

// Updated product interface
interface Product {
  id: number
  images: string[]
  genericName: string
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
  status: "active" | "pending" | "inactive"
}

// Updated mock data with brandName as "TechGadgets India" and variants as key-value pairs
const vendorProducts: Product[] = [
  {
    id: 1,
    images: ["https://placehold.co/100x100"],
    genericName: "Noise-Cancelling Headphones",
    originalPrice: 249.99,
    discountPrice: 129.99,
    category: "Electronics",
    stock: 45,
    sales: 128,
    model: "AudioPro X1",
    color: "Black",
    weight: "250g",
    variants: [],
    description: "High-quality noise-cancelling headphones with 20-hour battery life.",
    reviews: [{ rating: 4, comment: "Great sound quality!", user: "Rahul" }],
    status: "active",
  },
  {
    id: 2,
    images: ["https://placehold.co/100x200"],
    genericName: "Ultrabook Laptop",
    originalPrice: 1299.99,
    discountPrice: 899.99,
    category: "Electronics",
    stock: 100,
    sales: 32,
    model: "UltraSlim 14",
    color: "Silver",
    weight: "1.2kg",
    variants: [
      { key: "RAM", value: "16GB" },
      { key: "Storage", value: "512GB SSD" },
      { key: "RAM", value: "8GB" },
      { key: "Storage", value: "256GB SSD" },
    ],
    description: "Powerful ultrabook with 14-inch display and fast SSD.",
    reviews: [{ rating: 5, comment: "Amazing performance!", user: "Priya" }],
    status: "active",
  },
  {
    id: 3,
    images: ["https://placehold.co/100x100"],
    genericName: "Design Software Subscription",
    originalPrice: 199.99,
    discountPrice: 99.99,
    category: "Software & Subscriptions",
    stock: 999,
    sales: 256,
    model: "DesignPro 2023",
    color: "",
    weight: "N/A",
    variants: [],
    description: "Annual subscription for professional design software.",
    reviews: [{ rating: 4, comment: "Very user-friendly.", user: "Amit" }],
    status: "active",
  },
  {
    id: 4,
    images: ["https://placehold.co/100x100"],
    genericName: "Fitness Tracker",
    originalPrice: 99.99,
    discountPrice: 59.99,
    category: "Electronics",
    stock: 78,
    sales: 0,
    model: "FitPulse",
    color: "Blue",
    weight: "30g",
    variants: [],
    description: "Smart fitness tracker with heart rate and sleep monitoring.",
    reviews: [],
    status: "pending",
  },
  {
    id: 5,
    images: ["https://placehold.co/100x100"],
    genericName: "Wireless Earbuds",
    originalPrice: 149.99,
    discountPrice: 79.99,
    category: "Electronics",
    stock: 34,
    sales: 89,
    model: "Earbuds Pro",
    color: "White",
    weight: "50g",
    variants: [],
    description: "True wireless earbuds with superior sound quality.",
    reviews: [{ rating: 3, comment: "Good but battery life could be better.", user: "Sneha" }],
    status: "active",
  },
]

// Mock data for orders (unchanged)
const vendorOrders = [
  { id: "ORD-001", customer: "Rahul Sharma", date: "2023-05-15T10:30:00", total: 129.99, status: "delivered", items: 1 },
  { id: "ORD-002", customer: "Priya Patel", date: "2023-05-14T14:20:00", total: 899.99, status: "shipped", items: 1 },
  { id: "ORD-003", customer: "Amit Kumar", date: "2023-05-13T09:15:00", total: 159.98, status: "processing", items: 2 },
  { id: "ORD-004", customer: "Sneha Gupta", date: "2023-05-12T16:45:00", total: 59.99, status: "delivered", items: 1 },
  { id: "ORD-005", customer: "Vikram Singh", date: "2023-05-11T11:30:00", total: 179.98, status: "cancelled", items: 2 },
]

export default function VendorDashboard() {
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({})
  const [variantInputs, setVariantInputs] = useState<{ key: string; value: string }[]>([{ key: "", value: "" }])
  const [currentSection, setCurrentSection] = useState(1)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const VENDOR_NAME = "TechGadgets India"
  const VENDOR_MOBILE = "9392267649"

  const handleAddProductInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewProduct((prev) => ({ ...prev, [id]: value }))
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }))
    }
  }

  const handleAddProductSelect = (value: string, field: string) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleVariantChange = (index: number, field: "key" | "value", value: string) => {
    const updatedVariants = [...variantInputs]
    updatedVariants[index] = { ...updatedVariants[index], [field]: value }
    setVariantInputs(updatedVariants)
  }

  const addVariant = () => {
    setVariantInputs((prev) => [...prev, { key: "", value: "" }])
  }

  const removeVariant = (index: number) => {
    setVariantInputs((prev) => prev.filter((_, i) => i !== index))
  }

  const validateSection = (section: number): boolean => {
    const newErrors: { [key: string]: string } = {}
    if (section === 1) {
      if (!newProduct.genericName) newErrors.genericName = "Generic Name is required"
      if (!newProduct.category) newErrors.category = "Category is required"
      if (!newProduct.originalPrice) newErrors.originalPrice = "Original Price is required"
      if (!newProduct.discountPrice) newErrors.discountPrice = "Discount Price is required"
      if (!newProduct.stock) newErrors.stock = "Stock Quantity is required"
    } else if (section === 2) {
      if (!newProduct.model) newErrors.model = "Model is required"
    } else if (section === 3) {
      if (!newProduct.images || newProduct.images.length === 0) newErrors.images = "At least one Image URL is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection((prev) => prev + 1)
    }
  }

  const handleBackSection = () => {
    setCurrentSection((prev) => prev - 1)
    setErrors({})
  }

  const handleAddProductSubmit = () => {
    if (validateSection(currentSection)) {
      setNewProduct((prev) => ({
        ...prev,
        brandName: VENDOR_NAME,
        variants: variantInputs.filter((v) => v.key && v.value),
        images: prev.images || ["https://placehold.co/100x100"],
        reviews: [],
        status: "pending",
      }))

    try {
      const response = fetch(`${BASE_URL}/api/product/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...newProduct, brandName: VENDOR_NAME, mobile: VENDOR_MOBILE})
      })

      console.log(response);

    } catch(e) {
      console.error("Error", e);
    }

      setIsAddProductDialogOpen(false)
      setIsConfirmationDialogOpen(true)
      setCurrentSection(1)
    }
  }

  const handleConfirmAddProduct = () => {
    console.log("New Product Added:", JSON.stringify(newProduct, null, 2))
    alert("Product Added Successfully!")
    setIsConfirmationDialogOpen(false)
    setNewProduct({})
    setVariantInputs([{ key: "", value: "" }])
  }

  const handleEditProduct = () => {
    setIsConfirmationDialogOpen(false)
    setIsAddProductDialogOpen(true)
  }

  const handleCancel = () => {
    setIsAddProductDialogOpen(false)
    setNewProduct({})
    setVariantInputs([{ key: "", value: "" }])
    setCurrentSection(1)
    setErrors({})
  }

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r h-full">
        <div className="p-4 border-b">
          <h2 className="font-bold text-xl">Vendor Dashboard</h2>
        </div>
        <div className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            <Link
              href="/vendor/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground"
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/vendor/products"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted"
            >
              <ShoppingBag className="mr-3 h-5 w-5" />
              Products
            </Link>
            <Link
              href="/vendor/orders"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted"
            >
              <Package className="mr-3 h-5 w-5" />
              Orders
            </Link>
            <Link
              href="/vendor/customers"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted"
            >
              <Users className="mr-3 h-5 w-5" />
              Customers
            </Link>
            <Link
              href="/vendor/settings"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-muted"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/vendor/login">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-card border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center md:hidden">
              <Button variant="outline" size="icon">
                <span className="sr-only">Open menu</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              <h2 className="ml-2 font-semibold">Vendor Dashboard</h2>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      V
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>TechGadgets India</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, TechGadgets India</p>
          </div>
          <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new product to your store (Step {currentSection} of 3)
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  {currentSection === 1 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Basic Information & Pricing</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="genericName">Generic Name *</Label>
                          <Input
                            id="genericName"
                            placeholder="Enter generic name"
                            onChange={handleAddProductInput}
                            value={newProduct.genericName || ""}
                          />
                          {errors.genericName && <p className="text-sm text-red-600">{errors.genericName}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Select onValueChange={(value) => handleAddProductSelect(value, "category")} value={newProduct.category || ""}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="electronics">Electronics</SelectItem>
                              <SelectItem value="books">Books & Stationery</SelectItem>
                              <SelectItem value="software">Software & Subscriptions</SelectItem>
                              <SelectItem value="fashion">Fashion</SelectItem>
                              <SelectItem value="lifestyle">Lifestyle</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="originalPrice">Original Price (₹) *</Label>
                            <Input
                              id="originalPrice"
                              type="number"
                              placeholder="0.00"
                              onChange={handleAddProductInput}
                              value={newProduct.originalPrice || ""}
                            />
                            {errors.originalPrice && <p className="text-sm text-red-600">{errors.originalPrice}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="discountPrice">Discount Price (₹) *</Label>
                            <Input
                              id="discountPrice"
                              type="number"
                              placeholder="0.00"
                              onChange={handleAddProductInput}
                              value={newProduct.discountPrice || ""}
                            />
                            {errors.discountPrice && <p className="text-sm text-red-600">{errors.discountPrice}</p>}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stock">Stock Quantity *</Label>
                          <Input
                            id="stock"
                            type="number"
                            placeholder="0"
                            onChange={handleAddProductInput}
                            value={newProduct.stock || ""}
                          />
                          {errors.stock && <p className="text-sm text-red-600">{errors.stock}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Enter product description"
                            rows={4}
                            onChange={handleAddProductInput}
                            value={newProduct.description || ""}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {currentSection === 2 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Product Specifications</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="model">Model *</Label>
                          <Input
                            id="model"
                            placeholder="Enter model"
                            onChange={handleAddProductInput}
                            value={newProduct.model || ""}
                          />
                          {errors.model && <p className="text-sm text-red-600">{errors.model}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="color">Color</Label>
                          <Input
                            id="color"
                            placeholder="Enter color (if applicable)"
                            onChange={handleAddProductInput}
                            value={newProduct.color || ""}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight</Label>
                          <Input
                            id="weight"
                            placeholder="Enter weight (e.g., 250g, N/A)"
                            onChange={handleAddProductInput}
                            value={newProduct.weight || ""}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {currentSection === 3 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Images & Variants</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="images">Image URLs (comma-separated) *</Label>
                          <Input
                            id="images"
                            placeholder="Enter image URLs"
                            onChange={(e) =>
                              setNewProduct((prev) => ({ ...prev, images: e.target.value.split(",").map((url) => url.trim()) }))
                            }
                            value={newProduct.images?.join(", ") || ""}
                          />
                          {errors.images && <p className="text-sm text-red-600">{errors.images}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Variants</Label>
                          {variantInputs.map((variant, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                              <Input
                                placeholder="Key (e.g., RAM)"
                                value={variant.key}
                                onChange={(e) => handleVariantChange(index, "key", e.target.value)}
                              />
                              <Input
                                placeholder="Value (e.g., 8GB)"
                                value={variant.value}
                                onChange={(e) => handleVariantChange(index, "value", e.target.value)}
                              />
                              <Button variant="ghost" size="icon" onClick={() => removeVariant(index)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" onClick={addVariant}>
                            Add Variant
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter className="pt-4">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  {currentSection > 1 && (
                    <Button variant="outline" onClick={handleBackSection}>
                      Back
                    </Button>
                  )}
                  {currentSection < 3 ? (
                    <Button onClick={handleNextSection}>Next</Button>
                  ) : (
                    <Button onClick={handleAddProductSubmit}>Submit</Button>
                  )}
                </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
            <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full overflow-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">Confirm Product Details</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Review the product details below before adding to your store.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  {/* Basic Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">Brand Name</Label>
                        <p className="text-base">{VENDOR_NAME}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">Generic Name</Label>
                        <p className="text-base">{newProduct.genericName || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                        <p className="text-base">{newProduct.category || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">Model</Label>
                        <p className="text-base">{newProduct.model || "N/A"}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pricing */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">Pricing</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">Original Price</Label>
                        <p className="text-base font-semibold">₹{Number(newProduct.originalPrice || 0).toFixed(2)}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">Discount Price</Label>
                        <p className="text-base font-semibold text-green-600">₹{Number(newProduct.discountPrice || 0).toFixed(2)}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Inventory */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">Inventory</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">Stock</Label>
                        <p className="text-base">{newProduct.stock || "0"}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">Color</Label>
                        <p className="text-base">{newProduct.color || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm font-medium text-muted-foreground">Weight</Label>
                        <p className="text-base">{newProduct.weight || "N/A"}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Media & Variants */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">Media & Variants</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">Images</Label>
                        {newProduct.images && newProduct.images.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {newProduct.images.map((url, index) => (
                              <a
                                key={index}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-20 h-20 bg-muted rounded-md overflow-hidden hover:opacity-80 transition-opacity"
                              >
                                <Image
                                  src={url}
                                  alt={`Product image ${index + 1}`}
                                  width={400}
                                  height={400}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.outerHTML = `<div class="w-full h-full flex items-center justify-center bg-muted"><span class="text-xs text-muted-foreground">Image unavailable</span></div>`
                                  }}
                                />
                              </a>
                            ))}
                          </div>
                        ) : (
                          <p className="text-base text-muted-foreground">N/A</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">Variants</Label>
                        {newProduct.variants && newProduct.variants.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Key</TableHead>
                                <TableHead>Value</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {newProduct.variants.map((variant, index) => (
                                <TableRow key={index}>
                                  <TableCell>{variant.key}</TableCell>
                                  <TableCell>{variant.value}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <p className="text-base text-muted-foreground">N/A</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">Product Description</Label>
                        <div className="text-base whitespace-pre-wrap border rounded-md p-3 bg-muted/50">
                          {newProduct.description || "N/A"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <DialogFooter className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={() => setIsConfirmationDialogOpen(false)}>
                    Cancel
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={handleEditProduct}>
                      Edit
                    </Button>
                    <Button onClick={handleConfirmAddProduct} className="bg-primary hover:bg-primary/90">
                      Add Product
                    </Button>
                  </div>
                </DialogFooter>
            </DialogContent>
          </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                    <h3 className="text-2xl font-bold mt-1">₹24,567</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                    <h3 className="text-2xl font-bold mt-1">156</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Products</p>
                    <h3 className="text-2xl font-bold mt-1">32</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Customers</p>
                    <h3 className="text-2xl font-bold mt-1">1,245</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="products" className="mb-6">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Products</CardTitle>
                  <CardDescription>Manage your product listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-2 text-left font-medium">Brand</th>
                            <th className="px-4 py-2 text-left font-medium">Product</th>
                            <th className="px-4 py-2 text-left font-medium">Category</th>
                            <th className="px-4 py-2 text-left font-medium">Price</th>
                            <th className="px-4 py-2 text-left font-medium">Stock</th>
                            <th className="px-4 py-2 text-left font-medium">Status</th>
                            <th className="px-4 py-2 text-right font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vendorProducts.map((product) => (
                            <tr key={product.id} className="border-b">
                              <td className="px-4 py-2">{VENDOR_NAME}</td>
                              <td className="px-4 py-2">{product.genericName}</td>
                              <td className="px-4 py-2">{product.category}</td>
                              <td className="px-4 py-2">
                                <div className="flex flex-col">
                                  <span>₹{product.discountPrice.toFixed(2)}</span>
                                  <span className="text-xs text-muted-foreground line-through">
                                    ₹{product.originalPrice.toFixed(2)}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-2">{product.stock}</td>
                              <td className="px-4 py-2">
                                <Badge
                                  variant={product.status === "active" ? "default" : "secondary"}
                                  className={product.status === "pending" ? "bg-amber-600 hover:bg-amber-700" : ""}
                                >
                                  {product.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-2 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Settings className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
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
            </TabsContent>
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>View and manage your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-2 text-left font-medium">Order ID</th>
                            <th className="px-4 py-2 text-left font-medium">Customer</th>
                            <th className="px-4 py-2 text-left font-medium">Date</th>
                            <th className="px-4 py-2 text-left font-medium">Price</th>
                            <th className="px-4 py-2 text-left font-medium">Status</th>
                            <th className="px-4 py-2 text-right font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vendorOrders.map((order) => (
                            <tr key={order.id} className="border-b">
                              <td className="px-4 py-2 font-medium">{order.id}</td>
                              <td className="px-4 py-2">{order.customer}</td>
                              <td className="px-4 py-2">
                                {new Date(order.date).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </td>
                              <td className="px-4 py-2">₹{order.total.toFixed(2)}</td>
                              <td className="px-4 py-2">
                                <Badge
                                  variant="outline"
                                  className={
                                    order.status === "delivered"
                                      ? "bg-green-500 hover:bg-green-600 text-white"
                                      : order.status === "shipped"
                                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                                        : order.status === "processing"
                                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                                          : "bg-red-500 hover:bg-red-600 text-white"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-2 text-right">
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}