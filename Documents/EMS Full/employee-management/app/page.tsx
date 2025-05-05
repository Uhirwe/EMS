import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, Clock, Users, Building, Calendar, CreditCard, Shield, Zap, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black via-gray-900 to-black">
      <header className="sticky top-0 z-50 w-full border-b border-yellow-600 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-bold text-yellow-500">EmpTrack</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/auth/login" className="text-sm font-medium text-gray-200 hover:text-yellow-400">
              Login
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-yellow-500">
                    Digital Employee Management Made Simple
                  </h1>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Streamline your workforce management with our comprehensive platform. Track performance, manage schedules, and boost productivity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/signup">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full min-[400px]:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" className="border-yellow-600 text-yellow-500 hover:bg-gray-900 hover:text-yellow-400 hover:border-yellow-400 w-full min-[400px]:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 p-8">
                  <div className="absolute inset-0 rounded-full border border-yellow-500/20" />
                  <div className="absolute inset-4 rounded-full border border-yellow-500/10" />
                  <div className="absolute inset-8 rounded-full border border-yellow-500/5" />
                  <div className="flex h-full w-full items-center justify-center">
                    <Shield className="h-32 w-32 text-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-500">
                  Powerful Features for Modern Management
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to manage your workforce effectively
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-yellow-600 bg-black/50 p-6 shadow-lg">
                <Users className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold text-yellow-500">Employee Management</h3>
                <p className="text-gray-300 text-center">
                  Comprehensive employee profiles and management tools
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-yellow-600 bg-black/50 p-6 shadow-lg">
                <BarChart3 className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold text-yellow-500">Performance Tracking</h3>
                <p className="text-gray-300 text-center">
                  Monitor and analyze employee performance metrics
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-yellow-600 bg-black/50 p-6 shadow-lg">
                <Clock className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-bold text-yellow-500">Time Management</h3>
                <p className="text-gray-300 text-center">
                  Efficient scheduling and attendance tracking
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-500">
                  Why Choose EmpTrack?
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of managers who trust our platform
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-yellow-600 bg-black/50 p-6 shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                  <CheckCircle2 className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-yellow-500">Easy to Use</h3>
                <p className="text-gray-300 text-center">
                  Intuitive interface designed for managers
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-yellow-600 bg-black/50 p-6 shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                  <Shield className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-yellow-500">Secure & Reliable</h3>
                <p className="text-gray-300 text-center">
                  Enterprise-grade security for your data
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border border-yellow-600 bg-black/50 p-6 shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-yellow-500">Fast & Efficient</h3>
                <p className="text-gray-300 text-center">
                  Optimized for quick decision-making
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-500">
                  Ready to Get Started?
                </h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of managers who trust EmpTrack
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/signup">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full min-[400px]:w-auto">
                    Sign Up Now
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" className="border-yellow-600 text-yellow-500 hover:bg-gray-900 hover:text-yellow-400 hover:border-yellow-400 w-full min-[400px]:w-auto">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-yellow-600 bg-black">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-yellow-500" />
            <span className="text-lg font-bold text-yellow-500">EmpTrack</span>
          </div>
          <p className="text-center text-sm text-gray-400 md:text-left">
            © 2024 EmpTrack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
