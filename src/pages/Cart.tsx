import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/ui/CartItem';
import Button from '../components/ui/Button';

const Cart: React.FC = () => {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Shopping Cart - Cardelion';
  }, []);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login page with a return path to checkout
      window.location.href = '/login?redirect=checkout';
      return;
    }
    
    setIsCheckingOut(true);
    
    // Simulate redirect to checkout page
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9F5EB] pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any cards to your cart yet.</p>
            <Link to="/catalog">
              <Button variant="primary">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F5EB] pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Cart Items ({totalItems})
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-[#DBA39A] hover:text-[#c9948b] text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
              
              <div className="mt-6">
                <Link to="/catalog" className="flex items-center text-[#7D6E83] hover:text-[#6a5d6f] font-medium">
                  <ArrowLeft size={16} className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800 font-medium">$5.00</span>
                </div>
                {totalPrice >= 50 && (
                  <div className="flex justify-between text-green-600">
                    <span>Free Shipping Discount</span>
                    <span>-$5.00</span>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-lg font-semibold text-[#7D6E83]">
                    ${(totalPrice + (totalPrice >= 50 ? 0 : 5)).toFixed(2)}
                  </span>
                </div>
                {totalPrice < 50 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Add ${(50 - totalPrice).toFixed(2)} more to qualify for free shipping.
                  </p>
                )}
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                fullWidth 
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </Button>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;