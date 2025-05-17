import { defineStore } from 'pinia';
import { persistedState } from '~/plugins/pinia-persistence';
import productsData from '~/data/products.json';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  tags?: string[];
  features?: string[];
  images: string[];
  inStock: boolean;
  popularity?: number;
  license?: string;
}

interface ProductState {
  products: Product[];
  featuredProducts: number[];
  loading: boolean;
  error: string | null;
  viewedProducts: number[];
  purchasedProducts: number[];
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    featuredProducts: [],
    loading: false,
    error: null,
    viewedProducts: [],
    purchasedProducts: []
  }),
  
  getters: {
    getProductById: (state) => {
      return (id: number) => state.products.find(product => product.id === id);
    },
    
    getFeaturedProducts: (state) => {
      return state.products.filter(product => state.featuredProducts.includes(product.id));
    },
    
    getPopularProducts: (state) => {
      return [...state.products].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 6);
    },
    
    getDiscountedProducts: (state) => {
      return state.products.filter(product => product.discountPrice !== null && product.discountPrice !== undefined);
    },
    
    getProductsByCategory: (state) => {
      return (category: string) => state.products.filter(product => product.category === category);
    },
    
    getViewedProducts: (state) => {
      return state.products.filter(product => state.viewedProducts.includes(product.id));
    },
    
    getPurchasedProducts: (state) => {
      return state.products.filter(product => state.purchasedProducts.includes(product.id));
    }
  },
  
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        // Load products from the JSON file
        this.products = productsData.products;
        
        // Set featured products (top 3 by popularity)
        this.featuredProducts = this.products
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
          .slice(0, 3)
          .map(product => product.id);
        
      } catch (error) {
        this.error = 'Failed to fetch products';
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchProductById(id: number) {
      // First check if we already have the product in our state
      let product = this.getProductById(id);
      
      // If not found in state, try to fetch it
      if (!product) {
        // In a real app with an API, you would fetch the product here
        // For now, we'll load all products and then find the one we need
        if (this.products.length === 0) {
          await this.fetchProducts();
        }
        
        product = this.getProductById(id);
      }
      
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      
      // Add to viewed products if not already there
      if (!this.viewedProducts.includes(id)) {
        this.viewedProducts.push(id);
        
        // Keep only the last 10 viewed products
        if (this.viewedProducts.length > 10) {
          this.viewedProducts.shift();
        }
      }
      
      return product;
    },
    
    // Add a product to the purchased products list
    addToPurchasedProducts(productId: number) {
      if (!this.purchasedProducts.includes(productId)) {
        this.purchasedProducts.push(productId);
      }
    },
    
    // Add multiple products to the purchased products list
    addMultipleToPurchasedProducts(productIds: number[]) {
      productIds.forEach(id => {
        if (!this.purchasedProducts.includes(id)) {
          this.purchasedProducts.push(id);
        }
      });
    },
    
    // Clear the purchased products list
    clearPurchasedProducts() {
      this.purchasedProducts = [];
    },
    
    // Set user ID to load user-specific data
    setUserId(userId: string) {
      // Load user-specific viewed and purchased products
      this.loadUserProductData(userId);
    },
    
    // Load user-specific product data from localStorage
    loadUserProductData(userId: string) {
      try {
        const viewedData = localStorage.getItem(`viewed_products_${userId}`);
        if (viewedData) {
          this.viewedProducts = JSON.parse(viewedData);
        }
        
        const purchasedData = localStorage.getItem(`purchased_products_${userId}`);
        if (purchasedData) {
          this.purchasedProducts = JSON.parse(purchasedData);
        }
      } catch (e) {
        console.error('Failed to load user product data:', e);
      }
    },
    
    // Save user-specific product data to localStorage
    saveUserProductData(userId: string) {
      if (userId) {
        localStorage.setItem(`viewed_products_${userId}`, JSON.stringify(this.viewedProducts));
        localStorage.setItem(`purchased_products_${userId}`, JSON.stringify(this.purchasedProducts));
      }
    }
  },
  
  persist: {
    storage: persistedState.localStorage,
    paths: ['products', 'featuredProducts', 'viewedProducts', 'purchasedProducts'],
  }
});
