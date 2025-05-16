<template>
  <div class="product-card">
    <div class="product-badges">
      <span v-if="product.new" class="badge badge-primary">Новинка</span>
      <span v-if="product.bestSeller" class="badge badge-secondary">Хит продаж</span>
      <span v-if="product.discountPrice" class="badge badge-success">Скидка</span>
    </div>
    
    <div class="product-image">
      <img :src="productImage" :alt="product.name" class="product-img" />
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
          <span class="rating-stars">{{ ratingStars }}</span>
          <span class="rating-count">({{ product.reviewCount }})</span>
        </div>
      </div>
      
      <div class="product-platforms">
        <span 
          v-for="platform in product.platform" 
          :key="platform" 
          class="platform-badge"
        >
          {{ platform }}
        </span>
      </div>
      
      <p class="product-description">
        {{ truncatedDescription }}
      </p>
      
      <div class="product-footer">
        <div class="product-price">
          <span v-if="product.discountPrice" class="price-original">{{ formatPrice(product.price) }}</span>
          <span class="price-current">{{ formatPrice(product.discountPrice || product.price) }}</span>
        </div>
        
        <div class="product-actions">
          <button class="btn btn-primary btn-sm" @click.prevent="addToCart">
            В корзину
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '~/stores/cartStore';

const cartStore = useCartStore();

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

// Get the first image or a placeholder
const productImage = computed(() => {
  if (props.product.images && props.product.images.length > 0) {
    return props.product.images[0];
  }
  return '/images/products/placeHolder.png';
});

// Format price with currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(price);
};

// Generate rating stars
const ratingStars = computed(() => {
  const rating = props.product.rating;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let stars = '★'.repeat(fullStars);
  if (halfStar) stars += '½';
  stars += '☆'.repeat(emptyStars);
  
  return stars;
});

// Truncate description
const truncatedDescription = computed(() => {
  const maxLength = 100;
  if (props.product.description.length <= maxLength) {
    return props.product.description;
  }
  return props.product.description.substring(0, maxLength) + '...';
});

// Add product to cart
const addToCart = () => {
  cartStore.addToCart({
    id: props.product.id,
    name: props.product.name,
    price: props.product.discountPrice || props.product.price,
    image: productImage.value
  });
};
</script>

<style lang="scss" scoped>
.product-card {
  background-color: white;
  border-radius: $border-radius;
  box-shadow: $box-shadow-sm;
  overflow: hidden;
  transition: $transition-base;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: $box-shadow;
    
    .product-img {
      transform: scale(1.05);
    }
  }
  
  .product-badges {
    position: absolute;
    top: $spacer;
    left: $spacer;
    z-index: 2;
    display: flex;
    gap: $spacer * 0.5;
    flex-wrap: wrap;
    max-width: 70%;
  }
  
  .product-image {
    height: 200px;
    overflow: hidden;
    
    .product-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }
  
  .product-content {
    padding: $spacer;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
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
  
  .product-platforms {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: $spacer * 0.5;
    
    .platform-badge {
      font-size: $font-size-sm * 0.9;
      color: $gray-700;
      background-color: $gray-100;
      padding: 2px 6px;
      border-radius: $border-radius-pill;
      border: 1px solid $gray-300;
    }
  }
  
  .product-description {
    font-size: $font-size-sm;
    color: $gray-700;
    margin-bottom: $spacer;
    flex-grow: 1;
  }
  
  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }
  
  .product-price {
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
</style>
