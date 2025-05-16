<template>
  <div class="catalog-page">
    <div class="container">
      <div class="catalog-header">
        <h1 class="catalog-title">Каталог программного обеспечения</h1>
        <div class="catalog-breadcrumbs">
          <NuxtLink to="/" class="breadcrumb-item">Главная</NuxtLink>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-item active">Каталог</span>
          <span v-if="activeCategory" class="breadcrumb-separator">/</span>
          <span v-if="activeCategory" class="breadcrumb-item active">{{ activeCategory }}</span>
        </div>
      </div>
      
      <div class="catalog-content">
        <aside class="catalog-sidebar">
          <div class="filter-section">
            <h3 class="filter-title">Категории</h3>
            <div class="filter-options">
              <div 
                v-for="category in categories" 
                :key="category"
                class="filter-option"
                :class="{ active: filterStore.category === category }"
                @click="setCategory(category)"
              >
                {{ category }}
              </div>
              <div 
                class="filter-option"
                :class="{ active: filterStore.category === null }"
                @click="setCategory(null)"
              >
                Все категории
              </div>
            </div>
          </div>
          
          <div class="filter-section">
            <h3 class="filter-title">Цена</h3>
            <div class="filter-price-range">
              <div class="price-inputs">
                <input 
                  type="number" 
                  v-model.number="minPrice" 
                  class="price-input" 
                  min="0"
                  @change="setPriceRange"
                />
                <span class="price-separator">—</span>
                <input 
                  type="number" 
                  v-model.number="maxPrice" 
                  class="price-input" 
                  min="0"
                  @change="setPriceRange"
                />
              </div>
            </div>
          </div>
          
          <div class="filter-section">
            <h3 class="filter-title">Платформа</h3>
            <div class="filter-options">
              <div 
                v-for="platform in platforms" 
                :key="platform"
                class="filter-checkbox"
              >
                <input 
                  type="checkbox" 
                  :id="platform" 
                  :value="platform" 
                  v-model="selectedPlatforms"
                  @change="updatePlatformFilters"
                />
                <label :for="platform">{{ platform }}</label>
              </div>
            </div>
          </div>
          
          <div class="filter-section">
            <h3 class="filter-title">Рейтинг</h3>
            <div class="filter-options">
              <div 
                v-for="rating in [5, 4, 3, 2, 1]" 
                :key="rating"
                class="filter-rating"
                :class="{ active: filterStore.rating === rating }"
                @click="setRating(rating)"
              >
                <span class="rating-stars">{{ '★'.repeat(rating) }}{{ '☆'.repeat(5 - rating) }}</span>
                <span class="rating-label">и выше</span>
              </div>
              <div 
                class="filter-rating"
                :class="{ active: filterStore.rating === null }"
                @click="setRating(null)"
              >
                <span class="rating-label">Все рейтинги</span>
              </div>
            </div>
          </div>
          
          <button class="btn btn-outline-primary btn-block" @click="resetFilters">
            Сбросить фильтры
          </button>
        </aside>
        
        <div class="catalog-main">
          <div class="catalog-toolbar">
            <div class="catalog-count">
              {{ filteredProducts.length }} {{ productCountText }}
            </div>
            
            <div class="catalog-sort">
              <label for="sort-select">Сортировать по:</label>
              <select id="sort-select" v-model="sortBy" class="sort-select">
                <option value="popularity">Популярности</option>
                <option value="price-asc">Цена (по возрастанию)</option>
                <option value="price-desc">Цена (по убыванию)</option>
                <option value="newest">Новизне</option>
              </select>
            </div>
          </div>
          
          <div v-if="productStore.loading" class="loading-spinner">
            Загрузка...
          </div>
          
          <div v-else-if="productStore.error" class="error-message">
            {{ productStore.error }}
          </div>
          
          <div v-else-if="filteredProducts.length === 0" class="no-products">
            <p>По вашему запросу ничего не найдено.</p>
            <button class="btn btn-primary" @click="resetFilters">Сбросить фильтры</button>
          </div>
          
          <div v-else class="products-grid">
            <ProductCard 
              v-for="product in filteredProducts" 
              :key="product.id" 
              :product="product" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useProductStore } from '~/stores/productStore';
