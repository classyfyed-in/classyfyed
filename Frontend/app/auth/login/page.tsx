"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function LoginPage() {
  const [otpSent, setOtpSent] = useState(false)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [adminUserId, setAdminUserId] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  const handleSendOtp = async () => {
    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/users/email/${encodeURIComponent(email)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      console.log("LoginPage - Fetched user by email:", data)

      if (!data.success) {
        setDialogMessage("User not registered or rejected")
        setDialogOpen(true)
        return
      }

      const { user } = data
      if (!user.isVerified) {
        setDialogMessage("Verification still pending")
        setDialogOpen(true)
        return
      }

      // User is verified, proceed with OTP
      setOtpSent(true)
      setError("")
      console.log("LoginPage - OTP sent (hardcoded: 1234)")
    } catch (err) {
      console.error("LoginPage - Error fetching user:", err)
      setError("Error checking user status")
    }
  }

  const handleSignIn = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })
      const data = await response.json()
      console.log("LoginPage - Sign-in response:", data)

      if (!data.success) {
        setError(data.message || "Login failed")
        return
      }

      localStorage.setItem("token", data.token)
      console.log("LoginPage - Login successful for email:", email)
      setError("")
      router.push("/user/dashboard")
    } catch (err) {
      console.error("LoginPage - Error signing in:", err)
      setError("Error signing in")
    }
  }

  const handleAdminLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: adminUserId, password: adminPassword }),
      })
      const data = await response.json()
      console.log("LoginPage - Admin login response:", data)

      if (!data.success) {
        setError(data.message || "Admin login failed")
        return
      }

      localStorage.setItem("token", data.token)
      console.log("LoginPage - Admin login successful for userId:", adminUserId)
      setError("")
      router.push("/admin/dashboard")
    } catch (err) {
      console.error("LoginPage - Error admin login:", err)
      setError("Error signing in as admin")
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
    setError("")
  }

  const handleAdminUserIdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAdminUserId(e.target.value)
    setError("")
  }

  const handleAdminPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAdminPassword(e.target.value)
    setError("")
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOtp(e.target.value)
    setError("")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Link href="/" className="inline-flex items-center mb-8 text-sm font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="mx-auto max-w-5xl">
        <Tabs defaultValue="student" className="w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Sign In to Your Account</h1>
            <p className="text-muted-foreground">Access your account to view exclusive discounts</p>
          </div>

          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="student">Student / Faculty</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>Student / Faculty Login</CardTitle>
                <CardDescription>Sign in with your Email</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={handleEmailChange}
                        title="Please enter a valid email address"
                      />
                      <Button onClick={handleSendOtp} disabled={otpSent}>
                        {otpSent ? "Resend" : "Send OTP"}
                      </Button>
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                  </div>

                  {otpSent && (
                    <div className="space-y-2">
                      <Label htmlFor="otp">OTP Verification</Label>
                      <Input
                        id="otp"
                        placeholder="Enter OTP sent to your email"
                        value={otp}
                        onChange={handleOtpChange}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full" disabled={!otpSent || !otp} onClick={handleSignIn}>
                  Sign In
                </Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/register" className="text-blue-600 hover:underline">
                    Register now
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Sign in with your admin credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-userid">User ID</Label>
                    <Input
                      id="admin-userid"
                      placeholder="Enter admin user ID"
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
                      value={adminPassword}
                      onChange={handleAdminPasswordChange}
                    />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
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
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verification Status</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}