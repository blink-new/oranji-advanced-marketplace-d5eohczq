import { Shield, Eye, Lock, Users } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 oranji-gradient rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Transparency</h3>
                <p className="text-sm text-gray-600">
                  We're clear about what data we collect and why
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
                <p className="text-sm text-gray-600">
                  Your data is encrypted and securely stored
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Control</h3>
                <p className="text-sm text-gray-600">
                  You control your data and privacy settings
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
            <p className="text-gray-600 mb-4">
              When you create an account on Oranji, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Name and email address</li>
              <li>Phone number (for sellers)</li>
              <li>WhatsApp number (for contact purposes)</li>
              <li>Profile information you choose to provide</li>
              <li>Business registration documents (for Premium Pro sellers)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Listing Information</h3>
            <p className="text-gray-600 mb-4">
              When you create listings, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Product descriptions, images, and pricing</li>
              <li>Location information</li>
              <li>Category and condition details</li>
              <li>Contact preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Data</h3>
            <p className="text-gray-600 mb-4">
              We automatically collect:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Device information and IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Search queries and interactions</li>
              <li>Location data (with your permission)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. How We Use Your Information</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Operations</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Create and manage your account</li>
              <li>Process and display your listings</li>
              <li>Facilitate communication between buyers and sellers</li>
              <li>Process payments and subscriptions</li>
              <li>Provide customer support</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety and Security</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Verify seller identities and business documents</li>
              <li>Detect and prevent fraud</li>
              <li>Monitor for prohibited content</li>
              <li>Enforce our terms of service</li>
              <li>Protect against spam and abuse</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Improvements and Analytics</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Analyze platform usage and performance</li>
              <li>Improve our services and user experience</li>
              <li>Develop new features</li>
              <li>Conduct research and analytics</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. Information Sharing</h2>
            
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share information in these situations:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Public Listings</h3>
            <p className="text-gray-600 mb-4">
              Information in your listings (product details, seller name, location, contact information) 
              is publicly visible to help buyers find and contact you.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Providers</h3>
            <p className="text-gray-600 mb-4">
              We work with trusted third parties who help us operate our platform:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Payment processors (Paystack)</li>
              <li>Cloud storage providers</li>
              <li>Analytics services</li>
              <li>Customer support tools</li>
              <li>Email and messaging services</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
            <p className="text-gray-600 mb-6">
              We may disclose information when required by law, to protect our rights, 
              or to ensure platform safety and security.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">4. Data Security</h2>
            
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure servers and databases</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">5. Your Rights and Choices</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Management</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Update your profile information anytime</li>
              <li>Control your listing visibility</li>
              <li>Manage communication preferences</li>
              <li>Delete your account and associated data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Rights (GDPR/NDPR Compliance)</h3>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request data deletion</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">6. Cookies and Tracking</h2>
            
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Remember your preferences and settings</li>
              <li>Keep you logged in</li>
              <li>Analyze site usage and performance</li>
              <li>Provide personalized content</li>
              <li>Prevent fraud and improve security</li>
            </ul>

            <p className="text-gray-600 mb-6">
              You can control cookies through your browser settings, but some features may not work properly if disabled.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">7. International Data Transfers</h2>
            
            <p className="text-gray-600 mb-6">
              Your information may be processed in countries other than your own. We ensure appropriate 
              safeguards are in place to protect your data according to this privacy policy and applicable laws.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">8. Children's Privacy</h2>
            
            <p className="text-gray-600 mb-6">
              Oranji is not intended for users under 18. We do not knowingly collect personal information 
              from children. If we become aware of such collection, we will delete the information immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">9. Changes to This Policy</h2>
            
            <p className="text-gray-600 mb-6">
              We may update this privacy policy periodically. We will notify you of significant changes 
              via email or platform notification. Your continued use of Oranji after changes constitutes 
              acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">10. Contact Us</h2>
            
            <p className="text-gray-600 mb-4">
              If you have questions about this privacy policy or your data, contact us:
            </p>
            <ul className="list-none text-gray-600 mb-6 space-y-2">
              <li><strong>Email:</strong> privacy@oranji.com</li>
              <li><strong>Address:</strong> Oranji Privacy Team, Victoria Island, Lagos, Nigeria</li>
              <li><strong>Data Protection Officer:</strong> dpo@oranji.com</li>
            </ul>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">
                Questions About Your Privacy?
              </h3>
              <p className="text-orange-800">
                We're committed to protecting your privacy and being transparent about our practices. 
                If you have any questions or concerns, please don't hesitate to reach out to our 
                privacy team at privacy@oranji.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}