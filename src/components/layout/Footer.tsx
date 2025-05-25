import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#F9F5EB] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold text-[#7D6E83] mb-4">Cardelion</h3>
            <p className="text-gray-600 mb-4">
              Beautifully crafted cards for all of life's special moments. From weddings to birthdays, 
              we help you celebrate with style and elegance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog/wedding" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                  Wedding Cards
                </Link>
              </li>
              <li>
                <Link to="/catalog/birthday" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                  Birthday Cards
                </Link>
              </li>
              <li>
                <Link to="/catalog/anniversary" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                  Anniversary Cards
                </Link>
              </li>
              <li>
                <Link to="/catalog/congratulations" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                  Congratulations Cards
                </Link>
              </li>
              <li>
                <Link to="/catalog/sympathy" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                  Sympathy Cards
                </Link>
              </li>
              <li>
                <Link to="/catalog/holiday" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                  Holiday Cards
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-[#7D6E83] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for exclusive offers and updates on new card collections.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#7D6E83] focus:border-[#7D6E83]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#7D6E83] text-white rounded-r-md hover:bg-[#6a5d6f] transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {year} Cardelion. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-600 hover:text-[#7D6E83] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-[#7D6E83] text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;