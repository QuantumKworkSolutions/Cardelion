import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { products, getCategories } from '../data/products';
import Card from '../components/ui/Card';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';

const Catalog: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(category || 'all');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  const categories = getCategories();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update page title based on category
    const categoryTitle = category 
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} Cards` 
      : searchQuery 
        ? `Search Results for "${searchQuery}"` 
        : 'All Cards';
    
    document.title = `Cardelion - ${categoryTitle}`;
    
    // Set active category from URL parameter
    if (category) {
      setActiveCategory(category);
    } else if (searchQuery) {
      setActiveCategory('all');
    }
    
  }, [category, searchQuery]);

  useEffect(() => {
    let filtered = [...products];
    
    // Filter by search query if it exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    } 
    // Filter by category if no search query and category is not 'all'
    else if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.bestSeller && !b.bestSeller) return -1;
          if (!a.bestSeller && b.bestSeller) return 1;
          return 0;
        });
    }
    
    setFilteredProducts(filtered);
  }, [activeCategory, sortOption, priceRange, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Update URL to reflect category change (for direct linking)
    if (category === 'all') {
      window.history.pushState({}, '', '/catalog');
    } else {
      window.history.pushState({}, '', `/catalog/${category}`);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };

  const handleProductClick = (product: Product) => {
    window.location.href = `/product/${product.id}`;
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const pageTitle = searchQuery 
    ? `Search Results for "${searchQuery}"` 
    : activeCategory === 'all' 
      ? 'All Cards' 
      : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Cards`;

  return (
    <div className="min-h-screen bg-[#F9F5EB] pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{pageTitle}</h1>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <button 
              onClick={toggleFilters}
              className="md:hidden flex items-center text-gray-700 mr-4"
            >
              <Filter size={18} className="mr-1" />
              <span>Filters</span>
            </button>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#7D6E83]"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 pr-8">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <SlidersHorizontal size={18} className="mr-2" />
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full text-left py-1 px-2 rounded ${
                      activeCategory === 'all'
                        ? 'bg-[#7D6E83] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Cards
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left py-1 px-2 rounded capitalize ${
                        activeCategory === cat
                          ? 'bg-[#7D6E83] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cat} Cards
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full"
                />
                
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full"
                />
                
                <div className="flex justify-between">
                  <input
                    type="number"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-16 border border-gray-300 rounded p-1 text-center"
                  />
                  <span className="self-center">to</span>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max="50"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-16 border border-gray-300 rounded p-1 text-center"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters - Mobile */}
          {showFilters && (
            <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-sm max-h-[80vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium text-gray-800">Filters</h3>
                  <button 
                    onClick={toggleFilters}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-3">Categories</h4>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => {
                          handleCategoryChange('all');
                          setShowFilters(false);
                        }}
                        className={`w-full text-left py-1.5 px-3 rounded ${
                          activeCategory === 'all'
                            ? 'bg-[#7D6E83] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All Cards
                      </button>
                    </li>
                    {categories.map(cat => (
                      <li key={cat}>
                        <button
                          onClick={() => {
                            handleCategoryChange(cat);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left py-1.5 px-3 rounded capitalize ${
                            activeCategory === cat
                              ? 'bg-[#7D6E83] text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {cat} Cards
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full"
                    />
                    
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full"
                    />
                    
                    <div className="flex justify-between">
                      <input
                        type="number"
                        min="0"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-16 border border-gray-300 rounded p-1 text-center"
                      />
                      <span className="self-center">to</span>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max="50"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-16 border border-gray-300 rounded p-1 text-center"
                      />
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={toggleFilters}
                  className="w-full mt-6 bg-[#7D6E83] text-white py-2 rounded hover:bg-[#6a5d6f] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg text-center">
                <p className="text-lg text-gray-600 mb-4">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setPriceRange([0, 50]);
                    setSortOption('featured');
                  }}
                  className="text-[#7D6E83] hover:text-[#6a5d6f] font-medium"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <Card
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;