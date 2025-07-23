import { ShoppingBag, Users, Globe, Shield, Heart, Zap } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="oranji-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-5xl font-bold">
              <span className="text-white">Ora</span><span className="text-orange-200">nji</span>
            </h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Africa's Leading Online Marketplace
          </h2>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Connecting millions of buyers and sellers across Nigeria, Ghana, and South Africa. 
            We're building the future of commerce in Africa, one transaction at a time.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize commerce across Africa by providing a safe, accessible, and 
              efficient platform for everyone to buy and sell.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Empowering Communities
                </h3>
                <p className="text-gray-600">
                  We believe in empowering local communities by providing them with the tools 
                  and platform to grow their businesses and reach new customers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Trust & Safety
                </h3>
                <p className="text-gray-600">
                  Security and trust are at the core of everything we do. We implement 
                  robust verification systems and safety measures to protect our users.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Pan-African Vision
                </h3>
                <p className="text-gray-600">
                  Starting with Nigeria, Ghana, and South Africa, we're building a 
                  continent-wide marketplace that connects all of Africa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Oranji was born from a simple observation: Africa needed a marketplace 
                  that truly understood the unique needs and challenges of African commerce. 
                  Traditional e-commerce platforms weren't built with African users in mind.
                </p>
                <p>
                  Founded in 2023, we set out to create something different. A platform that 
                  embraces local payment methods, understands cultural nuances, and provides 
                  the flexibility that African entrepreneurs need to thrive.
                </p>
                <p>
                  Today, we're proud to serve millions of users across three countries, 
                  facilitating thousands of transactions daily, and helping small businesses 
                  grow into successful enterprises.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                alt="African marketplace"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-orange-500 bg-opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community First</h3>
              <p className="text-gray-600">
                We prioritize the needs of our community above all else, ensuring every 
                decision benefits our users.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600">
                We operate with complete transparency and honesty in all our interactions 
                and business practices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to provide better solutions and stay ahead of 
                our users' evolving needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Inclusivity</h3>
              <p className="text-gray-600">
                We believe in creating opportunities for everyone, regardless of background 
                or circumstances.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pan-African Unity</h3>
              <p className="text-gray-600">
                We're committed to breaking down barriers and connecting African markets 
                across borders.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our platform and customer 
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions, suggestions, or want to partner with us? We'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
                <p className="text-gray-600">hello@oranji.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
                <p className="text-gray-600">support@oranji.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Partnerships</h3>
                <p className="text-gray-600">partners@oranji.com</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Our Offices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
              <div>
                <p className="font-medium">🇳🇬 Lagos, Nigeria</p>
                <p className="text-sm">Victoria Island</p>
              </div>
              <div>
                <p className="font-medium">🇬🇭 Accra, Ghana</p>
                <p className="text-sm">East Legon</p>
              </div>
              <div>
                <p className="font-medium">🇿🇦 Cape Town, South Africa</p>
                <p className="text-sm">V&A Waterfront</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 oranji-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Oranji Community
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Be part of Africa's fastest-growing marketplace. Start buying and selling today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-orange-600 border-white hover:bg-orange-50">
              Start Selling
            </Button>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white border-2 border-orange-600">
              Browse Listings
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}