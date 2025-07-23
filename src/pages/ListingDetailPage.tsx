import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Share2, Heart, MapPin, Calendar, Eye, Shield, AlertTriangle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { toast } from 'sonner'
import { User } from '../App'

interface ListingDetailPageProps {
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
  views: number
}

export default function ListingDetailPage({ user }: ListingDetailPageProps) {
  const { id } = useParams()
  const [listing, setListing] = useState<Listing | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)

  const loadListing = useCallback(async () => {
    try {
      // Mock data for now - in real app, fetch from database
      const mockListing: Listing = {
        id: id || '1',
        title: 'iPhone 14 Pro Max - Like New',
        description: `Barely used iPhone 14 Pro Max in excellent condition. This premium device comes with:

• Original box and all accessories
• Screen protector already applied
• Protective case included
• 95% battery health
• No scratches or dents
• All functions working perfectly

Perfect for anyone looking for a high-quality smartphone at a great price. The phone has been well-maintained and stored in a smoke-free environment.

Reason for selling: Upgrading to the latest model.

Serious buyers only. No time wasters please.`,
        price: 850000,
        category: 'Electronics',
        location: 'Victoria Island, Lagos, Nigeria',
        images: [
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
          'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800',
          'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800'
        ],
        sellerName: 'John Adebayo',
        sellerPlan: 'premium',
        whatsappNumber: '+234 801 234 5678',
        createdAt: '2024-01-20',
        status: 'active',
        views: 1247
      }
      
      setListing(mockListing)
    } catch (error) {
      console.error('Error loading listing:', error)
      toast.error('Failed to load listing')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadListing()
  }, [loadListing])

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'standard':
        return <Badge className="seller-badge-standard">Standard Seller</Badge>
      case 'premium':
        return <Badge className="seller-badge-premium">Premium Seller</Badge>
      case 'premium_pro':
        return <Badge className="seller-badge-premium-pro">Premium Pro Seller</Badge>
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing?.title,
          text: `Check out this item on Oranji: ${listing?.title}`,
          url: window.location.href
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listing...</p>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Listing not found</h2>
          <p className="text-gray-600 mb-6">The listing you're looking for doesn't exist or has been removed.</p>
          <Link to="/browse">
            <Button>Browse Other Listings</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/browse">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listings
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="aspect-square bg-gray-100">
                <img
                  src={listing.images[currentImageIndex]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {listing.images.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {listing.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          index === currentImageIndex ? 'border-orange-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${listing.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Description */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                <div className="prose prose-gray max-w-none">
                  {listing.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="mt-6 border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2">Safety Tips</h3>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Meet in a public place for transactions</li>
                      <li>• Inspect the item thoroughly before payment</li>
                      <li>• Don't send money in advance</li>
                      <li>• Trust your instincts - if something feels wrong, walk away</li>
                      <li>• Report suspicious listings to our support team</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-600 mb-4">
                  {formatPrice(listing.price)}
                </div>
                
                <div className="space-y-3 mb-6">
                  <a
                    href={getWhatsAppLink(listing.whatsappNumber, listing.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full oranji-gradient text-white text-lg py-3">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contact Seller
                    </Button>
                  </a>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleFavorite}
                      className={`flex-1 ${isFavorited ? 'text-red-600 border-red-600' : ''}`}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                      {isFavorited ? 'Favorited' : 'Favorite'}
                    </Button>
                    <Button variant="outline" onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Listing Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{listing.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {listing.location}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted</span>
                    <span className="font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views</span>
                    <span className="font-medium flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {listing.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Seller Information</h3>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold text-lg">
                      {listing.sellerName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{listing.sellerName}</p>
                    {getPlanBadge(listing.sellerPlan)}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Member since 2023</p>
                  <p>• 98% positive feedback</p>
                  <p>• Usually responds within 1 hour</p>
                  <p>• Verified phone number</p>
                </div>

                <Separator className="my-4" />

                <Button variant="outline" className="w-full">
                  View Seller Profile
                </Button>
              </CardContent>
            </Card>

            {/* Report Listing */}
            <Card className="border-red-200">
              <CardContent className="p-6">
                <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report this listing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Listings */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mock related listings */}
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="hover:shadow-lg transition-all duration-300">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={`https://images.unsplash.com/photo-${1580910051074 + item}?w=400`}
                    alt={`Related item ${item}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    iPhone 13 Pro - Good Condition
                  </h3>
                  <p className="text-xl font-bold text-orange-600 mb-2">
                    ₦650,000
                  </p>
                  <p className="text-sm text-gray-600">Lagos, Nigeria</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}