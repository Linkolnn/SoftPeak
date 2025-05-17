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
        <FontAwesomeIcon icon="circle-notch" spin size="2x" class="mb-2" />
        <div>Загрузка...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-message">
        <FontAwesomeIcon icon="exclamation-circle" size="2x" class="mb-2 text-danger" />
        <div>{{ error }}</div>
        <button class="btn btn-primary mt-3" @click="goBack">
          <FontAwesomeIcon icon="arrow-left" class="mr-1" /> Вернуться назад
        </button>
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
              <span class="rating-stars">
                <FontAwesomeIcon v-for="i in Math.floor(product.rating)" :key="'star-'+i" icon="star" />
                <FontAwesomeIcon v-if="product.rating % 1 >= 0.5" icon="star-half-alt" />
                <FontAwesomeIcon v-for="i in Math.floor(5 - product.rating)" :key="'empty-star-'+i" icon="star" class="empty-star" />
              </span>
              <span class="rating-count">({{ product.reviewCount }} отзывов)</span>
            </div>
            <div class="product-category">
              <FontAwesomeIcon icon="tags" class="mr-1" /> Категория: 
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
              <FontAwesomeIcon icon="shopping-cart" class="mr-1" /> Добавить в корзину
            </button>
            <button class="btn btn-outline-primary btn-lg">
              <FontAwesomeIcon icon="credit-card" class="mr-1" /> Купить сейчас
            </button>
          </div>

          <div class="product-platforms">
            <h3 class="info-title"><FontAwesomeIcon icon="desktop" class="mr-1" /> Поддерживаемые платформы:</h3>
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
            <h3 class="info-title"><FontAwesomeIcon icon="info-circle" class="mr-1" /> Характеристики:</h3>
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
            <FontAwesomeIcon :icon="getTabIcon(tab.id)" class="mr-1" /> {{ tab.label }}
          </div>
        </div>

        <div class="tab-content">
          <!-- Description Tab -->
          <div v-if="activeTab === 'description'" class="tab-pane">
            <h2 class="tab-title"><FontAwesomeIcon icon="file-alt" class="mr-1" /> Описание</h2>
            <div class="product-description">
              <p>{{ product.description }}</p>
            </div>
          </div>

          <!-- Specifications Tab -->
          <div v-if="activeTab === 'specifications'" class="tab-pane">
            <h2 class="tab-title"><FontAwesomeIcon icon="laptop" class="mr-1" /> Системные требования</h2>
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
            <h2 class="tab-title"><FontAwesomeIcon icon="comment" class="mr-1" /> Отзывы ({{ product.reviewCount }})</h2>
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
            <h2 class="tab-title"><FontAwesomeIcon icon="question-circle" class="mr-1" /> Частые вопросы</h2>
            <div class="faq-list">
              <div class="faq-item">
                <div class="faq-question" @click="toggleFaq(0)">
                  <FontAwesomeIcon icon="download" class="mr-1" /> Как установить программу?
                  <span class="faq-toggle">
                    <FontAwesomeIcon :icon="faqOpen[0] ? 'minus' : 'plus'" />
                  </span>
                </div>
                <div class="faq-answer" v-if="faqOpen[0]">
                  <p>После покупки вы получите ссылку на скачивание инсталлятора. Запустите его и следуйте инструкциям на экране. После установки вы можете запустить программу через меню Пуск или ярлык на рабочем столе.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question" @click="toggleFaq(1)">
                  <FontAwesomeIcon icon="key" class="mr-1" /> Как активировать лицензию?
                  <span class="faq-toggle">
                    <FontAwesomeIcon :icon="faqOpen[1] ? 'minus' : 'plus'" />
                  </span>
                </div>
                <div class="faq-answer" v-if="faqOpen[1]">
                  <p>После установки программы запустите ее и найдите в меню пункт "Активация" или "Регистрация". Введите полученный ключ активации и следуйте инструкциям на экране.</p>
                </div>
              </div>

              <div class="faq-item">
                <div class="faq-question" @click="toggleFaq(2)">
                  <FontAwesomeIcon icon="laptop" class="mr-1" /> Могу ли я использовать программу на нескольких устройствах?
                  <span class="faq-toggle">
                    <FontAwesomeIcon :icon="faqOpen[2] ? 'minus' : 'plus'" />
                  </span>
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
        <h2 class="section-title"><FontAwesomeIcon icon="th-large" class="mr-1" /> С этим также покупают</h2>
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

// Get icon for tab
const getTabIcon = (tabId: string) => {
  switch (tabId) {
    case 'description':
      return 'file-alt';
    case 'specifications':
      return 'laptop';
    case 'reviews':
      return 'comment';
    case 'faq':
      return 'question-circle';
    default:
      return 'info-circle';
  }
};

// SEO metadata
useSeoMeta({
  title: computed(() => product.value ? `${product.value.name} | SoftPeak` : 'Продукт | SoftPeak'),
  description: computed(() => product.value ? product.value.description.substring(0, 160) : 'Описание продукта')
});
</script>

<style lang="scss" scoped>
  .loading-spinner, .error-message {
    text-align: center;
    padding: $spacer * 3;
    margin: $spacer * 2 0;
    background-color: $gray-100;
    border-radius: $border-radius;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .mb-2 {
    margin-bottom: $spacer * 0.75;
  }
  
  .mr-1 {
    margin-right: $spacer * 0.25;
  }
  
  .text-danger {
    color: $danger;
  }
  
  .product-details {
    display: flex;
    gap: $spacer * 2;
    margin-bottom: $spacer * 3;
    
    @media (max-width: map-get($breakpoints, lg)) {
      flex-direction: column;
    }
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
      margin-bottom: $spacer * 0.5;
      
      .rating-stars {
        color: $warning;
        margin-right: $spacer * 0.5;
        display: flex;
        align-items: center;
        
        .empty-star {
          color: $gray-300;
        }
        
        svg {
          margin-right: 2px;
        }
      }
      
      .rating-count {
        color: $gray-600;
        font-size: $font-size-sm;
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
  
  .faq-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $gray-600;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
  
  .faq-answer {
    padding-bottom: $spacer;
    color: $gray-700;
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
</style>
