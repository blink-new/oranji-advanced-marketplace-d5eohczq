import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import BrowseListingsPage from './pages/BrowseListingsPage'
import ListingDetailPage from './pages/ListingDetailPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import AboutPage from './pages/AboutPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import AdminPage from './pages/AdminPage'
import blink from './blink/client'

export interface User {
  id: string
  email: string
  displayName?: string
  role: 'buyer' | 'seller' | 'admin'
  sellerPlan: 'free' | 'standard' | 'premium' | 'premium_pro'
  whatsappNumber?: string
  cacApproved: number
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged(async (state) => {
      if (state.user) {
        try {
          // Get user profile from our database
          const profiles = await blink.db.userProfiles.list({
            where: { userId: state.user.id },
            limit: 1
          })
          
          if (profiles.length > 0) {
            const profile = profiles[0]
            setUser({
              id: state.user.id,
              email: state.user.email,
              displayName: profile.displayName,
              role: profile.role as 'buyer' | 'seller' | 'admin',
              sellerPlan: profile.sellerPlan as 'free' | 'standard' | 'premium' | 'premium_pro',
              whatsappNumber: profile.whatsappNumber,
              cacApproved: profile.cacApproved
            })
          } else {
            // Create default profile for new users
            await blink.db.userProfiles.create({
              id: `profile_${state.user.id}`,
              userId: state.user.id,
              displayName: state.user.email.split('@')[0],
              role: 'buyer',
              sellerPlan: 'free',
              cacApproved: 0
            })
            
            setUser({
              id: state.user.id,
              email: state.user.email,
              displayName: state.user.email.split('@')[0],
              role: 'buyer',
              sellerPlan: 'free',
              cacApproved: 0
            })
          }
        } catch (error) {
          console.error('Error loading user profile:', error)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Oranji...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header user={user} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/browse" element={<BrowseListingsPage user={user} />} />
            <Route path="/listing/:id" element={<ListingDetailPage user={user} />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
            />
            <Route 
              path="/signup" 
              element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <DashboardPage user={user} /> : <Navigate to="/login" replace />} 
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/admin" element={<AdminPage user={user} />} />
          </Routes>
        </main>
        
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App