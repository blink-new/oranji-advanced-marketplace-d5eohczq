import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye, MessageCircle, TrendingUp, Package, Users, Star, Crown } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { toast } from 'sonner'
import blink from '../blink/client'
import { User } from '../App'
import CreateListingForm from '../components/forms/CreateListingForm'

interface DashboardPageProps {
  user: User
}

interface Listing {
  id: string
  title: string
  price: number
  category: string
  location: string
  images: string[]
  status: string
  views: number
  createdAt: string
}

export default function DashboardPage({ user }: DashboardPageProps) {
  const [listings, setListings] = useState<Listing[]>([])
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    totalMessages: 0
  })
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const loadData = async () => {
    try {
      // Mock data for now
      const mockListings: Listing[] = [
        {
          id: '1',
          title: 'iPhone 14 Pro Max - Like New',
          price: 850000,
          category: 'Electronics',
          location: 'Lagos, Nigeria',
          images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'],
          status: 'active',
          views: 1247,
          createdAt: '2024-01-20'
        },
        {
          id: '2',
          title: 'MacBook Pro M2 - 2023 Model',
          price: 1200000,
          category: 'Electronics',
          location: 'Lagos, Nigeria',
          images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
          status: 'active',
          views: 892,
          createdAt: '2024-01-18'
        },
        {
          id: '3',
          title: 'Designer Watch Collection',
          price: 150000,
          category: 'Fashion',
          location: 'Lagos, Nigeria',
          images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400'],
          status: 'pending',
          views: 234,
          createdAt: '2024-01-16'
        }
      ]

      setListings(mockListings)
      setStats({
        totalListings: mockListings.length,
        activeListings: mockListings.filter(l => l.status === 'active').length,
        totalViews: mockListings.reduce((sum, l) => sum + l.views, 0),
        totalMessages: 45
      })
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getPlanInfo = (plan: string) => {
    switch (plan) {
      case 'free':
        return {
          name: 'Free Plan',
          maxListings: 3,
          badge: null,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100'
        }
      case 'standard':
        return {
          name: 'Standard Plan',
          maxListings: 10,
          badge: <Badge className="seller-badge-standard">Standard</Badge>,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100'
        }
      case 'premium':
        return {
          name: 'Premium Plan',
          maxListings: 25,
          badge: <Badge className="seller-badge-premium">Premium</Badge>,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        }
      case 'premium_pro':
        return {
          name: 'Premium Pro Plan',
          maxListings: -1, // Unlimited
          badge: <Badge className="seller-badge-premium-pro">Premium Pro</Badge>,
          color: 'text-red-600',
          bgColor: 'bg-red-100'
        }
      default:
        return {
          name: 'Free Plan',
          maxListings: 3,
          badge: null,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100'
        }
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleDeleteListing = async (listingId: string) => {
    try {
      // In real app, delete from database
      setListings(prev => prev.filter(l => l.id !== listingId))
      toast.success('Listing deleted successfully')
    } catch (error) {
      toast.error('Failed to delete listing')
    }
  }

  const planInfo = getPlanInfo(user.sellerPlan)
  const canCreateMore = planInfo.maxListings === -1 || listings.length < planInfo.maxListings

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CreateListingForm
            onSuccess={() => {
              setShowCreateForm(false)
              loadData() // Reload listings
            }}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user.displayName || user.email}!
              </p>
            </div>
            
            {user.role === 'seller' && (
              <div className="flex items-center space-x-4">
                {planInfo.badge}
                <Button className="oranji-gradient text-white">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              </div>
            )}
          </div>
        </div>

        {user.role === 'buyer' ? (
          /* Buyer Dashboard */
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Buyer Dashboard</CardTitle>
                <CardDescription>
                  Browse and manage your favorite listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Start Exploring
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Discover amazing items from trusted sellers across Africa
                  </p>
                  <Link to="/browse">
                    <Button className="oranji-gradient text-white">
                      Browse Listings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Browse All</h3>
                  <p className="text-sm text-gray-600">Explore all available listings</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Favorites</h3>
                  <p className="text-sm text-gray-600">View your saved items</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 oranji-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Messages</h3>
                  <p className="text-sm text-gray-600">Chat with sellers</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Seller Dashboard */
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Listings</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalListings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Listings</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Eye className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Messages</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plan Status */}
            <Card className={`border-2 ${planInfo.bgColor}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${planInfo.bgColor} rounded-full flex items-center justify-center`}>
                      <Crown className={`w-6 h-6 ${planInfo.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{planInfo.name}</h3>
                      <p className="text-sm text-gray-600">
                        {planInfo.maxListings === -1 
                          ? 'Unlimited listings' 
                          : `${listings.length}/${planInfo.maxListings} listings used`
                        }
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Listings Management */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>My Listings</CardTitle>
                    <CardDescription>
                      Manage your product listings
                    </CardDescription>
                  </div>
                  <Button 
                    className="oranji-gradient text-white"
                    disabled={!canCreateMore}
                    onClick={() => setShowCreateForm(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Listing
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {listings.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No listings yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Create your first listing to start selling
                    </p>
                    <Button 
                      className="oranji-gradient text-white"
                      onClick={() => setShowCreateForm(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create First Listing
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {listings.map((listing) => (
                      <div key={listing.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {listing.title}
                          </h3>
                          <p className="text-lg font-bold text-orange-600">
                            {formatPrice(listing.price)}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{listing.category}</span>
                            <span>•</span>
                            <span>{listing.views} views</span>
                            <span>•</span>
                            <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {getStatusBadge(listing.status)}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Link to={`/listing/${listing.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteListing(listing.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}