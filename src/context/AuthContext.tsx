import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [users, setUsers] = useLocalStorage<Record<string, { name: string; email: string; password: string; wishlist: string[] }>>('users', {});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userRecord = Object.values(users).find(u => u.email === email && u.password === password);
    
    if (userRecord) {
      const loggedInUser: User = {
        id: email, // Using email as ID for simplicity
        email: userRecord.email,
        name: userRecord.name,
        wishlist: userRecord.wishlist || []
      };
      setUser(loggedInUser);
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    if (Object.values(users).some(u => u.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser = {
      name,
      email,
      password,
      wishlist: []
    };
    
    setUsers({
      ...users,
      [email]: newUser
    });
    
    // Auto login after registration
    setUser({
      id: email,
      email,
      name,
      wishlist: []
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addToWishlist = (productId: string) => {
    if (!user) return;
    
    const updatedWishlist = [...user.wishlist, productId];
    
    // Update current user
    setUser({
      ...user,
      wishlist: updatedWishlist
    });
    
    // Update in users storage
    setUsers({
      ...users,
      [user.email]: {
        ...users[user.email],
        wishlist: updatedWishlist
      }
    });
  };

  const removeFromWishlist = (productId: string) => {
    if (!user) return;
    
    const updatedWishlist = user.wishlist.filter(id => id !== productId);
    
    // Update current user
    setUser({
      ...user,
      wishlist: updatedWishlist
    });
    
    // Update in users storage
    setUsers({
      ...users,
      [user.email]: {
        ...users[user.email],
        wishlist: updatedWishlist
      }
    });
  };

  const isInWishlist = (productId: string): boolean => {
    return !!user && user.wishlist.includes(productId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};