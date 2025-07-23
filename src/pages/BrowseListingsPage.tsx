import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Filter, Grid, List, MapPin, Calendar, MessageCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Slider } from '../components/ui/slider'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import blink from '../blink/client'
import { User } from '../App'

interface BrowseListingsPageProps {
  user: User | null
}

interface Listing {
  id: string
  title: string
  description: string
  price: number
  category: string
  location: string
  images: string[]
  sellerName: string
  sellerPlan: string
  whatsappNumber: string
  createdAt: string
  status: string
}

interface Category {
  id: string
  name: string
  icon: string
}

interface Location {
  id: string
  name: string
  type: string
}

export default function BrowseListingsPage({ user }: BrowseListingsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [listings, setListings] = useState<Listing[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [sortBy, setSortBy] = useState('newest')

  const loadData = async () => {
    try {
      // Load categories
      const categoriesData = await blink.db.categories.list({
        orderBy: { name: 'asc' }
      })
      setCategories(categoriesData)

      // Load locations (states)
      const locationsData = await blink.db.locations.list({
        where: { type: 'state' },
        orderBy: { name: 'asc' }
      })
      setLocations(locationsData)

      // Load mock listings for now
      setListings([
        {
          id: '1',
          title: 'iPhone 14 Pro Max - Like New',
          description: 'Barely used iPhone 14 Pro Max in excellent condition. Comes with original box and accessories.',
          price: 850000,
          category: 'Electronics',
          location: 'Lagos, Nigeria',
          images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'],
          sellerName: 'John Adebayo',
          sellerPlan: 'premium',
          whatsappNumber: '+234 801 234 5678',
          createdAt: '2024-01-20',
          status: 'active'
        },
        {
          id: '2',
          title: 'Toyota Camry 2020 - Excellent Condition',
          description: 'Well maintained Toyota Camry with low mileage. Perfect for family use.',
          price: 12500000,
          category: 'Vehicles',
          location: 'Abuja, Nigeria',
          images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400'],
          sellerName: 'Sarah Okafor',
          sellerPlan: 'premium_pro',
          whatsappNumber: '+234 802 345 6789',
          createdAt: '2024-01-19',
          status: 'active'
        },
        {
          id: '3',
          title: 'Designer Handbag Collection',
          description: 'Authentic designer handbags in various styles and colors. Perfect for fashion lovers.',
          price: 45000,
          category: 'Fashion',
          location: 'Accra, Ghana',
          images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'],
          sellerName: 'Ama Asante',
          sellerPlan: 'standard',
          whatsappNumber: '+233 24 123 4567',
          createdAt: '2024-01-18',
          status: 'active'
        },
        {
          id: '4',
          title: '3 Bedroom Apartment for Rent',
          description: 'Modern 3 bedroom apartment in a secure estate. Fully furnished with modern amenities.',
          price: 2500000,
          category: 'Property',
          location: 'Cape Town, South Africa',
          images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'],
          sellerName: 'David Mthembu',
          sellerPlan: 'premium',
          whatsappNumber: '+27 82 123 4567',
          createdAt: '2024-01-17',
          status: 'active'
        },
        {
          id: '5',
          title: 'MacBook Pro M2 - 2023 Model',
          description: 'Brand new MacBook Pro with M2 chip. Perfect for professionals and students.',
          price: 1200000,
          category: 'Electronics',
          location: 'Lagos, Nigeria',
          images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
          sellerName: 'Michael Chen',
          sellerPlan: 'premium_pro',
          whatsappNumber: '+234 803 456 7890',
          createdAt: '2024-01-16',
          status: 'active'
        },
        {
          id: '6',
          title: 'Nike Air Jordan Sneakers',
          description: 'Limited edition Nike Air Jordan sneakers in perfect condition. Size 42.',
          price: 85000,
          category: 'Fashion',
          location: 'Kumasi, Ghana',
          images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
          sellerName: 'Kwame Asante',
          sellerPlan: 'standard',
          whatsappNumber: '+233 24 234 5678',
          createdAt: '2024-01-15',
          status: 'active'
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

  const filteredListings = listings.filter(listing => {
    const matchesSearch = !searchQuery || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !selectedCategory || listing.category === selectedCategory
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchQuery) {
      params.set('search', searchQuery)
    } else {
      params.delete('search')
    }
    setSearchParams(params)
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

  const getWhatsAppLink = (number: string, title: string) => {
    const message = encodeURIComponent(`Hi, is this item on Oranji still available? ${title}`)
    return `https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${message}`
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location.id} value={location.name}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-3">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000000}
            step={50000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Listings</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </form>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="py-6">
                    <h2 className="text-lg font-semibold mb-6">Filters</h2>
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
              
              <p className="text-gray-600">
                {sortedListings.length} listing{sortedListings.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Filters</h2>
              <FilterSidebar />
            </div>
          </div>

          {/* Listings */}
          <div className="flex-1">
            {sortedListings.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                <Button onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('')
                  setSelectedLocation('')
                  setPriceRange([0, 10000000])
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {sortedListings.map((listing) => (
                  <Card key={listing.id} className="hover:shadow-lg transition-all duration-300">
                    {viewMode === 'grid' ? (
                      <>
                        <div className="aspect-square overflow-hidden rounded-t-lg">
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Link to={`/listing/${listing.id}`}>
                            <h3 className="font-semibold text-gray-900 mb-2 hover:text-orange-600 line-clamp-2">
                              {listing.title}
                            </h3>
                          </Link>
                          <p className="text-2xl font-bold text-orange-600 mb-2">
                            {formatPrice(listing.price)}
                          </p>
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            {listing.location}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold text-orange-600">
                                  {listing.sellerName.charAt(0)}
                                </span>
                              </div>
                              <span className="text-sm text-gray-700">{listing.sellerName}</span>
                              {getPlanBadge(listing.sellerPlan)}
                            </div>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <Link to={`/listing/${listing.id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full">
                                View Details
                              </Button>
                            </Link>
                            <a
                              href={getWhatsAppLink(listing.whatsappNumber, listing.title)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" className="oranji-gradient text-white">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </a>
                          </div>
                        </CardContent>
                      </>
                    ) : (
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={listing.images[0]}
                              alt={listing.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <Link to={`/listing/${listing.id}`}>
                              <h3 className="font-semibold text-gray-900 mb-2 hover:text-orange-600">
                                {listing.title}
                              </h3>
                            </Link>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                              {listing.description}
                            </p>
                            <p className="text-2xl font-bold text-orange-600 mb-2">
                              {formatPrice(listing.price)}
                            </p>
                            <div className="flex items-center text-sm text-gray-600 mb-3">
                              <MapPin className="w-4 h-4 mr-1" />
                              {listing.location}
                              <Calendar className="w-4 h-4 ml-4 mr-1" />
                              {new Date(listing.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-semibold text-orange-600">
                                    {listing.sellerName.charAt(0)}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-700">{listing.sellerName}</span>
                                {getPlanBadge(listing.sellerPlan)}
                              </div>
                              <div className="flex space-x-2">
                                <Link to={`/listing/${listing.id}`}>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </Link>
                                <a
                                  href={getWhatsAppLink(listing.whatsappNumber, listing.title)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button size="sm" className="oranji-gradient text-white">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    WhatsApp
                                  </Button>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}