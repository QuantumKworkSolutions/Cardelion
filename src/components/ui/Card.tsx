import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

interface CardProps {
  product: Product;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const { isAuthenticated, addToWishlist, removeFromWishlist, isInWishlist } = useAuth();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {isAuthenticated && (
          <button 
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200"
          >
            <Heart 
              size={20} 
              className={inWishlist ? "fill-[#DBA39A] text-[#DBA39A]" : "text-gray-600"} 
            />
          </button>
        )}
        
        {product.featured && (
          <span className="absolute top-2 left-2 bg-[#DBA39A] text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </span>
        )}
        
        {product.bestSeller && (
          <span className="absolute top-2 left-2 bg-[#7D6E83] text-white text-xs font-semibold px-2 py-1 rounded">
            Best Seller
          </span>
        )}
        
        {product.new && (
          <span className="absolute top-2 left-2 bg-[#D0B8A8] text-white text-xs font-semibold px-2 py-1 rounded">
            New
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-[#7D6E83]">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-[#7D6E83] hover:bg-[#6a5d6f] text-white text-sm font-medium py-1.5 px-3 rounded transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;