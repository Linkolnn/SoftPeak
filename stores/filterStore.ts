import { defineStore } from 'pinia';

interface FilterState {
  category: string | null;
  priceRange: [number, number];
  rating: number | null;
  platform: string[];
  sortBy: 'price-asc' | 'price-desc' | 'popularity' | 'newest';
  searchQuery: string;
}

export const useFilterStore = defineStore('filter', {
  state: (): FilterState => ({
    category: null,
    priceRange: [0, 10000],
    rating: null,
    platform: [],
    sortBy: 'popularity',
    searchQuery: ''
  }),
  
  actions: {
    setCategory(category: string | null) {
      this.category = category;
    },
    
    setPriceRange(min: number, max: number) {
      this.priceRange = [min, max];
    },
    
    setRating(rating: number | null) {
      this.rating = rating;
    },
    
    togglePlatform(platform: string) {
      const index = this.platform.indexOf(platform);
      if (index === -1) {
        this.platform.push(platform);
      } else {
        this.platform.splice(index, 1);
      }
    },
    
    setSortBy(sortBy: FilterState['sortBy']) {
      this.sortBy = sortBy;
    },
    
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },
    
    resetFilters() {
      this.category = null;
      this.priceRange = [0, 10000];
      this.rating = null;
      this.platform = [];
      this.searchQuery = '';
    }
  }
});
