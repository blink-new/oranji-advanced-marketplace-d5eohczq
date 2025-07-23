import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, ShoppingBag, MessageCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from 'sonner'
import blink from '../../blink/client'

interface ProfileSetupProps {
  user: any
  onComplete: () => void
}

export default function ProfileSetup({ user, onComplete }: ProfileSetupProps) {
  const [formData, setFormData] = useState({
    displayName: user.displayName || '',
    role: 'buyer' as 'buyer' | 'seller',
    whatsappNumber: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.displayName.trim()) {
      toast.error('Please enter your full name')
      return false
    }
    
    if (formData.role === 'seller' && !formData.whatsappNumber.trim()) {
      toast.error('WhatsApp number is required for sellers')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    try {
      // Create user profile in our database
      await blink.db.userProfiles.create({
        id: `profile_${user.id}`,
        userId: user.id,
        displayName: formData.displayName,
        role: formData.role,
        sellerPlan: formData.role === 'seller' ? 'free' : null,
        whatsappNumber: formData.whatsappNumber || null,
        cacApproved: 0,
        createdAt: new Date().toISOString()
      })
      
      toast.success('Profile setup completed!')
      onComplete()
    } catch (error: any) {
      console.error('Profile setup error:', error)
      toast.error(error.message || 'Failed to setup profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              <span className="text-orange-500">Ora</span>nji
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Complete Your Profile</h2>
          <p className="mt-2 text-sm text-gray-600">
            Tell us a bit about yourself to get started
          </p>
        </div>

        {/* Profile Setup Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Profile Setup</CardTitle>
            <CardDescription className="text-center">
              This information helps us personalize your experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="displayName" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="displayName"
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-1 block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                    I want to...
                  </Label>
                  <div className="mt-2 grid grid-cols-1 gap-3">
                    <div 
                      className={`relative rounded-lg border p-4 cursor-pointer transition-all ${
                        formData.role === 'buyer' 
                          ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => handleInputChange('role', 'buyer')}
                    >
                      <div className="flex items-center">
                        <div className="flex items-center h-5">
                          <input
                            type="radio"
                            name="role"
                            value="buyer"
                            checked={formData.role === 'buyer'}
                            onChange={() => handleInputChange('role', 'buyer')}
                            className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <ShoppingBag className="w-5 h-5 text-orange-500 mr-2" />
                            <span className="font-medium text-gray-900">Buy items</span>
                          </div>
                          <p className="text-sm text-gray-600">Browse and purchase from sellers</p>
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`relative rounded-lg border p-4 cursor-pointer transition-all ${
                        formData.role === 'seller' 
                          ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => handleInputChange('role', 'seller')}
                    >
                      <div className="flex items-center">
                        <div className="flex items-center h-5">
                          <input
                            type="radio"
                            name="role"
                            value="seller"
                            checked={formData.role === 'seller'}
                            onChange={() => handleInputChange('role', 'seller')}
                            className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <User className="w-5 h-5 text-orange-500 mr-2" />
                            <span className="font-medium text-gray-900">Sell items</span>
                          </div>
                          <p className="text-sm text-gray-600">List and sell your products</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {formData.role === 'seller' && (
                  <div>
                    <Label htmlFor="whatsappNumber" className="text-sm font-medium text-gray-700">
                      WhatsApp Number
                    </Label>
                    <div className="relative mt-1">
                      <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="whatsappNumber"
                        type="tel"
                        value={formData.whatsappNumber}
                        onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                        placeholder="e.g., +234 801 234 5678"
                        className="pl-10 block w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Buyers will contact you via WhatsApp for inquiries
                    </p>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-medium"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Setting up profile...
                  </div>
                ) : (
                  'Complete Setup'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}