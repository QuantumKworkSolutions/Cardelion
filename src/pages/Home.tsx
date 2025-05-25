import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts, getBestSellerProducts, getNewProducts, getCategories } from '../data/products';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Product } from '../types';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellerProducts();
  const newArrivals = getNewProducts();
  const categories = getCategories();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Cardelion - Beautiful Cards for Every Occasion';
  }, []);

  const handleProductClick = (product: Product) => {
    window.location.href = `/product/${product.id}`;
  };

  return (
    <div className="min-h-screen bg-[#F9F5EB]">
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#7D6E83] mb-4">
                Cards That Speak From The Heart
              </h1>
              <p className="text-lg text-gray-600 mb-6 md:pr-12">
                Discover our collection of beautifully crafted cards for all of life's special moments and celebrations.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/catalog">
                  <Button variant="primary" size="lg">
                    Shop All Cards
                  </Button>
                </Link>
                <Link to="/catalog/wedding">
                  <Button variant="outline" size="lg">
                    Wedding Collection
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/7178838/pexels-photo-7178838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Cardelion Cards Collection"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-md hidden md:block">
                  <p className="text-[#7D6E83] font-medium">Handcrafted with love</p>
                  <p className="text-gray-600 text-sm">Premium materials & designs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Shop by Category</h2>
            <Link to="/catalog" className="flex items-center text-[#7D6E83] hover:text-[#6a5d6f] font-medium">
              <span>View All</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                key={category}
                to={`/catalog/${category}`} 
                className="group block bg-[#F9F5EB] rounded-lg p-4 text-center transition-transform hover:transform hover:scale-105"
              >
                <div className="mb-3 h-12 flex items-center justify-center">
                  <img
                    src={`https://images.pexels.com/photos/6913125/pexels-photo-6913125.jpeg?auto=compress&cs=tinysrgb&w=100`}
                    alt={category}
                    className="h-10 w-10 object-cover rounded-full"
                  />
                </div>
                <h3 className="text-gray-800 font-medium capitalize">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Cards</h2>
            <Link to="/catalog" className="flex items-center text-[#7D6E83] hover:text-[#6a5d6f] font-medium">
              <span>View All</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id} 
                product={product} 
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Best Sellers</h2>
              <Link to="/catalog" className="flex items-center text-[#7D6E83] hover:text-[#6a5d6f] font-medium">
                <span>View All</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <Card 
                  key={product.id} 
                  product={product} 
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">New Arrivals</h2>
              <Link to="/catalog" className="flex items-center text-[#7D6E83] hover:text-[#6a5d6f] font-medium">
                <span>View All</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <Card 
                  key={product.id} 
                  product={product} 
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F9F5EB] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#DBA39A] flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Wedding Cards</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The wedding invitation cards were absolutely beautiful! The quality exceeded my expectations, and our guests couldn't stop complimenting them."
              </p>
            </div>

            <div className="bg-[#F9F5EB] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#7D6E83] flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">Michael Peterson</p>
                  <p className="text-sm text-gray-500">Anniversary Cards</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Found the perfect anniversary card for my wife. The design was elegant, and the shipping was faster than expected. Will definitely order again!"
              </p>
            </div>

            <div className="bg-[#F9F5EB] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#D0B8A8] flex items-center justify-center text-white font-semibold">
                  J
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">Jennifer Williams</p>
                  <p className="text-sm text-gray-500">Birthday Cards</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I've ordered birthday cards multiple times, and they never disappoint. The cards are always high quality and make such a special impression!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-[#7D6E83]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Our Newsletter</h2>
            <p className="text-gray-200 mb-6">
              Sign up to receive updates on new card collections, special offers, and design inspiration.
            </p>
            <form className="flex flex-col sm:flex-row max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-md focus:outline-none sm:rounded-r-none mb-3 sm:mb-0"
              />
              <button
                type="submit"
                className="bg-[#DBA39A] hover:bg-[#c9948b] text-white px-6 py-3 rounded-md sm:rounded-l-none transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;