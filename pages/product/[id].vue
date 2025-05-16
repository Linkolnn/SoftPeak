<template>
  <div class="product-page">
    <div class="container">
      <!-- Breadcrumbs -->
      <div class="breadcrumbs">
        <NuxtLink to="/" class="breadcrumb-item">Главная</NuxtLink>
        <span class="breadcrumb-separator">/</span>
        <NuxtLink to="/catalog" class="breadcrumb-item">Каталог</NuxtLink>
        <span class="breadcrumb-separator">/</span>
        <NuxtLink 
          :to="`/catalog?category=${product?.category}`" 
          class="breadcrumb-item"
          v-if="product"
        >
          {{ product.category }}
        </NuxtLink>
        <span class="breadcrumb-separator" v-if="product">/</span>
        <span class="breadcrumb-item active" v-if="product">{{ product.name }}</span>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-spinner">
        Загрузка...
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-message">
        {{ error }}
        <button class="btn btn-primary mt-3" @click="goBack">Вернуться назад</button>
      </div>

      <!-- Product Details -->
      <div v-else-if="product" class="product-details">
        <div class="product-gallery">
          <div class="product-image-main">
            <img :src="currentImage" :alt="product.name" class="main-image" />
          </div>
          <div class="product-image-thumbnails" v-if="product.images.length > 1">
            <div 
              v-for="(image, index) in product.images" 
              :key="index"
              class="thumbnail"
              :class="{ active: currentImage === image }"
              @click="currentImage = image"
            >
              <img :src="image" :alt="`${product.name} - изображение ${index + 1}`" />
            </div>
          </div>
        </div>

        <div class="product-info">
          <div class="product-badges" v-if="product.new || product.bestSeller">
            <span v-if="product.new" class="badge badge-primary">Новинка</span>
            <span v-if="product.bestSeller" class="badge badge-secondary">Хит продаж</span>
          </div>

          <h1 class="product-title">{{ product.name }}</h1>

          <div class="product-meta">
            <div class="product-rating">
              <span class="rating-stars">{{ ratingStars }}</span>
              <span class="rating-count">({{ product.reviewCount }} отзывов)</span>
            </div>
            <div class="product-category">
              Категория: 
              <NuxtLink :to="`/catalog?category=${product.category}`">
                {{ product.category }}
              </NuxtLink>
            </div>
          </div>

          <div class="product-price">
            <span v-if="product.discountPrice" class="price-original">{{ formatPrice(product.price) }}</span>
            <span class="price-current">{{ formatPrice(product.discountPrice || product.price) }}</span>
            <span v-if="product.discountPrice" class="price-discount">
              -{{ Math.round((1 - product.discountPrice / product.price) * 100) }}%
            </span>
          </div>

          <div class="product-actions">
            <button class="btn btn-primary btn-lg" @click="addToCart">
              Добавить в корзину
            </button>
            <button class="btn btn-outline-primary btn-lg">
              Купить сейчас
            </button>
          </div>

          <div class="product-platforms">
            <h3 class="info-title">Поддерживаемые платформы:</h3>
            <div class="platforms-list">
              <span 
                v-for="platform in product.platform" 
                :key="platform" 
                class="platform-badge"
              >
                {{ platform }}
              </span>
            </div>
          </div>

          <div class="product-specs">
            <h3 class="info-title">Характеристики:</h3>
            <table class="specs-table">
              <tbody>
                <tr>
                  <td>Версия:</td>
                  <td>{{ product.version }}</td>
                </tr>
                <tr>
                  <td>Языки:</td>
                  <td>{{ product.language.join(', ') }}</td>
                </tr>
                <tr>
                  <td>Размер:</td>
                  <td>{{ product.size }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Product Tabs -->
      <div v-if="product" class="product-tabs">
        <div class="tabs-header">
          <div 
            v-for="tab in tabs" 
            :key="tab.id"
            class="tab-item"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </div>
        </div>

        <div class="tab-content">
          <!-- Description Tab -->
          <div v-if="activeTab === 'description'" class="tab-pane">
            <h2 class="tab-title">Описание</h2>
            <div class="product-description">
              <p>{{ product.description }}</p>
            </div>
          </div>

          <!-- Specifications Tab -->
          <div v-if="activeTab === 'specifications'" class="tab-pane">
            <h2 class="tab-title">Системные требования</h2>
            <table class="specs-table full-width">
              <tbody>
                <tr>
                  <td>Операционная система:</td>
                  <td>{{ product.systemRequirements.os }}</td>
                </tr>
                <tr>
                  <td>Процессор:</td>
                  <td>{{ product.systemRequirements.processor }}</td>
                </tr>
                <tr>
                  <td>Оперативная память:</td>
                  <td>{{ product.systemRequirements.memory }}</td>
                </tr>
                <tr>
                  <td>Свободное место:</td>
                  <td>{{ product.systemRequirements.storage }}</td>
                </tr>
                <tr v-if="product.systemRequirements.graphics">
                  <td>Видеокарта:</td>
                  <td>{{ product.systemRequirements.graphics }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Reviews Tab -->
          <div v-if="activeTab === 'reviews'" class="tab-pane">
            <h2 class="tab-title">Отзывы ({{ product.reviewCount }})</h2>
            <div class="reviews-summary">
              <div class="rating-average">
                <div class="rating-number">{{ product.rating.toFixed(1) }}</div>
                <div class="rating-stars">{{ ratingStars }}</div>
                <div class="rating-count">{{ product.reviewCount }} отзывов</div>
              </div>
            </div>

            <!-- Mock Reviews -->
            <div class="reviews-list">
              <div class="review-item">
                <div class="review-header">
                  <div class="review-author">
                    <div class="author-avatar">АП</div>
                    <div class="author-info">
                      <div class="author-name">Алексей П.</div>
                      <div class="review-date">10 мая 2025</div>
                    </div>
                  </div>
                  <div class="review-rating">★★★★★</div>
                </div>
                <div class="review-content">
                  <p>Отличное программное обеспечение! Полностью соответствует описанию. Установка прошла без проблем, интерфейс интуитивно понятный.</p>
                </div>
              </div>

              <div class="review-item">
                <div class="review-header">
                  <div class="review-author">
                    <div class="author-avatar">ЕК</div>
                    <div class="author-info">
                      <div class="author-name">Елена К.</div>
                      <div class="review-date">2 мая 2025</div>
                    </div>
                  </div>
                  <div class="review-rating">★★★★☆</div>
                </div>
                <div class="review-content">
                  <p>Хороший продукт, но есть небольшие недочеты в интерфейсе. В целом, я довольна покупкой и рекомендую.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Tab -->
          <div v-if="activeTab === 'faq'" class="tab-pane">
            <h2 class="tab-title">Часто задаваемые вопросы</h2>
            <div class="faq-list">
              <div class="faq-item">
                <div class="faq-question" @click="toggleFaq(0)">
                  Как скачать программу после покупки?
                  <span class="faq-toggle">{{ faqOpen[0] ? '−' : '+' }}</span>
                </div>
                <div class="faq-answer" v-if="faqOpen[0]">
                  <p>После успешной оплаты вы получите электронное письмо с ключом активации и ссылкой для скачивания программы. Также вы можете найти ключ и ссылку в вашем личном кабинете в разделе "История заказов".</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question" @click="toggleFaq(1)">
                  Как активировать лицензию?
                  <span class="faq-toggle">{{ faqOpen[1] ? '−' : '+' }}</span>
                </div>
                <div class="faq-answer" v-if="faqOpen[1]">
                  <p>После установки программы запустите ее и найдите в меню пункт "Активация" или "Регистрация". Введите полученный ключ активации и следуйте инструкциям на экране.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question" @click="toggleFaq(2)">
                  Можно ли установить программу на несколько устройств?
                  <span class="faq-toggle">{{ faqOpen[2] ? '−' : '+' }}</span>
                </div>
                <div class="faq-answer" v-if="faqOpen[2]">
                  <p>Это зависит от условий лицензии конкретного продукта. Обычно стандартная лицензия позволяет установку на 1-3 устройства. Подробную информацию вы можете найти в описании продукта или в лицензионном соглашении.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="product && relatedProducts.length > 0" class="related-products">
        <h2 class="section-title">С этим также покупают</h2>
        <div class="product-grid">
          <ProductCard 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id" 
            :product="relatedProduct" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useProductStore } from '~/stores/productStore';
import { useCartStore } from '~/stores/cartStore';
import ProductCard from '~/components/product/ProductCard.vue';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

// State
const loading = ref(true);
const error = ref<string | null>(null);
const currentImage = ref('');
const activeTab = ref('description');
const faqOpen = ref([false, false, false]);

// Get product ID from route
const productId = computed(() => route.params.id as string);

// Tabs configuration
const tabs = [
  { id: 'description', label: 'Описание' },
  { id: 'specifications', label: 'Системные требования' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'faq', label: 'FAQ' }
];

// Fetch product data
onMounted(async () => {
  try {
    loading.value = true;
    await productStore.fetchProducts();
    
    // Set current image to first image
    if (product.value && product.value.images.length > 0) {
      currentImage.value = product.value.images[0];
    }
  } catch (err) {
    error.value = 'Не удалось загрузить информацию о продукте';
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Get product data
const product = computed(() => {
  return productStore.getProductById(productId.value);
});

// Generate rating stars
const ratingStars = computed(() => {
  if (!product.value) return '';
  
  const rating = product.value.rating;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let stars = '★'.repeat(fullStars);
  if (halfStar) stars += '½';
  stars += '☆'.repeat(emptyStars);
  
  return stars;
});

// Format price with currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(price);
};

// Get related products (same category, excluding current product)
const relatedProducts = computed(() => {
  if (!product.value) return [];
  
  return productStore.products
    .filter(p => p.category === product.value?.category && p.id !== product.value?.id)
    .slice(0, 3);
});

// Add product to cart
const addToCart = () => {
  if (!product.value) return;
  
  cartStore.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.discountPrice || product.value.price,
    image: currentImage.value
  });
};

// Toggle FAQ item
const toggleFaq = (index: number) => {
  faqOpen.value[index] = !faqOpen.value[index];
};

// Go back to previous page
const goBack = () => {
  router.back();
};

// SEO metadata
useSeoMeta({
  title: computed(() => product.value ? `${product.value.name} | SoftPeak` : 'Продукт | SoftPeak'),
  description: computed(() => product.value ? product.value.description.substring(0, 160) : 'Описание продукта')
});
</script>

<style lang="scss" scoped>
.product-page {
  padding: $spacer * 2 0;
  
  .breadcrumbs {
    display: flex;
    align-items: center;
    font-size: $font-size-sm;
    margin-bottom: $spacer * 2;
    flex-wrap: wrap;
    
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
  
  .loading-spinner, .error-message {
    text-align: center;
    padding: $spacer * 3;
    background-color: $gray-100;
    border-radius: $border-radius;
  }
  
  .product-details {
    display: flex;
    gap: $spacer * 2;
    margin-bottom: $spacer * 3;
    
    @media (max-width: map-get($breakpoints, lg)) {
      flex-direction: column;
    }
  }
  
  .product-gallery {
    flex: 0 0 45%;
    
    @media (max-width: map-get($breakpoints, lg)) {
      flex: auto;
    }
    
    .product-image-main {
      margin-bottom: $spacer;
      border-radius: $border-radius;
      overflow: hidden;
      
      .main-image {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
    
    .product-image-thumbnails {
      display: flex;
      gap: $spacer * 0.5;
      
      .thumbnail {
        width: 80px;
        height: 80px;
        border-radius: $border-radius;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        
        &.active {
          border-color: $primary;
        }
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  
  .product-info {
    flex: 1;
  }
  
  .product-badges {
    display: flex;
    gap: $spacer * 0.5;
    margin-bottom: $spacer;
  }
  
  .product-title {
    font-size: $h2-font-size;
    margin-bottom: $spacer;
  }
  
  .product-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacer;
    
    @media (max-width: map-get($breakpoints, sm)) {
      flex-direction: column;
      gap: $spacer * 0.5;
    }
    
    .product-rating {
      display: flex;
      align-items: center;
      
      .rating-stars {
        color: $warning;
        margin-right: $spacer * 0.5;
      }
      
      .rating-count {
        color: $gray-600;
      }
    }
    
    .product-category {
      color: $gray-700;
      
      a {
        color: $primary;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  
  .product-price {
    display: flex;
    align-items: center;
    margin-bottom: $spacer * 1.5;
    
    .price-original {
      font-size: $font-size-lg;
      color: $gray-600;
      text-decoration: line-through;
      margin-right: $spacer;
    }
    
    .price-current {
      font-size: $h3-font-size;
      font-weight: $font-weight-bold;
      color: $primary;
      margin-right: $spacer;
    }
    
    .price-discount {
      background-color: $success;
      color: white;
      padding: $spacer * 0.25 $spacer * 0.5;
      border-radius: $border-radius;
      font-size: $font-size-sm;
      font-weight: $font-weight-bold;
    }
  }
  
  .product-actions {
    display: flex;
    gap: $spacer;
    margin-bottom: $spacer * 2;
    
    @media (max-width: map-get($breakpoints, sm)) {
      flex-direction: column;
    }
    
    .btn-lg {
      padding: $spacer * 0.75 $spacer * 1.5;
    }
  }
  
  .info-title {
    font-size: $font-size-lg;
    margin-bottom: $spacer * 0.5;
  }
  
  .product-platforms {
    margin-bottom: $spacer * 1.5;
    
    .platforms-list {
      display: flex;
      flex-wrap: wrap;
      gap: $spacer * 0.5;
    }
    
    .platform-badge {
      background-color: $gray-100;
      border: 1px solid $gray-300;
      padding: $spacer * 0.25 $spacer * 0.75;
      border-radius: $border-radius-pill;
      font-size: $font-size-sm;
    }
  }
  
  .specs-table {
    width: 100%;
    
    &.full-width {
      width: 100%;
    }
    
    td {
      padding: $spacer * 0.5;
      border-bottom: 1px solid $gray-200;
      
      &:first-child {
        font-weight: $font-weight-medium;
        width: 40%;
      }
    }
  }
  
  .product-tabs {
    margin-bottom: $spacer * 3;
    
    .tabs-header {
      display: flex;
      border-bottom: 1px solid $gray-300;
      margin-bottom: $spacer * 2;
      
      @media (max-width: map-get($breakpoints, md)) {
        flex-wrap: wrap;
      }
    }
    
    .tab-item {
      padding: $spacer $spacer * 1.5;
      cursor: pointer;
      font-weight: $font-weight-medium;
      border-bottom: 2px solid transparent;
      transition: $transition-base;
      
      &:hover {
        color: $primary;
      }
      
      &.active {
        color: $primary;
        border-bottom-color: $primary;
      }
      
      @media (max-width: map-get($breakpoints, md)) {
        padding: $spacer * 0.5 $spacer;
      }
    }
    
    .tab-title {
      margin-bottom: $spacer;
    }
  }
  
  .reviews-summary {
    display: flex;
    margin-bottom: $spacer * 2;
    
    .rating-average {
      text-align: center;
      margin-right: $spacer * 3;
    }
    
    .rating-number {
      font-size: $h1-font-size;
      font-weight: $font-weight-bold;
      color: $gray-900;
    }
    
    .rating-stars {
      color: $warning;
      font-size: $font-size-lg;
      margin: $spacer * 0.5 0;
    }
    
    .rating-count {
      color: $gray-600;
    }
  }
  
  .reviews-list {
    .review-item {
      border-bottom: 1px solid $gray-200;
      padding-bottom: $spacer;
      margin-bottom: $spacer;
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    .review-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: $spacer * 0.5;
    }
    
    .review-author {
      display: flex;
      align-items: center;
    }
    
    .author-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: $primary;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: $font-weight-bold;
      margin-right: $spacer * 0.75;
    }
    
    .author-name {
      font-weight: $font-weight-medium;
    }
    
    .review-date {
      font-size: $font-size-sm;
      color: $gray-600;
    }
    
    .review-rating {
      color: $warning;
    }
  }
  
  .faq-list {
    .faq-item {
      border-bottom: 1px solid $gray-200;
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    .faq-question {
      padding: $spacer 0;
      font-weight: $font-weight-medium;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      
      &:hover {
        color: $primary;
      }
    }
    
    .faq-toggle {
      font-weight: $font-weight-bold;
      color: $gray-600;
    }
    
    .faq-answer {
      padding-bottom: $spacer;
      color: $gray-700;
    }
  }
  
  .related-products {
    .section-title {
      text-align: center;
      margin-bottom: $spacer * 2;
      position: relative;
      
      &::after {
        content: '';
        display: block;
        width: 60px;
        height: 3px;
        background-color: $primary;
        margin: $spacer * 0.5 auto 0;
      }
    }
    
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: $spacer * 1.5;
    }
  }
}
</style>
