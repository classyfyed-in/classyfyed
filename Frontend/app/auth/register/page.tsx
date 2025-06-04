"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock list of institutes (replace with actual data)
const institutes = [
  { id: "inst_1", name: "Keshav Memorial Institute of Technology (KMIT)" },
  { id: "inst_2", name: "Neil Gogte Institute of Technology (NGIT)" },
  { id: "inst_3", name: "KMCE" },
  { id: "inst_4", name: "KMEC" },
  { id: "inst_5", name: "IIT Hyderabad" },
  { id: "inst_6", name: "IIIT Hyderabad"},
  { id: "inst_7", name: "VNR VJIET"},
  { id: "inst_8", name: "VASAVI"}
]

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    setHasError(false)
  }, [children])
  if (hasError) {
    return <div className="text-red-600 text-center">Error rendering form. Check console for details.</div>
  }
  try {
    return children
  } catch (error) {
    console.error("Error in RegisterPage:", error)
    setHasError(true)
    return null
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole] = useState("STUDENT")
  const [step, setStep] = useState(1)
  const [otpSent] = useState(true) // Always show OTP input
  const [otp, setOtp] = useState("")
  const [mobileError, setMobileError] = useState("")
  const [emailError, setEmailError] = useState("")
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const [formData, setFormData] = useState<{
    institute: string;
    name: string;
    instituteId: string;
    mobile: string;
    email: string;
    gender: string;
    dob: string;
    stream: string;
    branch: string;
    currentYear: string;
    passoutYear: string;
    idCardFront: string;
    idCardBack: string;
    driveLink: string;
  }>({
    institute: "",
    name: "",
    instituteId: "",
    mobile: "",
    email: "",
    gender: "",
    dob: "",
    stream: "",
    branch: "",
    currentYear: "",
    passoutYear: "",
    idCardFront: "",
    idCardBack: "",
    driveLink: "",
  })

  useEffect(() => {
    console.log("RegisterPage - Current state:", { step, role, otpSent, otp, mobileError, emailError, formData })
  }, [step, role, otpSent, otp, mobileError, emailError, formData])

  const validateMobile = (mobile: string): boolean => {
    const regex = /^\d{10}$/
    if (!regex.test(mobile)) {
      setMobileError("Please enter a valid 10-digit mobile number")
      return false
    }
    setMobileError("")
    return true
  }

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  const handleNextStep = () => {
    if (otp !== "1234") {
      console.log("RegisterPage - Invalid OTP:", otp)
      return
    }
    if (!validateMobile(formData.mobile) || !validateEmail(formData.email)) return
    console.log("RegisterPage - Moving to step", step + 1)
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    console.log("RegisterPage - Moving to step", step - 1)
    setStep(step - 1)
  }

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { id: keyof typeof formData; value: string };
  }

  const handleInputChange = (e: InputChangeEvent) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    if (id === "mobile") {
      validateMobile(value)
    }
    if (id === "email") {
      validateEmail(value)
    }
  }

  interface HandleSelectChange {
    (key: keyof typeof formData): (value: string) => void;
  }

  const handleSelectChange: HandleSelectChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  interface SubmitResponse {
    success: boolean;
    message?: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!validateMobile(formData.mobile) || !validateEmail(formData.email)) {
      console.log("RegisterPage - Invalid mobile number or email")
      return
    }
    if (!formData.institute || !formData.name || !formData.instituteId || !formData.email || !formData.idCardFront || !formData.idCardBack) {
      console.log("RegisterPage - Missing required fields")
      return
    }
    if (role === "STUDENT" && (!formData.stream || !formData.branch || !formData.currentYear || !formData.passoutYear)) {
      console.log("RegisterPage - Missing student-specific fields")
      return
    }
    console.log("RegisterPage - Submitting form:", JSON.stringify({ ...formData, role }, null, 2))
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      })
      const data: SubmitResponse = await response.json()
      if (data.success) {
        console.log("RegisterPage - Registration successful")
        router.push("/auth/login")
      } else {
        console.error("RegisterPage - Registration failed:", data.message)
      }
    } catch (error) {
      console.error("RegisterPage - Error submitting form:", error)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-[1200px]">
      <style jsx>{`
        input {
          display: block !important;
          outline: 1px solid blue !important;
          visibility: visible !important;
        }
      `}</style>
      <Link href="/" className="inline-flex items-center mb-8 text-sm font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="mx-auto max-w-5xl">
        <ErrorBoundary>
          <Tabs defaultValue="student" className="w-full">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
              <p className="text-muted-foreground">Join thousands of students enjoying exclusive discounts</p>
            </div>

            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="student">Student / Faculty</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <Card className="mx-auto max-w-2xl">
                <CardHeader>
                  <CardTitle>Register as Student or Faculty</CardTitle>
                  <CardDescription>Create an account to access exclusive student discounts</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    {step === 1 && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="institute">Institute Name</Label>
                          <Select onValueChange={handleSelectChange("institute")} value={formData.institute}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your institute" />
                            </SelectTrigger>
                            <SelectContent>
                              {institutes.map((inst) => (
                                <SelectItem key={inst.id} value={inst.name}>
                                  {inst.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Role</Label>
                          <RadioGroup defaultValue="STUDENT" onValueChange={setRole}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="STUDENT" id="student" />
                              <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="FACULTY" id="faculty" />
                              <Label htmlFor="faculty">Faculty / Staff</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name (as per college ID)</Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="instituteId">{role === "STUDENT" ? "Institute Roll Number" : "Employee ID"}</Label>
                          <Input
                            id="instituteId"
                            placeholder={role === "STUDENT" ? "Enter your roll number" : "Enter your employee ID"}
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.instituteId}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile Number</Label>
                          <div className="flex-1">
                            <Input
                              id="mobile"
                              placeholder="Enter your 10-digit mobile number"
                              className="block focus:ring-2 focus:ring-blue-500"
                              value={formData.mobile}
                              onChange={handleInputChange}
                            />
                            {mobileError && (
                              <p className="text-red-600 text-sm mt-1">{mobileError}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="flex-1">
                            <Input
                              id="email"
                              placeholder="Enter your email address"
                              className="block focus:ring-2 focus:ring-blue-500"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {emailError && (
                              <p className="text-red-600 text-sm mt-1">{emailError}</p>
                            )}
                          </div>
                        </div>

                        {otpSent && (
                          <div className="space-y-2">
                            <Label htmlFor="otp">OTP Verification</Label>
                            <Input
                              id="otp"
                              placeholder="Enter OTP (use 1234)"
                              className="block focus:ring-2 focus:ring-blue-500"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select onValueChange={handleSelectChange("gender")}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input
                            id="dob"
                            type="date"
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.dob}
                            onChange={handleInputChange}
                          />
                        </div>

                        {role === "STUDENT" && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="stream">Stream</Label>
                              <Select onValueChange={handleSelectChange("stream")}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select stream" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="engineering">Engineering</SelectItem>
                                  <SelectItem value="science">Science</SelectItem>
                                  <SelectItem value="arts">Arts</SelectItem>
                                  <SelectItem value="commerce">Commerce</SelectItem>
                                  <SelectItem value="medicine">Medicine</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="branch">Branch</Label>
                              <Input
                                id="branch"
                                placeholder="Enter your branch"
                                className="block focus:ring-2 focus:ring-blue-500"
                                value={formData.branch}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="currentYear">Current Year of Study</Label>
                              <Select onValueChange={handleSelectChange("currentYear")}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1st Year</SelectItem>
                                  <SelectItem value="2">2nd Year</SelectItem>
                                  <SelectItem value="3">3rd Year</SelectItem>
                                  <SelectItem value="4">4th Year</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="passoutYear">Passout Year</Label>
                              <Select onValueChange={handleSelectChange("passoutYear")}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select passout year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 10 }, (_, i) => {
                                    const year = new Date().getFullYear() + i
                                    return (
                                      <SelectItem key={year} value={year.toString()}>
                                        {year}
                                      </SelectItem>
                                    )
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="idCardFront">ID Card Front (Google Drive Link)</Label>
                          <Input
                            id="idCardFront"
                            placeholder="Enter Google Drive link for ID card front"
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.idCardFront}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="idCardBack">ID Card Back (Google Drive Link)</Label>
                          <Input
                            id="idCardBack"
                            placeholder="Enter Google Drive link for ID card back"
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.idCardBack}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="driveLink">Additional Google Drive Link (Optional)</Label>
                          <Input
                            id="driveLink"
                            placeholder="Enter additional Google Drive link"
                            className="block focus:ring-2 focus:ring-blue-500"
                            value={formData.driveLink}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between mt-4">
                    {step === 1 ? (
                      <div className="flex w-full justify-between">
                        <Button  asChild>
                          <Link href="/auth/login">Already have an account? Sign In</Link>
                        </Button>
                        <Button
                          onClick={handleNextStep}
                          disabled={!otpSent || otp !== "1234" || !!mobileError || !!emailError}
                        >
                          Next
                        </Button>
                      </div>
                    ) : (
                      <div className="flex w-full justify-between">
                        <Button variant="outline" onClick={handlePrevStep}>
                          Previous
                        </Button>
                        <Button type="submit" disabled={!formData.institute || !formData.email || !formData.idCardFront || !formData.idCardBack || !!mobileError || !!emailError}>
                          Register
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card className="mx-auto max-w-md">
                <CardHeader>
                  <CardTitle>Admin Login</CardTitle>
                  <CardDescription>
                    Admins can only login. Please contact support if you need admin access.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2 bilim">
                      <Label htmlFor="admin-userid">User ID</Label>
                      <Input id="admin-userid" placeholder="Enter admin user ID" className="block focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input id="admin-password" type="password" placeholder="Enter password" className="block focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Login as Admin</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </ErrorBoundary>
      </div>
    </div>
  )
}