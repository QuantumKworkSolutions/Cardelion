import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Elegant Wedding Invitation',
    price: 12.99,
    category: 'wedding',
    subcategory: 'invitation',
    description: 'A beautifully designed wedding invitation with gold foil accents and premium cardstock.',
    imageUrl: 'https://images.pexels.com/photos/7178844/pexels-photo-7178844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    featured: true,
    tags: ['elegant', 'gold', 'premium']
  },
  {
    id: '2',
    name: 'Floral Anniversary Card',
    price: 5.99,
    category: 'anniversary',
    description: 'Celebrate years of love with this beautiful floral anniversary card featuring handpainted watercolor flowers.',
    imageUrl: 'https://images.pexels.com/photos/6913125/pexels-photo-6913125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    bestSeller: true,
    tags: ['floral', 'romantic', 'watercolor']
  },
  {
    id: '3',
    name: 'Birthday Celebration Card',
    price: 4.99,
    category: 'birthday',
    description: 'A fun and colorful birthday card perfect for anyone celebrating another trip around the sun.',
    imageUrl: 'https://images.pexels.com/photos/6913128/pexels-photo-6913128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['fun', 'colorful', 'celebration']
  },
  {
    id: '4',
    name: 'Rustic Wedding Thank You Cards',
    price: 15.99,
    category: 'wedding',
    subcategory: 'thank you',
    description: 'Express your gratitude with these rustic-themed wedding thank you cards. Set of 10.',
    imageUrl: 'https://images.pexels.com/photos/7178843/pexels-photo-7178843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['rustic', 'gratitude', 'set']
  },
  {
    id: '5',
    name: 'Congratulations on New Job Card',
    price: 4.49,
    category: 'congratulations',
    description: 'Celebrate a career milestone with this professional yet warm congratulations card.',
    imageUrl: 'https://images.pexels.com/photos/6913131/pexels-photo-6913131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    new: true,
    tags: ['professional', 'career', 'milestone']
  },
  {
    id: '6',
    name: 'Sympathy Card with Flowers',
    price: 5.49,
    category: 'sympathy',
    description: 'A tasteful sympathy card featuring delicate flower illustrations and a heartfelt message.',
    imageUrl: 'https://images.pexels.com/photos/6913139/pexels-photo-6913139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['sympathy', 'tasteful', 'flowers']
  },
  {
    id: '7',
    name: 'Holiday Season Greeting Card',
    price: 3.99,
    category: 'holiday',
    description: 'Send warm wishes during the holiday season with this festive card featuring winter scenes.',
    imageUrl: 'https://images.pexels.com/photos/6913143/pexels-photo-6913143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['holiday', 'winter', 'festive']
  },
  {
    id: '8',
    name: 'Premium Wedding Suite',
    price: 29.99,
    category: 'wedding',
    subcategory: 'suite',
    description: 'Complete wedding stationery suite including invitations, RSVP cards, and info cards with matching envelopes.',
    imageUrl: 'https://images.pexels.com/photos/7178846/pexels-photo-7178846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    featured: true,
    tags: ['premium', 'suite', 'complete set']
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestSellerProducts = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};