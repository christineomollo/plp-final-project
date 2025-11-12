import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">💖</span>
              <span className="text-xl font-bold gradient-text">BurBestie</span>
            </div>
            <p className="text-gray-600 text-sm">
              Your digital safe haven for women. Connect, support, and empower each other.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-bestie-purple transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-bestie-purple transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-bestie-purple transition-colors text-sm">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-bestie-purple transition-colors text-sm">
                  Join Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-bestie-purple transition-colors text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-bestie-purple transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-bestie-purple transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-bestie-purple transition-colors text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Emergency</h3>
            <p className="text-gray-600 text-sm mb-2">
              Need immediate help?
            </p>
            <div className="space-y-2">
              <a
                href="tel:988"
                className="block bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
              >
                🚨 Suicide Prevention: 988
              </a>
              <a
                href="tel:18007997233"
                className="block bg-orange-50 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors"
              >
                🏠 Domestic Violence: 1-800-799-7233
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 BurBestie. Made with 💖 for women everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;