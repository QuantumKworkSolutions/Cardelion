import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';
import Button from '../components/ui/Button';
import { Product } from '../types';

const Wishlist: React.FC = () => {
  const { user, isAuthenticated, removeFromWishlist } = useAuth();
  const { addToCart } = useCart();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'My Wishlist - Cardelion';
    
    // Redirect if not authenticated
    if (!isAuthenticated) {
      window.location.href = '/login?redirect=wishlist';
      return;
    }
    
    // Get wishlist products
    if (user) {
      const products = user.wishlist
        .map(id => getProductById(id))
        .filter(product => product !== undefined) as Product[];
      
      setWishlistProducts(products);
    }
  }, [isAuthenticated, user]);

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
    setWishlistProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    // Optionally remove from wishlist
    // removeFromWishlist(product.id);
  };

  if (!isAuthenticated) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-[#F9F5EB] pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>
        
        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <Heart size={64} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              You haven't added any cards to your wishlist yet. Browse our collections and add your favorites!
            </p>
            <Link to="/catalog">
              <Button variant="primary">Browse Cards</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {wishlistProducts.map(product => (
                  <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-105" 
                        />
                      </div>
                    </Link>
                    
                    <div className="p-4">
                      <Link to={`/product/${product.id}`} className="block">
                        <h3 className="text-lg font-medium text-gray-800 mb-1">{product.name}</h3>
                        <p className="text-[#7D6E83] font-semibold mb-3">${product.price.toFixed(2)}</p>
                      </Link>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={() => handleAddToCart(product)}
                          className="flex-1"
                        >
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleRemoveFromWishlist(product.id)}
                        >
                          <Heart size={16} className="fill-[#DBA39A] text-[#DBA39A]" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Link to="/catalog" className="flex items-center text-[#7D6E83] hover:text-[#6a5d6f] font-medium">
              <ArrowLeft size={16} className="mr-2" />
              Continue Shopping
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;