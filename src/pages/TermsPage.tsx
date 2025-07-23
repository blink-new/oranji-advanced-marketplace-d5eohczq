import { Scale, AlertTriangle, Shield, CreditCard } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 oranji-gradient rounded-xl flex items-center justify-center">
              <Scale className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Use</h1>
          <p className="text-xl text-gray-600">
            These terms govern your use of the Oranji marketplace platform and services.
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
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fair Use</h3>
                <p className="text-sm text-gray-600">
                  Use Oranji responsibly and respect other users
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Clear Pricing</h3>
                <p className="text-sm text-gray-600">
                  Transparent fees and subscription terms
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Safety First</h3>
                <p className="text-sm text-gray-600">
                  Rules to keep our community safe
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            
            <p className="text-gray-600 mb-6">
              By accessing or using Oranji ("the Platform"), you agree to be bound by these Terms of Use 
              ("Terms"). If you do not agree to these Terms, please do not use our services. These Terms 
              apply to all users, including buyers, sellers, and visitors.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Platform Description</h2>
            
            <p className="text-gray-600 mb-4">
              Oranji is an online marketplace that connects buyers and sellers across Nigeria, Ghana, 
              and South Africa. We provide:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>A platform for listing and discovering products and services</li>
              <li>Communication tools between buyers and sellers</li>
              <li>Seller verification and plan management systems</li>
              <li>Payment processing for subscription plans</li>
              <li>Customer support and dispute resolution assistance</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. User Accounts</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>You must be at least 18 years old to create an account</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>You are responsible for all activities under your account</li>
              <li>One account per person or business entity</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Types</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li><strong>Buyer Account:</strong> Browse and purchase items (free)</li>
              <li><strong>Seller Account:</strong> List items for sale (subscription required)</li>
              <li><strong>Business Account:</strong> Enhanced features for verified businesses</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">4. Seller Plans and Subscriptions</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Plan Types</h3>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ul className="space-y-3 text-gray-600">
                <li><strong>Free Plan:</strong> Up to 3 listings, no seller badge</li>
                <li><strong>Standard Plan:</strong> ₦1,000/week, up to 10 listings, yellow badge</li>
                <li><strong>Premium Plan:</strong> ₦2,500/week, up to 25 listings, blue badge</li>
                <li><strong>Premium Pro Plan:</strong> ₦5,000/week, unlimited listings, red badge, requires business verification</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Subscription Terms</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>All paid plans are weekly subscriptions</li>
              <li>Automatic renewal unless cancelled</li>
              <li>Payments processed through Paystack</li>
              <li>Plan changes take effect immediately</li>
              <li>Unused listings do not roll over to the next period</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">5. Listing Guidelines</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Permitted Items</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Legal products and services</li>
              <li>Items you own or have authorization to sell</li>
              <li>Accurate descriptions and genuine photos</li>
              <li>Reasonable pricing</li>
              <li>Items in acceptable condition</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Prohibited Items</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Illegal or regulated items (weapons, drugs, etc.)</li>
              <li>Counterfeit or stolen goods</li>
              <li>Adult content or services</li>
              <li>Live animals</li>
              <li>Items that violate intellectual property rights</li>
              <li>Hazardous materials</li>
              <li>Services that violate local laws</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">6. User Conduct</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Acceptable Behavior</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Treat all users with respect and courtesy</li>
              <li>Provide honest and accurate information</li>
              <li>Honor your commitments to other users</li>
              <li>Report suspicious or inappropriate behavior</li>
              <li>Follow all applicable laws and regulations</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Prohibited Conduct</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Harassment, threats, or abusive language</li>
              <li>Fraud, scams, or deceptive practices</li>
              <li>Spam or unsolicited communications</li>
              <li>Circumventing platform fees or policies</li>
              <li>Creating multiple accounts to evade restrictions</li>
              <li>Interfering with platform operations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">7. Transactions and Payments</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Transaction Process</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Buyers and sellers communicate directly</li>
              <li>Oranji facilitates contact but is not party to transactions</li>
              <li>Payment arrangements are between buyer and seller</li>
              <li>Meet in safe, public locations for exchanges</li>
              <li>Inspect items before payment</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Fees</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Subscription fees for seller plans</li>
              <li>No transaction fees between buyers and sellers</li>
              <li>Payment processing fees may apply</li>
              <li>Fees are non-refundable except as required by law</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">8. Verification and Moderation</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Seller Verification</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Premium Pro sellers must provide business documentation</li>
              <li>We verify CAC certificates and business registrations</li>
              <li>Verification may take 1-3 business days</li>
              <li>False documentation results in account suspension</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Moderation</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>All listings are subject to review</li>
              <li>We may remove content that violates these Terms</li>
              <li>Repeated violations may result in account suspension</li>
              <li>Appeals can be submitted through customer support</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">9. Intellectual Property</h2>
            
            <p className="text-gray-600 mb-4">
              By posting content on Oranji, you grant us a non-exclusive license to display, 
              distribute, and promote your listings. You retain ownership of your content and 
              are responsible for ensuring you have the right to post it.
            </p>

            <p className="text-gray-600 mb-6">
              The Oranji platform, including our logo, design, and software, is protected by 
              intellectual property laws. You may not copy, modify, or distribute our platform 
              without permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">10. Privacy and Data Protection</h2>
            
            <p className="text-gray-600 mb-6">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, 
              and protect your information. By using Oranji, you consent to our privacy practices 
              as described in our Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">11. Disclaimers and Limitations</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Availability</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
              <li>Maintenance and updates may temporarily affect availability</li>
              <li>We are not liable for losses due to service interruptions</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Generated Content</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>We do not verify the accuracy of user listings</li>
              <li>Users are responsible for their own content and transactions</li>
              <li>We are not liable for disputes between users</li>
              <li>Always verify items and sellers before making purchases</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">12. Termination</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Termination</h3>
            <p className="text-gray-600 mb-4">
              We may suspend or terminate your account for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Repeated policy violations</li>
              <li>Non-payment of subscription fees</li>
              <li>Inactivity for extended periods</li>
            </ul>

            <p className="text-gray-600 mb-6">
              You may delete your account at any time through your account settings. 
              Upon termination, your access to the platform will cease, but these Terms 
              will continue to apply to past activities.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">13. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">User Disputes</h3>
            <p className="text-gray-600 mb-4">
              For disputes between users:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
              <li>Try to resolve directly with the other party</li>
              <li>Contact our support team for mediation assistance</li>
              <li>We may provide guidance but cannot force resolution</li>
              <li>Legal disputes should be handled through appropriate courts</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Disputes</h3>
            <p className="text-gray-600 mb-6">
              Disputes with Oranji will be governed by Nigerian law and resolved through 
              arbitration in Lagos, Nigeria, unless prohibited by local law.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">14. Changes to Terms</h2>
            
            <p className="text-gray-600 mb-6">
              We may update these Terms periodically to reflect changes in our services or 
              legal requirements. We will notify users of significant changes via email or 
              platform notification. Continued use of Oranji after changes constitutes 
              acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">15. Contact Information</h2>
            
            <p className="text-gray-600 mb-4">
              For questions about these Terms or our services:
            </p>
            <ul className="list-none text-gray-600 mb-6 space-y-2">
              <li><strong>Email:</strong> legal@oranji.com</li>
              <li><strong>Support:</strong> support@oranji.com</li>
              <li><strong>Address:</strong> Oranji Legal Team, Victoria Island, Lagos, Nigeria</li>
            </ul>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">
                Questions About These Terms?
              </h3>
              <p className="text-orange-800">
                We want you to understand your rights and responsibilities when using Oranji. 
                If you have any questions about these Terms of Use, please contact our legal 
                team at legal@oranji.com.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Important Safety Reminder
              </h3>
              <p className="text-red-800">
                Always meet in public places, inspect items before payment, and trust your 
                instincts. Report suspicious activity to our support team immediately. 
                Your safety is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}