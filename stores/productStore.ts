import { defineStore } from 'pinia';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  platform: string[];
  version: string;
  language: string[];
  size: string;
  systemRequirements: {
    os: string;
    processor: string;
    memory: string;
    storage: string;
    graphics?: string;
  };
  rating: number;
  reviewCount: number;
  images: string[];
  featured: boolean;
  new: boolean;
  bestSeller: boolean;
}

interface ProductState {
  products: Product[];
  featuredProducts: string[];
  loading: boolean;
  error: string | null;
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    featuredProducts: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getProductById: (state) => {
      return (id: string) => state.products.find(product => product.id === id);
    },
    
    getFeaturedProducts: (state) => {
      return state.products.filter(product => state.featuredProducts.includes(product.id));
    },
    
    getNewProducts: (state) => {
      return state.products.filter(product => product.new);
    },
    
    getBestSellers: (state) => {
      return state.products.filter(product => product.bestSeller);
    },
    
    getProductsByCategory: (state) => {
      return (category: string) => state.products.filter(product => product.category === category);
    }
  },
  
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        // In a real app, you would fetch from an API
        // For now, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.products = [
          {
            id: '1',
            name: 'SecureShield Pro',
            description: 'Advanced antivirus protection with real-time threat detection and prevention. SecureShield Pro provides comprehensive security for your devices against malware, ransomware, and other online threats.',
            price: 59.99,
            category: 'Antivirus',
            platform: ['Windows', 'Mac', 'Linux'],
            version: '2025.1',
            language: ['English', 'Spanish', 'French', 'German'],
            size: '175MB',
            systemRequirements: {
              os: 'Windows 10/11, macOS 11+, Ubuntu 20.04+',
              processor: '1.5 GHz or faster',
              memory: '2 GB RAM',
              storage: '500 MB available space'
            },
            rating: 4.8,
            reviewCount: 1245,
            images: ['/images/products/placeHolder.png', '/images/products/placeHolder.png'],
            featured: true,
            new: false,
            bestSeller: true
          },
          {
            id: '2',
            name: 'PixelMaster Pro',
            description: 'Professional photo editing software with advanced tools for photographers and designers. Create stunning visuals with powerful editing capabilities, filters, and effects.',
            price: 149.99,
            discountPrice: 119.99,
            category: 'Graphics',
            platform: ['Windows', 'Mac'],
            version: '12.5',
            language: ['English', 'Japanese', 'German'],
            size: '3.2GB',
            systemRequirements: {
              os: 'Windows 10/11, macOS 11+',
              processor: '2.0 GHz multi-core',
              memory: '8 GB RAM (16 GB recommended)',
              storage: '5 GB available space',
              graphics: 'DirectX 12 compatible'
            },
            rating: 4.7,
            reviewCount: 892,
            images: ['/images/products/placeHolder.png', '/images/products/placeHolder.png'],
            featured: true,
            new: true,
            bestSeller: true
          },
          {
            id: '3',
            name: 'OfficeSuite Premium',
            description: 'Complete office productivity suite with word processor, spreadsheet, presentation, and database applications. Boost your productivity with powerful tools and seamless integration.',
            price: 99.99,
            category: 'Office',
            platform: ['Windows', 'Mac', 'Linux', 'Web'],
            version: '2025',
            language: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'],
            size: '1.8GB',
            systemRequirements: {
              os: 'Windows 10/11, macOS 11+, Ubuntu 20.04+',
              processor: '1.5 GHz or faster',
              memory: '4 GB RAM',
              storage: '3 GB available space'
            },
            rating: 4.5,
            reviewCount: 2156,
            images: ['/images/products/placeHolder.png', '/images/products/placeHolder.png'],
            featured: false,
            new: false,
            bestSeller: true
          },
          {
            id: '4',
            name: 'CodeForge IDE',
            description: 'Powerful integrated development environment for software developers. Supports multiple programming languages with intelligent code completion, debugging tools, and version control integration.',
            price: 199.99,
            category: 'Development',
            platform: ['Windows', 'Mac', 'Linux'],
            version: '2025.2',
            language: ['English'],
            size: '850MB',
            systemRequirements: {
              os: 'Windows 10/11, macOS 11+, Ubuntu 20.04+',
              processor: '2.0 GHz multi-core',
              memory: '8 GB RAM',
              storage: '2 GB available space'
            },
            rating: 4.9,
            reviewCount: 743,
            images: ['/images/products/placeHolder.png', '/images/products/placeHolder.png'],
            featured: true,
            new: true,
            bestSeller: false
          },
          {
            id: '5',
            name: 'VideoStudio Ultimate',
            description: 'Professional video editing software with advanced effects, transitions, and color grading tools. Create stunning videos with intuitive timeline editing and 4K support.',
            price: 249.99,
            discountPrice: 199.99,
            category: 'Graphics',
            platform: ['Windows', 'Mac'],
            version: '15.2',
            language: ['English', 'Spanish', 'French'],
            size: '4.5GB',
            systemRequirements: {
              os: 'Windows 10/11, macOS 11+',
              processor: '3.0 GHz multi-core',
              memory: '16 GB RAM',
              storage: '10 GB available space',
              graphics: 'DirectX 12 compatible, 4GB VRAM'
            },
            rating: 4.6,
            reviewCount: 512,
            images: ['/images/products/placeHolder.png', '/images/products/placeHolder.png'],
            featured: false,
            new: true,
            bestSeller: false
          },
          {
            id: '6',
            name: 'DataBackup Pro',
            description: 'Reliable backup solution for all your important files and data. Automatic scheduled backups, encryption, and cloud storage integration keep your data safe and accessible.',
            price: 79.99,
            category: 'Utilities',
            platform: ['Windows', 'Mac'],
            version: '5.1',
            language: ['English', 'German', 'French'],
            size: '250MB',
            systemRequirements: {
              os: 'Windows 10/11, macOS 11+',
              processor: '1.0 GHz or faster',
              memory: '2 GB RAM',
              storage: '500 MB available space (plus backup storage)'
            },
            rating: 4.4,
            reviewCount: 389,
            images: ['/images/products/placeHolder.png', '/images/products/placeHolder.png'],
            featured: false,
            new: false,
            bestSeller: false
          }
        ];
        
        this.featuredProducts = ['1', '2', '4'];
        
      } catch (error) {
        this.error = 'Failed to fetch products';
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchProductById(id: string) {
      // In a real app, you would fetch a single product from an API
      // For now, we'll just return the product from our local state
      const product = this.getProductById(id);
      
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      
      return product;
    }
  }
});
