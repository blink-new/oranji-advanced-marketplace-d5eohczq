import { useState, useEffect } from 'react'
import { Upload, X, MapPin, DollarSign, Tag, FileText, Phone } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { toast } from 'sonner'
import blink from '../../blink/client'

interface CreateListingFormProps {
  onSuccess: () => void
  onCancel: () => void
}

interface Category {
  id: string
  name: string
  icon: string
}

interface Location {
  id: string
  name: string
  type: 'country' | 'state' | 'lga' | 'area'
  parentId?: string
}

export default function CreateListingForm({ onSuccess, onCancel }: CreateListingFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    price: '',
    condition: 'new',
    whatsappNumber: '',
    country: '',
    state: '',
    lga: '',
    area: ''
  })
  
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [countries, setCountries] = useState<Location[]>([])
  const [states, setStates] = useState<Location[]>([])
  const [lgas, setLgas] = useState<Location[]>([])
  const [areas, setAreas] = useState<Location[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const loadInitialData = async () => {
    try {
      // Load categories
      const categoriesData = await blink.db.categories.list()
      setCategories(categoriesData)

      // Load countries
      const countriesData = await blink.db.locations.list({
        where: { type: 'country' },
        orderBy: { name: 'asc' }
      })
      setCountries(countriesData)
    } catch (error) {
      console.error('Error loading initial data:', error)
      toast.error('Failed to load form data')
    }
  }

  const loadStates = async (countryId: string) => {
    try {
      const statesData = await blink.db.locations.list({
        where: { type: 'state', parentId: countryId },
        orderBy: { name: 'asc' }
      })
      setStates(statesData)
      setLgas([])
      setAreas([])
      setFormData(prev => ({ ...prev, state: '', lga: '', area: '' }))
    } catch (error) {
      console.error('Error loading states:', error)
    }
  }

  const loadLgas = async (stateId: string) => {
    try {
      const lgasData = await blink.db.locations.list({
        where: { type: 'lga', parentId: stateId },
        orderBy: { name: 'asc' }
      })
      setLgas(lgasData)
      setAreas([])
      setFormData(prev => ({ ...prev, lga: '', area: '' }))
    } catch (error) {
      console.error('Error loading LGAs:', error)
    }
  }

  const loadAreas = async (lgaId: string) => {
    try {
      const areasData = await blink.db.locations.list({
        where: { type: 'area', parentId: lgaId },
        orderBy: { name: 'asc' }
      })
      setAreas(areasData)
      setFormData(prev => ({ ...prev, area: '' }))
    } catch (error) {
      console.error('Error loading areas:', error)
    }
  }

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    if (formData.country) {
      loadStates(formData.country)
    }
  }, [formData.country])

  useEffect(() => {
    if (formData.state) {
      loadLgas(formData.state)
    }
  }, [formData.state])

  useEffect(() => {
    if (formData.lga) {
      loadAreas(formData.lga)
    }
  }, [formData.lga])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (images.length + files.length > 5) {
      toast.error('Maximum 5 images allowed')
      return
    }

    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 5MB`)
        return false
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not a valid image`)
        return false
      }
      return true
    })

    setImages(prev => [...prev, ...validFiles])

    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const uploadImages = async (): Promise<string[]> => {
    if (images.length === 0) return []

    setUploading(true)
    const uploadedUrls: string[] = []

    try {
      for (const image of images) {
        const { publicUrl } = await blink.storage.upload(
          image,
          `listings/${Date.now()}-${image.name}`,
          { upsert: true }
        )
        uploadedUrls.push(publicUrl)
      }
      return uploadedUrls
    } catch (error) {
      console.error('Error uploading images:', error)
      throw new Error('Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a title')
      return false
    }
    if (!formData.description.trim()) {
      toast.error('Please enter a description')
      return false
    }
    if (!formData.categoryId) {
      toast.error('Please select a category')
      return false
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error('Please enter a valid price')
      return false
    }
    if (!formData.whatsappNumber.trim()) {
      toast.error('Please enter your WhatsApp number')
      return false
    }
    if (!formData.country) {
      toast.error('Please select a country')
      return false
    }
    if (!formData.state) {
      toast.error('Please select a state')
      return false
    }
    if (images.length === 0) {
      toast.error('Please add at least one image')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)

    try {
      // Get current user
      const user = await blink.auth.me()
      if (!user) {
        toast.error('Please log in to create a listing')
        return
      }

      // Upload images
      const imageUrls = await uploadImages()

      // Create location string
      const locationParts = [
        areas.find(a => a.id === formData.area)?.name,
        lgas.find(l => l.id === formData.lga)?.name,
        states.find(s => s.id === formData.state)?.name,
        countries.find(c => c.id === formData.country)?.name
      ].filter(Boolean)

      const locationString = locationParts.join(', ')

      // Create listing
      await blink.db.listings.create({
        id: `listing_${Date.now()}`,
        userId: user.id,
        title: formData.title,
        description: formData.description,
        categoryId: formData.categoryId,
        price: parseFloat(formData.price),
        condition: formData.condition,
        whatsappNumber: formData.whatsappNumber,
        location: locationString,
        countryId: formData.country,
        stateId: formData.state,
        lgaId: formData.lga || null,
        areaId: formData.area || null,
        images: JSON.stringify(imageUrls),
        status: 'pending',
        views: 0,
        featured: 0,
        createdAt: new Date().toISOString()
      })

      toast.success('Listing created successfully! It will be reviewed before going live.')
      onSuccess()
    } catch (error) {
      console.error('Error creating listing:', error)
      toast.error('Failed to create listing. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Tag className="w-5 h-5 text-orange-500" />
          <span>Create New Listing</span>
        </CardTitle>
        <CardDescription>
          Fill in the details to list your item on Oranji marketplace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-orange-500" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., iPhone 14 Pro Max - Like New"
                  className="mt-1"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.title.length}/100 characters
                </p>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your item in detail..."
                  className="mt-1 min-h-[120px]"
                  maxLength={1000}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/1000 characters
                </p>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.categoryId} onValueChange={(value) => handleInputChange('categoryId', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center space-x-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like_new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Price (₦) *</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0"
                    className="pl-10"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                    placeholder="+234 801 234 5678"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-orange-500" />
              Location
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country *</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Select 
                  value={formData.state} 
                  onValueChange={(value) => handleInputChange('state', value)}
                  disabled={!formData.country}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="lga">LGA</Label>
                <Select 
                  value={formData.lga} 
                  onValueChange={(value) => handleInputChange('lga', value)}
                  disabled={!formData.state}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select LGA" />
                  </SelectTrigger>
                  <SelectContent>
                    {lgas.map((lga) => (
                      <SelectItem key={lga.id} value={lga.id}>
                        {lga.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="area">Area</Label>
                <Select 
                  value={formData.area} 
                  onValueChange={(value) => handleInputChange('area', value)}
                  disabled={!formData.lga}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-orange-500" />
              Images (1-5 photos) *
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB each</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={images.length >= 5}
                  />
                </label>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={loading || uploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 oranji-gradient text-white"
              disabled={loading || uploading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {uploading ? 'Uploading images...' : 'Creating listing...'}
                </div>
              ) : (
                'Create Listing'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}