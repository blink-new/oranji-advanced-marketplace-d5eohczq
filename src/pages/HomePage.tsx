import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Star, Users, ShoppingBag, TrendingUp, Smartphone, Car, Shirt, Home, Briefcase, Heart, Dumbbell, Wrench } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import blink from '../blink/client'
import { User } from '../App'

interface HomePageProps {
  user: User | null
}

interface Category {
  id: string
  name: string
  icon: string
  count: number
}

interface Listing {
  id: string
  title: string
  price: number
  location: string
  images: string[]
  sellerName: string
  sellerPlan: string
  createdAt: string
}

export default function HomePage({ user }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const loadData = async () => {
    try {
      // Load categories
      const categoriesData = await blink.db.categories.list({
        orderBy: { name: 'asc' }
      })
      setCategories(categoriesData)

      // Load featured listings (mock data for now)
      setFeaturedListings([
        {
          id: '1',
          title: 'iPhone 14 Pro Max - Like New',
          price: 850000,
          location: 'Lagos, Nigeria',
          images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'],
          sellerName: 'John Adebayo',
          sellerPlan: 'premium',
          createdAt: '2024-01-20'
        },
        {
          id: '2',
          title: 'Toyota Camry 2020 - Excellent Condition',
          price: 12500000,
          location: 'Abuja, Nigeria',
          images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400'],
          sellerName: 'Sarah Okafor',
          sellerPlan: 'premium_pro',
          createdAt: '2024-01-19'
        },
        {
          id: '3',
          title: 'Designer Handbag Collection',
          price: 45000,
          location: 'Accra, Ghana',
          images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'],
          sellerName: 'Ama Asante',
          sellerPlan: 'standard',
          createdAt: '2024-01-18'
        },
        {
          id: '4',
          title: '3 Bedroom Apartment for Rent',
          price: 2500000,
          location: 'Cape Town, South Africa',
          images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],
          sellerName: 'David Mthembu',
          sellerPlan: 'premium',
          createdAt: '2024-01-17'
        }
      ])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const getCategoryIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      smartphone: Smartphone,
      car: Car,
      shirt: Shirt,
      home: Home,
      briefcase: Briefcase,
      heart: Heart,
      dumbbell: Dumbbell,
      wrench: Wrench
    }
    const IconComponent = icons[iconName] || ShoppingBag
    return <IconComponent className="w-8 h-8" />
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'standard':
        return <Badge className="seller-badge-standard">Standard</Badge>
      case 'premium':
        return <Badge className="seller-badge-premium">Premium</Badge>
      case 'premium_pro':
        return <Badge className="seller-badge-premium-pro">Premium Pro</Badge>
      default:
        return null
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="oranji-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Buy & Sell Anything
              <br />
              <span className="text-orange-200">Across Africa</span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Join millions of buyers and sellers on Africa's largest online marketplace. 
              From Nigeria to Ghana to South Africa - find what you need, sell what you have.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input
                  type="text"
                  placeholder="Search for cars, phones, fashion, property..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-32 py-4 text-lg border-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-300"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/browse">
                <Button size="lg" variant="outline" className="bg-white text-orange-600 border-white hover:bg-orange-50">
                  Browse Listings
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={user ? "/dashboard" : "/signup"}>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                  {user ? "Go to Dashboard" : "Start Selling"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">2M+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">500K+</div>
              <div className="text-gray-600">Listings</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">3</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover millions of items across all categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                to={`/browse?category=${category.name}`}
                className="group"
              >
                <Card className="hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                      {getCategoryIcon(category.icon)}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count || 0} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/browse">
              <Button variant="outline" size="lg">
                View All Categories
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Listings
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked items from trusted sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing) => (
              <Link key={listing.id} to={`/listing/${listing.id}`} className="group">
                <Card className="hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {listing.title}
                    </h3>
                    <p className="text-2xl font-bold text-orange-600 mb-2">
                      {formatPrice(listing.price)}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">{listing.location}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-orange-600">
                            {listing.sellerName.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700">{listing.sellerName}</span>
                      </div>
                      {getPlanBadge(listing.sellerPlan)}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/browse">
              <Button size="lg" className="oranji-gradient text-white">
                View All Listings
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Oranji Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, safe, and secure trading across Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Browse & Search</h3>
              <p className="text-gray-600">
                Find exactly what you're looking for with our powerful search and filtering tools. 
                Browse by category, location, or price range.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Connect & Chat</h3>
              <p className="text-gray-600">
                Contact sellers directly via WhatsApp. Ask questions, negotiate prices, 
                and arrange meetings safely.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Buy & Sell</h3>
              <p className="text-gray-600">
                Complete your transaction safely. Rate your experience and build trust 
                within our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 oranji-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join millions of users buying and selling on Africa's most trusted marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="outline" className="bg-white text-orange-600 border-white hover:bg-orange-50">
                <ShoppingBag className="mr-2 w-5 h-5" />
                Start Selling Today
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white border-2 border-orange-600">
                <TrendingUp className="mr-2 w-5 h-5" />
                Browse Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}