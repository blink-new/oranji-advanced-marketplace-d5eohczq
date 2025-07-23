import { Link } from 'react-router-dom'
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 oranji-gradient rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold oranji-text-gradient">Oranji</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Africa's leading online marketplace connecting buyers and sellers across Nigeria, Ghana, and South Africa. 
              Buy and sell anything, anywhere, anytime.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                Lagos, Nigeria
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                hello@oranji.com
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Start Selling
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2024 Oranji. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-sm text-gray-600">Available in:</span>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">🇳🇬 Nigeria</span>
              <span className="text-sm font-medium text-gray-700">🇬🇭 Ghana</span>
              <span className="text-sm font-medium text-gray-700">🇿🇦 South Africa</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}