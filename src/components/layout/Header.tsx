import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add shadow to header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query parameter
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#7D6E83]">Cardelion</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#7D6E83] font-medium transition-colors">
              Home
            </Link>
            <Link to="/catalog" className="text-gray-700 hover:text-[#7D6E83] font-medium transition-colors">
              Shop All
            </Link>
            <Link to="/catalog/wedding" className="text-gray-700 hover:text-[#7D6E83] font-medium transition-colors">
              Wedding
            </Link>
            <Link to="/catalog/birthday" className="text-gray-700 hover:text-[#7D6E83] font-medium transition-colors">
              Birthday
            </Link>
            <Link to="/catalog/anniversary" className="text-gray-700 hover:text-[#7D6E83] font-medium transition-colors">
              Anniversary
            </Link>
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 lg:w-60 py-1.5 pl-8 pr-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#7D6E83] focus:border-[#7D6E83] text-sm"
              />
              <Search size={16} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </form>

            {/* Wishlist Icon */}
            {isAuthenticated && (
              <Link to="/wishlist" className="relative p-1.5 text-gray-700 hover:text-[#7D6E83] transition-colors">
                <Heart size={20} />
              </Link>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-1.5 text-gray-700 hover:text-[#7D6E83] transition-colors">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#DBA39A] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Account */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-[#7D6E83] transition-colors">
                  <User size={20} />
                  <span className="text-sm font-medium">{user?.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-[#7D6E83] transition-colors">
                <User size={20} />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative p-1.5 text-gray-700">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#DBA39A] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              onClick={toggleMenu}
              className="p-1.5 text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-30 bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden pt-16`}
      >
        <div className="container mx-auto px-4 py-6">
          <form onSubmit={handleSearchSubmit} className="relative mb-6">
            <input
              type="text"
              placeholder="Search cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#7D6E83] focus:border-[#7D6E83]"
            />
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </form>
          
          <nav className="space-y-6">
            <Link to="/" className="block text-lg font-medium text-gray-800">
              Home
            </Link>
            <Link to="/catalog" className="block text-lg font-medium text-gray-800">
              Shop All
            </Link>
            <Link to="/catalog/wedding" className="block text-lg font-medium text-gray-800">
              Wedding
            </Link>
            <Link to="/catalog/birthday" className="block text-lg font-medium text-gray-800">
              Birthday
            </Link>
            <Link to="/catalog/anniversary" className="block text-lg font-medium text-gray-800">
              Anniversary
            </Link>
            
            <div className="border-t border-gray-200 pt-6">
              {isAuthenticated ? (
                <>
                  <Link to="/account" className="block text-lg font-medium text-gray-800 mb-4">
                    My Account
                  </Link>
                  <Link to="/wishlist" className="block text-lg font-medium text-gray-800 mb-4">
                    My Wishlist
                  </Link>
                  <Link to="/orders" className="block text-lg font-medium text-gray-800 mb-4">
                    My Orders
                  </Link>
                  <button 
                    onClick={logout}
                    className="block text-lg font-medium text-[#DBA39A]"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" className="block text-lg font-medium text-[#7D6E83]">
                  Sign In / Register
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;