import { useFilterStore } from '~/stores/filterStore';
import ProductCard from '~/components/product/ProductCard.vue';

const productStore = useProductStore();
const filterStore = useFilterStore();
const route = useRoute();

// Local state for filters
const minPrice = ref(filterStore.priceRange[0]);
const maxPrice = ref(filterStore.priceRange[1]);
const selectedPlatforms = ref([...filterStore.platform]);
const sortBy = ref(filterStore.sortBy);

// Available filter options
const categories = ['Antivirus', 'Graphics', 'Office', 'Development', 'Utilities'];
const platforms = ['Windows', 'Mac', 'Linux', 'Web'];

// Fetch products on component mount
onMounted(async () => {
  await productStore.fetchProducts();
  
  // Check for URL query parameters
  const category = route.query.category as string;
  if (category) {
    filterStore.setCategory(category);
  }
  
  const search = route.query.search as string;
  if (search) {
    filterStore.setSearchQuery(search);
  }
});

// Computed properties
const activeCategory = computed(() => filterStore.category);

const filteredProducts = computed(() => {
  let filtered = [...productStore.products];
  
  // Filter by category
  if (filterStore.category) {
    filtered = filtered.filter(product => product.category === filterStore.category);
  }
  
  // Filter by price range
  filtered = filtered.filter(product => {
    const price = product.discountPrice || product.price;
    return price >= filterStore.priceRange[0] && price <= filterStore.priceRange[1];
  });
  
  // Filter by platform
  if (filterStore.platform.length > 0) {
    filtered = filtered.filter(product => {
      return product.platform.some(platform => filterStore.platform.includes(platform));
    });
  }
  
  // Filter by rating
  if (filterStore.rating) {
    filtered = filtered.filter(product => product.rating >= filterStore.rating);
  }
  
  // Filter by search query
  if (filterStore.searchQuery) {
    const query = filterStore.searchQuery.toLowerCase();
    filtered = filtered.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    });
  }
  
  // Sort products
  switch (filterStore.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceA - priceB;
      });
      break;
    case 'price-desc':
      filtered.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceB - priceA;
      });
      break;
    case 'newest':
      filtered.sort((a, b) => (a.new === b.new ? 0 : a.new ? -1 : 1));
      break;
    case 'popularity':
    default:
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }
  
  return filtered;
});

const productCountText = computed(() => {
  const count = filteredProducts.value.length;
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'товар';
  } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'товара';
  } else {
    return 'товаров';
  }
});

// Filter methods
const setCategory = (category: string | null) => {
  filterStore.setCategory(category);
};

const setPriceRange = () => {
  filterStore.setPriceRange(minPrice.value, maxPrice.value);
};

const setRating = (rating: number | null) => {
  filterStore.setRating(rating);
};

const updatePlatformFilters = () => {
  filterStore.platform = [...selectedPlatforms.value];
};

const resetFilters = () => {
  filterStore.resetFilters();
  minPrice.value = filterStore.priceRange[0];
  maxPrice.value = filterStore.priceRange[1];
  selectedPlatforms.value = [];
};

// Watch for changes in filter store
watch(() => filterStore.priceRange, (newRange) => {
  minPrice.value = newRange[0];
  maxPrice.value = newRange[1];
}, { deep: true });

watch(() => filterStore.platform, (newPlatforms) => {
  selectedPlatforms.value = [...newPlatforms];
}, { deep: true });

watch(() => filterStore.sortBy, (newSortBy) => {
  sortBy.value = newSortBy;
});

// Watch for changes in sort selection
watch(sortBy, (newValue) => {
  filterStore.setSortBy(newValue);
});
</script>

