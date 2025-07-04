"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { SocialIcon } from "react-social-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock list of institutes (replace with actual data)
const institutes = [
  { id: "1", name: "Indian Institute of Technology, Delhi" },
  { id: "2", name: "University of Mumbai" },
  { id: "3", name: "Jawaharlal Nehru University" },
  { id: "4", name: "Anna University" },
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
  const [adminUserId, setAdminUserId] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [adminError, setAdminError] = useState("")
  const [isTncDialogOpen, setIsTncDialogOpen] = useState(true)
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const [formData, setFormData] = useState({
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
    console.log("RegisterPage - Current state:", { step, role, otpSent, otp, mobileError, emailError, adminError, isTncDialogOpen, formData })
  }, [step, role, otpSent, otp, mobileError, emailError, adminError, isTncDialogOpen, formData])

  interface ValidateMobileResult {
    isValid: boolean;
    errorMessage: string;
  }

  const validateMobile = (mobile: string): ValidateMobileResult => {
    const regex = /^\d{10}$/;
    if (!regex.test(mobile)) {
      setMobileError("Please enter a valid 10-digit mobile number");
      return { isValid: false, errorMessage: "Invalid mobile number" };
    }
    setMobileError("");
    return { isValid: true, errorMessage: "" };
  };

  const validateEmail = (email: string) => {
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

  const handleAdminUserIdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAdminUserId(e.target.value)
    setAdminError("")
  }

  const handleAdminPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAdminPassword(e.target.value)
    setAdminError("")
  }

  const handleAdminLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: adminUserId, password: adminPassword }),
      })
      const data = await response.json()
      console.log("RegisterPage - Admin login response:", data)

      if (!data.success) {
        setAdminError(data.message || "Admin login failed")
        return
      }

      localStorage.setItem("token", data.token)
      console.log("RegisterPage - Admin login successful for userId:", adminUserId)
      setAdminError("")
      router.push("/admin/dashboard")
    } catch (err) {
      console.error("RegisterPage - Error admin login:", err)
      setAdminError("Error signing in as admin")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const data = await response.json()
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
                        <Button asChild>
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
                        <Button
                          type="submit"
                          disabled={
                            !formData.institute ||
                            !formData.email ||
                            !formData.idCardFront ||
                            !formData.idCardBack ||
                            !!mobileError ||
                            !!emailError
                          }
                        >
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
                    <div className="space-y-2">
                      <Label htmlFor="admin-userid">User ID</Label>
                      <Input
                        id="admin-userid"
                        placeholder="Enter admin user ID"
                        className="block focus:ring-2 focus:ring-blue-500"
                        value={adminUserId}
                        onChange={handleAdminUserIdChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="Enter password"
                        className="block focus:ring-2 focus:ring-blue-500"
                        value={adminPassword}
                        onChange={handleAdminPasswordChange}
                      />
                    </div>
                    {adminError && <p className="text-sm text-red-600">{adminError}</p>}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    disabled={!adminUserId || !adminPassword}
                    onClick={handleAdminLogin}
                  >
                    Login as Admin
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </ErrorBoundary>
      </div>

      <Dialog open={isTncDialogOpen} onOpenChange={setIsTncDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader className="relative">
            <DialogTitle className="text-lg">Terms and Conditions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>Above 12 Years of Age</li>
              <li>From a School, College or University Recognised by Central or State Governments of India</li>
              <li>T&C are subject to change with the brand choice</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="telegram"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://t.me/classyfyed', '_blank', 'noopener,noreferrer')}
              />
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="instagram"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://www.instagram.com/classyfyed.in/', '_blank', 'noopener,noreferrer')}
              />
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="facebook"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://www.facebook.com/classyfyed.in/', '_blank', 'noopener,noreferrer')}
              />
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="whatsapp"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://whatsapp.com/channel/0029Vb7xJATJpe8jQSk5dQ1f', '_blank', 'noopener,noreferrer')}
              />
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="twitter"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://x.com/_Classyfyed', '_blank', 'noopener,noreferrer')}
              />
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="youtube"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://www.youtube.com/channel/UC5X542lwTzQPN1qMbcdnXMg', '_blank', 'noopener,noreferrer')}
              />
              <SocialIcon
                bgColor="transparent"
                fgColor="blue"
                network="reddit"
                style={{ width: '2rem', height: '2rem' }}
                className="w-6 h-6 sm:w-8 sm:h-8"
                onClick={() => window.open('https://www.reddit.com/user/classyfyed/', '_blank', 'noopener,noreferrer')}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}