import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { Heart, ChevronRight, ChevronLeft } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { isAuthenticated, addToWishlist, removeFromWishlist, isInWishlist } = useAuth();
  
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (product) {
      document.title = `${product.name} - Cardelion`;
    } else {
      document.title = 'Product Not Found - Cardelion';
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9F5EB] pt-24 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/catalog">
            <Button variant="primary">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isAuthenticated && isInWishlist(product.id);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    
    // Reset notification after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) return;
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F5EB] pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-[#7D6E83]">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/catalog" className="hover:text-[#7D6E83]">Shop</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to={`/catalog/${product.category}`} className="hover:text-[#7D6E83] capitalize">{product.category}</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="font-medium text-gray-800">{product.name}</span>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="h-96 md:h-full relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                
                {product.featured && (
                  <span className="absolute top-4 left-4 bg-[#DBA39A] text-white text-xs font-semibold px-2 py-1 rounded">
                    Featured
                  </span>
                )}
                
                {product.bestSeller && (
                  <span className="absolute top-4 left-4 bg-[#7D6E83] text-white text-xs font-semibold px-2 py-1 rounded">
                    Best Seller
                  </span>
                )}
                
                {product.new && (
                  <span className="absolute top-4 left-4 bg-[#D0B8A8] text-white text-xs font-semibold px-2 py-1 rounded">
                    New
                  </span>
                )}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <span className="text-xl font-semibold text-[#7D6E83]">${product.price.toFixed(2)}</span>
                {product.subcategory && (
                  <span className="ml-4 text-sm text-gray-600 capitalize">{product.subcategory}</span>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-gray-700 mr-4">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={decrementQuantity}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-12 text-center border-none focus:ring-0"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                
                {isAuthenticated && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={handleWishlistToggle}
                    className="flex items-center justify-center"
                  >
                    <Heart 
                      size={18} 
                      className={`mr-2 ${inWishlist ? "fill-[#DBA39A] text-[#DBA39A]" : ""}`} 
                    />
                    {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                )}
              </div>
              
              {addedToCart && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded mb-6 flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Added to cart successfully!</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Product Details</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>Category: <span className="capitalize">{product.category}</span></li>
                  {product.subcategory && (
                    <li>Type: <span className="capitalize">{product.subcategory}</span></li>
                  )}
                  {product.tags && product.tags.length > 0 && (
                    <li>
                      Tags: {product.tags.map((tag, index) => (
                        <span key={tag}>
                          <span className="capitalize">{tag}</span>
                          {index < product.tags!.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;