<style lang="scss" scoped>
.catalog-page {
  padding: $spacer * 2 0;
  
  .catalog-header {
    margin-bottom: $spacer * 2;
  }
  
  .catalog-title {
    margin-bottom: $spacer * 0.5;
  }
  
  .catalog-breadcrumbs {
    display: flex;
    align-items: center;
    font-size: $font-size-sm;
    margin-bottom: $spacer;
    
    .breadcrumb-item {
      color: $gray-600;
      text-decoration: none;
      
      &.active {
        color: $gray-900;
        font-weight: $font-weight-medium;
      }
      
      &:not(.active):hover {
        color: $primary;
        text-decoration: underline;
      }
    }
    
    .breadcrumb-separator {
      margin: 0 $spacer * 0.5;
      color: $gray-500;
    }
  }
  
  .catalog-content {
    display: flex;
    gap: $spacer * 2;
    
    @media (max-width: map-get($breakpoints, lg)) {
      flex-direction: column;
    }
  }
  
  .catalog-sidebar {
    flex: 0 0 280px;
    
    @media (max-width: map-get($breakpoints, lg)) {
      flex: auto;
      width: 100%;
    }
  }
  
  .catalog-main {
    flex: 1;
  }
  
  .filter-section {
    margin-bottom: $spacer * 1.5;
    padding-bottom: $spacer;
    border-bottom: 1px solid $gray-200;
    
    &:last-of-type {
      border-bottom: none;
    }
  }
  
  .filter-title {
    font-size: $font-size-lg;
    margin-bottom: $spacer;
  }
  
  .filter-options {
    display: flex;
    flex-direction: column;
    gap: $spacer * 0.5;
  }
  
  .filter-option {
    cursor: pointer;
    padding: $spacer * 0.25 $spacer * 0.5;
    border-radius: $border-radius;
    transition: $transition-base;
    
    &:hover {
      background-color: $gray-100;
    }
    
    &.active {
      background-color: $primary;
      color: white;
    }
  }
  
  .filter-checkbox {
    display: flex;
    align-items: center;
    
    input {
      margin-right: $spacer * 0.5;
    }
  }
  
  .filter-rating {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: $spacer * 0.25 $spacer * 0.5;
    border-radius: $border-radius;
    transition: $transition-base;
    
    &:hover {
      background-color: $gray-100;
    }
    
    &.active {
      background-color: $primary;
      color: white;
      
      .rating-stars {
        color: $warning;
      }
    }
    
    .rating-stars {
      color: $warning;
      margin-right: $spacer * 0.5;
    }
  }
  
  .filter-price-range {
    .price-inputs {
      display: flex;
      align-items: center;
      gap: $spacer * 0.5;
    }
    
    .price-input {
      width: 100px;
      padding: $spacer * 0.25 $spacer * 0.5;
      border: 1px solid $gray-300;
      border-radius: $border-radius;
      
      &:focus {
        outline: none;
        border-color: $primary;
      }
    }
  }
  
  .btn-block {
    width: 100%;
    margin-top: $spacer;
  }
  
  .catalog-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacer * 1.5;
    padding-bottom: $spacer;
    border-bottom: 1px solid $gray-200;
  }
  
  .catalog-count {
    font-weight: $font-weight-medium;
  }
  
  .catalog-sort {
    display: flex;
    align-items: center;
    gap: $spacer * 0.5;
    
    .sort-select {
      padding: $spacer * 0.25 $spacer * 0.5;
      border: 1px solid $gray-300;
      border-radius: $border-radius;
      
      &:focus {
        outline: none;
        border-color: $primary;
      }
    }
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: $spacer * 1.5;
  }
  
  .loading-spinner, .error-message, .no-products {
    text-align: center;
    padding: $spacer * 3;
    background-color: $gray-100;
    border-radius: $border-radius;
    
    p {
      margin-bottom: $spacer;
    }
  }
}
</style>
