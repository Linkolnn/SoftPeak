<template>
  <div class="profile-favorites-page">
    <div class="container">
      <h1 class="page-title">Избранное</h1>
      
      <div class="favorites-content">
        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>Загрузка избранных товаров...</p>
        </div>
        
        <div v-else-if="!favorites.length" class="empty-state">
          <PlaceholderImage 
            width="200px" 
            height="150px" 
            bgColor="#f5f5f5" 
            fontSize="1.2rem"
          />
          <p class="empty-text">У вас пока нет избранных товаров</p>
          <NuxtLink to="/catalog" class="btn btn-primary">
            Перейти в каталог
          </NuxtLink>
        </div>
        
        <div v-else class="favorites-grid">
          <div v-for="product in favorites" :key="product.id" class="favorite-card">
            <button class="remove-favorite" @click="removeFromFavorites(product.id)" title="Удалить из избранного">
              <span class="remove-icon">×</span>
            </button>
            
            <div class="product-image">
              <img :src="product.image || '/images/products/placeHolder.png'" :alt="product.name" />
            </div>
            
            <div class="product-content">
              <h3 class="product-title">
                <NuxtLink :to="`/product/${product.id}`" class="product-link">
                  {{ product.name }}
                </NuxtLink>
              </h3>
              
              <div class="product-meta">
                <div class="product-category">{{ product.category }}</div>
                <div class="product-rating">
                  <span class="rating-stars">{{ getRatingStars(product.rating) }}</span>
                  <span class="rating-count">({{ product.reviewCount }})</span>
                </div>
              </div>
              
              <div class="product-price">
                <span v-if="product.discountPrice" class="price-original">{{ formatPrice(product.price) }}</span>
                <span class="price-current">{{ formatPrice(product.discountPrice || product.price) }}</span>
              </div>
              
              <div class="product-actions">
                <button class="btn btn-primary btn-sm" @click="addToCart(product)">
                  В корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '~/stores/authStore';
import { useCartStore } from '~/stores/cartStore';
import { useFavoritesStore } from '~/stores/favoritesStore';

// Define middleware to protect this route
definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const router = useRouter();

// Check if user is authenticated
if (!authStore.isAuthenticated) {
  router.push('/login');
}

// Get favorites from store
const favorites = computed(() => favoritesStore.favorites);

const isLoading = ref(false);

// Helper methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price);
};

const getRatingStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let stars = '★'.repeat(fullStars);
  if (halfStar) stars += '½';
  stars += '☆'.repeat(emptyStars);
  
  return stars;
};

// Actions
const removeFromFavorites = (productId: number) => {
  if (confirm('Вы уверены, что хотите удалить этот товар из избранного?')) {
    favoritesStore.removeFromFavorites(productId);
    
    // Save to localStorage if user is authenticated
    if (authStore.user?.id) {
      favoritesStore.saveUserFavorites(authStore.user.id);
    }
  }
};

const addToCart = (product: any) => {
  cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: product.discountPrice || product.price,
    image: product.image
  });
  
  // Show notification
  alert('Товар добавлен в корзину');
};

// Fetch favorites on component mount
onMounted(async () => {
  isLoading.value = true;
  
  try {
    // If we have no favorites and user is authenticated, try to load them
    if (favorites.value.length === 0 && authStore.user?.id) {
      favoritesStore.loadUserFavorites(authStore.user.id);
    }
    
    // If we still have no favorites, add some demo products
    if (favorites.value.length === 0) {
      // Add some demo products
      const demoProducts = [
        {
          id: 1,
          name: 'Adobe Photoshop',
          price: 12990,
          discountPrice: 9990,
          category: 'Графика',
          rating: 4.8,
          reviewCount: 245,
          image: '/images/products/placeHolder.png'
        },
        {
          id: 2,
          name: 'Microsoft Office',
          price: 8990,
          discountPrice: null,
          category: 'Офисные программы',
          rating: 4.5,
          reviewCount: 189,
          image: '/images/products/placeHolder.png'
        }
      ];
      
      // Add demo products to favorites
      demoProducts.forEach(product => {
        favoritesStore.addToFavorites(product);
      });
      
      // Save to localStorage if user is authenticated
      if (authStore.user?.id) {
        favoritesStore.saveUserFavorites(authStore.user.id);
      }
    }
  } catch (error) {
    console.error('Error fetching favorites:', error);
  } finally {
    isLoading.value = false;
  }
});

// SEO metadata
useSeoMeta({
  title: 'Избранное | SoftPeak',
  description: 'Ваши избранные товары в интернет-магазине SoftPeak'
});
</script>

<style lang="scss" scoped>
.profile-favorites-page {
  padding: $spacer * 2 0;
  
  .page-title {
    margin-bottom: $spacer * 2;
  }
  
  .loading-state, .empty-state {
    text-align: center;
    padding: $spacer * 3;
    background-color: white;
    border-radius: $border-radius;
    box-shadow: $box-shadow-sm;
  }
  
  .loading-state {
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba($primary, 0.1);
      border-left-color: $primary;
      border-radius: 50%;
      margin: 0 auto $spacer;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  }
  
  .empty-state {
    .empty-text {
      margin: $spacer 0;
      color: $gray-600;
    }
  }
  
  .favorites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $spacer * 1.5;
  }
  
  .favorite-card {
    background-color: white;
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: $box-shadow-sm;
    position: relative;
    transition: $transition-base;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: $box-shadow;
    }
    
    .remove-favorite {
      position: absolute;
      top: $spacer * 0.5;
      right: $spacer * 0.5;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: rgba($dark, 0.5);
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 2;
      transition: $transition-base;
      
      &:hover {
        background-color: $danger;
      }
      
      .remove-icon {
        font-size: 1.5rem;
        line-height: 1;
      }
    }
    
    .product-image {
      height: 200px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }
    
    .product-content {
      padding: $spacer;
    }
    
    .product-title {
      font-size: $h5-font-size;
      margin-bottom: $spacer * 0.5;
      
      .product-link {
        color: $gray-900;
        text-decoration: none;
        
        &:hover {
          color: $primary;
        }
      }
    }
    
    .product-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $spacer * 0.5;
      
      .product-category {
        font-size: $font-size-sm;
        color: $gray-600;
        background-color: $gray-200;
        padding: 2px 8px;
        border-radius: $border-radius-pill;
      }
      
      .product-rating {
        font-size: $font-size-sm;
        display: flex;
        align-items: center;
        
        .rating-stars {
          color: $warning;
          margin-right: 4px;
        }
        
        .rating-count {
          color: $gray-600;
        }
      }
    }
    
    .product-price {
      margin-bottom: $spacer;
      
      .price-original {
        font-size: $font-size-sm;
        color: $gray-600;
        text-decoration: line-through;
        margin-right: $spacer * 0.5;
      }
      
      .price-current {
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
        color: $primary;
      }
    }
    
    .product-actions {
      .btn-sm {
        padding: $spacer * 0.25 $spacer * 0.75;
      }
    }
  }
}
</style>
