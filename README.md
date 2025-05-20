# SoftPeak - Интернет-магазин программного обеспечения

## Описание проекта

SoftPeak - это современный интернет-магазин, специализирующийся на продаже программного обеспечения различных категорий. Проект разработан с использованием Nuxt 3, Pinia и Sass для создания удобного пользовательского интерфейса и оптимального опыта покупок.

## Функциональность

- Просмотр каталога программного обеспечения с фильтрацией и сортировкой
- Детальные страницы продуктов с описанием, системными требованиями и отзывами
- Корзина покупок с возможностью применения промокодов
- Оформление заказа с выбором способа оплаты
- Личный кабинет пользователя с историей заказов
- Адаптивный дизайн для мобильных устройств и десктопов

## Технологический стек

- **Nuxt 3** - современный фреймворк для создания веб-приложений на Vue.js
- **Pinia** - управление состоянием приложения
- **Sass** - препроцессор CSS для стилизации компонентов
- **Vue Router** - маршрутизация в приложении
- **Font Awesome** - библиотека иконок для улучшения пользовательского интерфейса

## Структура проекта

- `/components` - Vue компоненты, разделенные по категориям
- `/layouts` - шаблоны страниц
- `/pages` - страницы приложения
- `/stores` - хранилища Pinia для управления состоянием
- `/assets` - статические ресурсы (стили, изображения)
- `/plugins` - плагины Nuxt
- `/public` - публичные файлы

## Основные страницы

- **Главная страница** - `/`
- **Каталог** - `/catalog`
- **Страница продукта** - `/product/[id]`
- **Корзина** - `/cart`
- **Оформление заказа** - `/checkout`
- **Личный кабинет** - `/profile`
- **Акции** - `/promotions`
- **О нас** - `/about`
- **Контакты** - `/contacts`

## Документация компонентов

### Основные компоненты

#### Описание компонента `app.vue`

Компонент `app.vue` является корневым компонентом приложения. Он включает в себя основной макет приложения и отвечает за отображение текущей страницы в зависимости от маршрута.

### Объяснение кода в `app.vue`

- `<NuxtLayout>` - компонент макета, который обертывает содержимое страницы.
- `<NuxtPage />` - компонент, отвечающий за отображение текущей страницы в зависимости от маршрута.
- В скрипте настраиваются SEO-метаданные для всего приложения.

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// SEO configuration
useSeoMeta({
  title: 'SoftPeak - Premium Software Store',
  ogTitle: 'SoftPeak - Premium Software Store',
  description: 'Your trusted source for premium software solutions. Find the best software for your needs at competitive prices.',
  ogDescription: 'Your trusted source for premium software solutions. Find the best software for your needs at competitive prices.',
});
</script>
```

### Компоненты макета

#### Описание компонента `components/layout/Header.vue`

Компонент `Header.vue` отвечает за отображение верхней части сайта, включая логотип, навигационное меню, поиск и иконки корзины/профиля. Компонент адаптивен и меняет свое отображение в зависимости от размера экрана.

**Основные элементы:**
- Логотип с ссылкой на главную страницу
- Навигационное меню с основными разделами сайта
- Поисковая строка
- Иконки корзины и личного кабинета с индикаторами количества товаров
- Мобильное меню для маленьких экранов

#### Описание компонента `components/layout/Footer.vue`

Компонент `Footer.vue` отображает нижнюю часть сайта с информацией о компании, ссылками на разделы сайта, контактной информацией и формой подписки на новости.

**Основные элементы:**
- Логотип и краткая информация о компании
- Ссылки на основные разделы сайта
- Контактная информация (телефон, email, адрес)
- Форма подписки на новости
- Информация об авторских правах

### Компоненты страниц

#### Описание компонента `pages/index.vue`

Главная страница сайта, отображающая баннеры, популярные товары, категории и акции. Компонент использует данные из различных хранилищ для отображения актуальной информации.

### Объяснение кода в `pages/index.vue`

- **Секция Hero** - верхний баннер с призывом к действию и информацией о скидках.
- **Секция популярных продуктов** - отображает карточки популярных товаров из хранилища `productStore`.
- **Секция категорий** - показывает основные категории товаров с иконками Font Awesome.
- **Секция акций** - отображает актуальные акции и скидки.
- **Секция отзывов** - показывает отзывы клиентов о магазине и продуктах.

**Основные элементы:**
- Слайдер с баннерами акций и новинок
- Блок популярных категорий
- Карусель с популярными товарами
- Блок с акционными предложениями
- Информационные блоки о преимуществах магазина

```vue
<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Премиальное программное обеспечение для любых задач</h1>
          <p class="hero-subtitle">Найдите идеальные решения для работы, творчества и безопасности</p>
          <div class="hero-cta">
            <NuxtLink to="/catalog" class="btn btn-primary btn-lg">Перейти в каталог</NuxtLink>
          </div>
        </div>
        <div class="hero-image">
          <!-- Placeholder for hero image -->
          <div class="hero-image-placeholder">
            <PlaceholderImage 
              width="100%" 
              height="300px" 
              bgColor="rgba(51, 102, 255, 0.1)" 
              fontSize="2rem"
            />
            <div class="hero-badge">Скидка 30% на антивирусы!</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Products Section -->
    <section class="products-section">
      <div class="container">
        <h2 class="section-title">Популярные продукты</h2>
        <ClientOnly>
          <div v-if="productStore.loading" class="loading-spinner">
            Загрузка...
          </div>
          <div v-else-if="productStore.error" class="error-message">
            {{ productStore.error }}
          </div>
          <div v-else class="product-grid">
            <ProductCard 
              v-for="product in featuredProducts" 
              :key="product.id" 
              :product="product" 
            />
          </div>
          <template #fallback>
            <div class="loading-spinner">Загрузка продуктов...</div>
          </template>
        </ClientOnly>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">Категории ПО</h2>
        <div class="categories-grid">
          <div class="category-card" @click="navigateToCategory('Antivirus')">
            <div class="category-icon">
              <FontAwesomeIcon icon="shield" size="2x" />
            </div>
            <h3 class="category-title">Антивирусы</h3>
            <p class="category-description">Защита от вредоносных программ и кибератак</p>
          </div>
          <!-- Другие категории -->
        </div>
      </div>
    </section>

    <!-- Promotions Section -->
    <section class="promotions-section">
      <div class="container">
        <h2 class="section-title">Акции и скидки</h2>
        <div class="promotions-grid">
          <div class="promotion-card">
            <div class="promotion-content">
              <div class="promotion-badge">-30%</div>
              <h3 class="promotion-title">Антивирусы</h3>
              <p class="promotion-description">Скидка 30% на все антивирусные программы до конца месяца</p>
              <NuxtLink to="/catalog?category=Antivirus" class="btn btn-outline-primary">Подробнее</NuxtLink>
            </div>
          </div>
          <!-- Другие акции -->
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">Отзывы клиентов</h2>
        <div class="testimonials-slider">
          <div class="testimonial-card">
            <div class="testimonial-rating">★★★★★</div>
            <p class="testimonial-text">
              Отличный сервис! Купил антивирус со скидкой, установка прошла без проблем. Рекомендую!
            </p>
            <div class="testimonial-author">
              <div class="testimonial-info">
                <div class="testimonial-name">Иван П.</div>
                <div class="testimonial-date">10 мая 2025</div>
              </div>
            </div>
          </div>
          <!-- Другие отзывы -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useProductStore } from '~/stores/productStore';
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const router = useRouter();

// Загрузка данных при монтировании компонента
onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts();
  }
});

// Получение популярных товаров
const featuredProducts = computed(() => {
  return productStore.products
    .filter(product => product.featured)
    .slice(0, 4);
});

// Навигация к категории
const navigateToCategory = (category: string) => {
  router.push(`/catalog?category=${category}`);
};
</script>

<style lang="scss" scoped>
.home-page {
  // Hero Section
  .hero-section {
    padding: $spacer * 3 0;
    background-color: $gray-100;
    margin-bottom: $spacer * 3;
    
    .container {
      display: flex;
      align-items: center;
      gap: $spacer * 3;
      
      @media (max-width: map-get($breakpoints, lg)) {
        flex-direction: column;
      }
    }
    
    .hero-content {
      flex: 1;
    }
    
    .hero-title {
      font-size: $h1-font-size;
      font-weight: $font-weight-bold;
      margin-bottom: $spacer;
      color: $gray-900;
    }
    
    .hero-subtitle {
      font-size: $h5-font-size;
      color: $gray-700;
      margin-bottom: $spacer * 1.5;
    }
    
    .hero-cta {
      margin-top: $spacer * 2;
    }
    
    .hero-image {
      flex: 1;
      position: relative;
    }
    
    .hero-image-placeholder {
      position: relative;
      border-radius: $border-radius;
      overflow: hidden;
    }
    
    .hero-badge {
      position: absolute;
      top: $spacer;
      right: $spacer;
      background-color: $primary;
      color: white;
      padding: $spacer * 0.5 $spacer;
      border-radius: $border-radius-pill;
      font-weight: $font-weight-bold;
    }
  }
  
  // Products Section
  .products-section {
    padding: $spacer * 2 0;
    margin-bottom: $spacer * 3;
    
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: $spacer * 1.5;
    }
  }
  
  // ... другие стили для секций
}
</style>
```

#### Описание компонента `pages/catalog.vue`

Страница каталога товаров с возможностью фильтрации и сортировки. Компонент взаимодействует с хранилищами `productStore` и `filterStore` для получения и фильтрации списка товаров.

**Основные элементы:**
- Боковая панель с фильтрами (категории, цена, рейтинг)
- Верхняя панель с сортировкой и отображением количества товаров
- Сетка товаров с карточками
- Пагинация для навигации по страницам каталога
- Индикаторы загрузки и сообщения об ошибках

```vue 
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
            <h3 class="filter-title"><FontAwesomeIcon icon="tags" class="filter-icon" /> Категории</h3>
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
            <h3 class="filter-title"><FontAwesomeIcon icon="dollar-sign" class="filter-icon" /> Цена</h3>
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
            <h3 class="filter-title"><FontAwesomeIcon icon="desktop" class="filter-icon" /> Платформа</h3>
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
            <h3 class="filter-title"><FontAwesomeIcon icon="star" class="filter-icon" /> Рейтинг</h3>
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
            <FontAwesomeIcon icon="undo" class="mr-1" /> Сбросить фильтры
          </button>
        </aside>
        
        <div class="catalog-main">
          <div class="catalog-toolbar">
            <ClientOnly>
              <div class="catalog-count">
                {{ filteredProducts.length }} {{ productCountText }}
              </div>
              <template #fallback>
                <div class="catalog-count">
                  0 товаров
                </div>
              </template>
            </ClientOnly>
            
            <div class="catalog-sort">
              <span class="sort-label"><FontAwesomeIcon icon="sort" class="mr-1" /> Сортировать по:</span>
              <select v-model="sortBy" class="sort-select">
                <option value="popularity">Популярности</option>
                <option value="price-asc">Цена (по возрастанию)</option>
                <option value="price-desc">Цена (по убыванию)</option>
                <option value="newest">Новизне</option>
              </select>
            </div>
          </div>
          
          <ClientOnly>
            <div v-if="productStore.loading" class="loading-spinner">
              <FontAwesomeIcon icon="circle-notch" spin size="2x" class="mb-2" />
              <div>Загрузка...</div>
            </div>
            
            <div v-else-if="productStore.error" class="error-message">
              <FontAwesomeIcon icon="exclamation-circle" size="2x" class="mb-2 text-danger" />
              <p>Произошла ошибка при загрузке товаров</p>
              <button class="btn btn-primary" @click="productStore.fetchProducts">
                <FontAwesomeIcon icon="sync" class="mr-1" /> Попробовать снова
              </button>
            </div>
            
            <div v-else-if="filteredProducts.length === 0" class="no-products">
              <FontAwesomeIcon icon="search" size="2x" class="mb-2 text-muted" />
              <p>По вашему запросу ничего не найдено</p>
              <button class="btn btn-primary" @click="resetFilters">
                <FontAwesomeIcon icon="undo" class="mr-1" /> Сбросить фильтры
              </button>
            </div>
            
            <div v-else class="products-grid">
              <ProductCard 
                v-for="product in filteredProducts" 
                :key="product.id" 
                :product="product" 
              />
            </div>
            
            <template #fallback>
              <div class="loading-spinner">
                Загрузка...
              </div>
            </template>
          </ClientOnly>
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
const categories = ['Antivirus', 'Graphics', 'Office', 'Development', 'Utilities', 'OC'];
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
    display: flex;
    align-items: center;
    
    .filter-icon {
      margin-right: $spacer * 0.5;
      color: $primary;
      width: 16px;
      height: 16px;
    }
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    p {
      margin-bottom: $spacer;
    }
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
  
  .text-muted {
    color: $gray-600;
  }
}
</style>

```

#### Описание компонента `pages/product/[id].vue`

Страница детального просмотра товара. Компонент получает данные о товаре по его ID и отображает подробную информацию, включая описание, технические характеристики, отзывы и часто задаваемые вопросы.

### Объяснение кода в `pages/product/[id].vue`

- **Хлебные крошки** - отображают путь навигации к текущему товару.
- **Состояния загрузки и ошибки** - показывают индикаторы загрузки и сообщения об ошибках с иконками Font Awesome.
- **Галерея товара** - отображает основное изображение и миниатюры для переключения.
- **Информация о товаре** - содержит название, рейтинг, цену и кнопки действий.
- **Система вкладок** - организует дополнительную информацию в виде вкладок с иконками Font Awesome.
- **Функция getTabIcon** - динамически назначает иконки для вкладок в зависимости от их типа.
- **Блок похожих товаров** - показывает товары той же категории для удобства навигации.

**Основные элементы:**
- Галерея изображений товара
- Блок с основной информацией (название, цена, рейтинг)
- Кнопки добавления в корзину и избранное
- Табы с дополнительной информацией (описание, характеристики, отзывы, FAQ)
- Блок с похожими товарами

```vue
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

```

#### Описание компонента `pages/login.vue`

Страница авторизации и регистрации пользователей. Компонент взаимодействует с хранилищем `authStore` для выполнения операций входа, регистрации и восстановления пароля.

**Основные элементы:**
- Форма входа с валидацией полей
- Форма регистрации нового пользователя
- Форма восстановления пароля
- Кнопки входа через социальные сети
- Переключение между формами

```vue
<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-card">
        <div class="auth-header">
          <h1 class="auth-title">{{ isLoginMode ? 'Вход в аккаунт' : 'Регистрация' }}</h1>
          <p class="auth-subtitle">
            {{ isLoginMode ? 'Войдите в свой аккаунт для доступа к заказам и личному кабинету' : 'Создайте аккаунт для быстрого оформления заказов и отслеживания покупок' }}
          </p>
        </div>
        
        <div v-if="authError" class="auth-error">
          <FontAwesomeIcon icon="exclamation-circle" class="error-icon" /> {{ authError }}
        </div>
        
        <form @submit.prevent="submitForm" class="auth-form">
          <div v-if="!isLoginMode" class="form-group">
            <label for="name" class="form-label">Имя *</label>
            <div class="input-with-icon">
              <FontAwesomeIcon icon="user" class="input-icon" />
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                @input="validateField('name')"
                placeholder="Введите ваше имя"
                :disabled="isSubmitting"
              />
            </div>
            <div v-if="errors.name" class="invalid-feedback">
              <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.name }}
            </div>
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">Email *</label>
            <div class="input-with-icon">
              <FontAwesomeIcon icon="envelope" class="input-icon" />
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                @input="validateField('email')"
                placeholder="Введите ваш email"
                :disabled="isSubmitting"
              />
            </div>
            <div v-if="errors.email" class="invalid-feedback">
              <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.email }}
            </div>
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Пароль *</label>
            <div class="password-input">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="formData.password" 
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                @input="validateField('password')"
                placeholder="Введите пароль"
                :disabled="isSubmitting"
              />
              <button 
                type="button" 
                class="password-toggle" 
                @click="togglePasswordVisibility"
                :disabled="isSubmitting"
              >
                <FontAwesomeIcon :icon="showPassword ? 'eye-slash' : 'eye'" />
              </button>
            </div>
            <div v-if="errors.password" class="invalid-feedback">
              {{ errors.password }}
            </div>
          </div>
          
          <div v-if="!isLoginMode" class="form-group">
            <label for="confirmPassword" class="form-label">Подтверждение пароля *</label>
            <div class="password-input">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                id="confirmPassword" 
                v-model="formData.confirmPassword" 
                class="form-control"
                :class="{ 'is-invalid': errors.confirmPassword }"
                @input="validateField('confirmPassword')"
                placeholder="Повторите пароль"
                :disabled="isSubmitting"
              />
              <button 
                type="button" 
                class="password-toggle" 
                @click="toggleConfirmPasswordVisibility"
                :disabled="isSubmitting"
              >
                <FontAwesomeIcon :icon="showConfirmPassword ? 'eye-slash' : 'eye'" />
              </button>
            </div>
            <div v-if="errors.confirmPassword" class="invalid-feedback">
              {{ errors.confirmPassword }}
            </div>
          </div>
          
          <div v-if="isLoginMode" class="form-group form-check">
            <input 
              type="checkbox" 
              id="rememberMe" 
              v-model="formData.rememberMe" 
              class="form-check-input"
              :disabled="isSubmitting"
            />
            <label for="rememberMe" class="form-check-label">
              Запомнить меня
            </label>
          </div>
          
          <div v-if="!isLoginMode" class="form-group form-check">
            <input 
              type="checkbox" 
              id="agreement" 
              v-model="formData.agreement" 
              class="form-check-input"
              :class="{ 'is-invalid': errors.agreement }"
              @change="validateField('agreement')"
              :disabled="isSubmitting"
            />
            <label for="agreement" class="form-check-label">
              Я согласен с <NuxtLink to="/terms" class="link">условиями использования</NuxtLink> и <NuxtLink to="/privacy" class="link">политикой конфиденциальности</NuxtLink> *
            </label>
            <div v-if="errors.agreement" class="invalid-feedback">
              {{ errors.agreement }}
            </div>
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary btn-block"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">
              <FontAwesomeIcon icon="circle-notch" spin class="mr-1" />
              {{ isLoginMode ? 'Вход...' : 'Регистрация...' }}
            </span>
            <span v-else>
              <FontAwesomeIcon :icon="isLoginMode ? 'sign-in-alt' : 'user-plus'" class="mr-1" />
              {{ isLoginMode ? 'Войти' : 'Зарегистрироваться' }}
            </span>
          </button>
          
          <div v-if="isLoginMode" class="forgot-password">
            <NuxtLink to="/forgot-password" class="link">
              <FontAwesomeIcon icon="key" class="mr-1" /> Забыли пароль?
            </NuxtLink>
          </div>
        </form>
        
        <div class="auth-separator">
          <span class="separator-text">или</span>
        </div>
        
        <div class="social-auth">
          <button class="btn btn-outline-secondary btn-social">
            <FontAwesomeIcon :icon="['fab', 'google']" class="social-icon" /> Войти через Google
          </button>
          <button class="btn btn-outline-secondary btn-social">
            <FontAwesomeIcon :icon="['fab', 'vk']" class="social-icon" /> Войти через VK
          </button>
        </div>
        
        <div class="auth-toggle">
          <p>
            {{ isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
            <a href="#" class="link" @click.prevent="toggleAuthMode">
              {{ isLoginMode ? 'Зарегистрироваться' : 'Войти' }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useAuthStore } from '~/stores/authStore';

const authStore = useAuthStore();
const router = useRouter();

// Auth mode (login or register)
const isLoginMode = ref(true);

// Form data
const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  rememberMe: false,
  agreement: false
});

// Form state
const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: ''
});
const isSubmitting = ref(false);
const authError = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Toggle between login and register modes
const toggleAuthMode = () => {
  isLoginMode.value = !isLoginMode.value;
  authError.value = '';
  
  // Reset form
  Object.keys(formData).forEach(key => {
    if (key !== 'rememberMe') {
      formData[key as keyof typeof formData] = '';
    }
  });
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Toggle confirm password visibility
const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// Validate form field
const validateField = (field: string) => {
  switch (field) {
    case 'name':
      errors.name = !formData.name.trim() ? 'Пожалуйста, введите ваше имя' : '';
      break;
    case 'email':
      if (!formData.email.trim()) {
        errors.email = 'Пожалуйста, введите ваш email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Пожалуйста, введите корректный email';
      } else {
        errors.email = '';
      }
      break;
    case 'password':
      if (!formData.password) {
        errors.password = 'Пожалуйста, введите пароль';
      } else if (!isLoginMode.value && formData.password.length < 6) {
        errors.password = 'Пароль должен содержать не менее 6 символов';
      } else {
        errors.password = '';
      }
      
      // Also validate confirmPassword if it has a value
      if (!isLoginMode.value && formData.confirmPassword) {
        validateField('confirmPassword');
      }
      break;
    case 'confirmPassword':
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Пожалуйста, подтвердите пароль';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Пароли не совпадают';
      } else {
        errors.confirmPassword = '';
      }
      break;
    case 'agreement':
      errors.agreement = !isLoginMode.value && !formData.agreement ? 'Необходимо согласиться с условиями' : '';
      break;
  }
};

// Validate all form fields
const validateForm = () => {
  if (!isLoginMode.value) {
    validateField('name');
  }
  validateField('email');
  validateField('password');
  if (!isLoginMode.value) {
    validateField('confirmPassword');
    validateField('agreement');
  }
  
  return !Object.values(errors).some(error => error);
};

// Submit form
const submitForm = async () => {
  if (!validateForm()) {
    // Scroll to first error
    const firstErrorField = Object.keys(errors).find(key => errors[key as keyof typeof errors]);
    if (firstErrorField) {
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    return;
  }
  
  isSubmitting.value = true;
  authError.value = '';
  
  try {
    if (isLoginMode.value) {
      // Login
      await authStore.login(formData.email, formData.password);
      router.push('/profile');
    } else {
      // Register
      await authStore.register(formData.name, formData.email, formData.password);
      router.push('/profile');
    }
  } catch (error: any) {
    authError.value = error.message || 'Произошла ошибка. Пожалуйста, попробуйте еще раз.';
  } finally {
    isSubmitting.value = false;
  }
};

// SEO metadata
useSeoMeta({
  title: computed(() => isLoginMode.value ? 'Вход в аккаунт | SoftPeak' : 'Регистрация | SoftPeak'),
  description: computed(() => isLoginMode.value ? 
    'Войдите в свой аккаунт для доступа к заказам и личному кабинету' : 
    'Создайте аккаунт для быстрого оформления заказов и отслеживания покупок'
  )
});
</script>

<style lang="scss" scoped>
.auth-page {
  padding: $spacer * 4 0;
  background-color: $gray-100;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  
  .container {
    max-width: 500px;
  }
  
  .auth-card {
    background-color: white;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    padding: $spacer * 2;
  }
  
  .auth-header {
    text-align: center;
    margin-bottom: $spacer * 2;
  }
  
  .auth-title {
    margin-bottom: $spacer * 0.5;
  }
  
  .auth-subtitle {
    color: $gray-600;
  }
  
  .auth-error {
    background-color: lighten($danger, 40%);
    color: $danger;
    padding: $spacer;
    border-radius: $border-radius;
    margin-bottom: $spacer;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .error-icon {
      margin-right: $spacer * 0.5;
      width: 16px;
    }
  }
  
  .auth-form {
    margin-bottom: $spacer * 1.5;
  }
  
  .form-group {
    margin-bottom: $spacer * 1.5;
  }
  
  .form-label {
    display: block;
    margin-bottom: $spacer * 0.5;
    font-weight: $font-weight-medium;
  }
  
  .form-control {
    width: 100%;
    padding: $spacer * 0.75;
    border: 1px solid $gray-300;
    border-radius: $border-radius;
    transition: $transition-base;
    
    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
    }
    
    &.is-invalid {
      border-color: $danger;
      
      &:focus {
        box-shadow: 0 0 0 0.2rem rgba($danger, 0.25);
      }
    }
  }
  
  .input-with-icon {
    position: relative;
    
    .input-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: $gray-600;
      width: 16px;
      height: 16px;
    }
    
    .form-control {
      padding-left: 40px;
    }
  }
  
  .mr-1 {
    margin-right: 0.25rem;
  }
  
  .password-input {
    position: relative;
    
    .form-control {
      padding-right: 40px;
    }
    
    .password-toggle {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: $gray-600;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      svg {
        width: 16px;
        height: 16px;
      }
      
      &:hover {
        color: $gray-800;
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
  
  .invalid-feedback {
    color: $danger;
    font-size: $font-size-sm;
    margin-top: $spacer * 0.25;
    display: flex;
    align-items: center;
  }
  
  .form-check {
    display: flex;
    align-items: flex-start;
    
    .form-check-input {
      margin-top: 0.3em;
      margin-right: $spacer * 0.5;
    }
    
    .form-check-label {
      margin-bottom: 0;
    }
  }
  
  .link {
    color: $primary;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .btn-block {
    width: 100%;
  }
  
  .forgot-password {
    text-align: center;
    margin-top: $spacer;
    font-size: $font-size-sm;
  }
  
  .auth-separator {
    position: relative;
    text-align: center;
    margin: $spacer * 1.5 0;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: $gray-300;
    }
    
    .separator-text {
      position: relative;
      display: inline-block;
      padding: 0 $spacer;
      background-color: white;
      color: $gray-600;
    }
  }
  
  .social-auth {
    margin-bottom: $spacer * 1.5;
    
    .btn-social {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacer * 0.5;
    }
    
    .social-icon {
      width: 18px;
      height: 18px;
      margin-right: $spacer * 0.5;
      color: $gray-700;
    }
  }
  
  .auth-toggle {
    text-align: center;
    color: $gray-700;
  }
}
</style>

```

#### Описание компонента `pages/profile/index.vue`

Страница личного кабинета пользователя. Компонент отображает информацию о пользователе, историю заказов, избранные товары и настройки аккаунта.

**Основные элементы:**
- Табы для переключения между разделами (личные данные, заказы, избранное, настройки)
- Форма редактирования личных данных
- Таблица с историей заказов и возможностью просмотра деталей
- Список избранных товаров
- Настройки уведомлений и безопасности

```vue
<template>
  <div class="profile-page">
    <div class="container">
      <h1 class="page-title">Личный кабинет</h1>
      
      <div class="profile-content">
        <!-- Profile Sidebar -->
        <div class="profile-sidebar">
          <div class="profile-info">
            <div class="profile-avatar">
              <PlaceholderImage 
                width="100px" 
                height="100px" 
                bgColor="#e0e0e0" 
                fontSize="1rem"
              />
            </div>
            <div class="profile-name">{{ user.name }}</div>
            <div class="profile-email">{{ user.email }}</div>
          </div>
          
          <div class="profile-nav">
            <button 
              class="nav-item" 
              :class="{ active: activeTab === 'personal' }"
              @click="activeTab = 'personal'"
            >
              <FontAwesomeIcon icon="user" class="nav-icon" /> Личные данные
            </button>
            <button 
              class="nav-item" 
              :class="{ active: activeTab === 'orders' }"
              @click="activeTab = 'orders'"
            >
              <FontAwesomeIcon icon="shopping-bag" class="nav-icon" /> История заказов
            </button>
            <button 
              class="nav-item" 
              :class="{ active: activeTab === 'addresses' }"
              @click="activeTab = 'addresses'"
            >
              <FontAwesomeIcon icon="map-marker-alt" class="nav-icon" /> Адреса доставки
            </button>
            <button 
              class="nav-item" 
              :class="{ active: activeTab === 'security' }"
              @click="activeTab = 'security'"
            >
              <FontAwesomeIcon icon="shield-alt" class="nav-icon" /> Безопасность
            </button>
          </div>
          
          <button class="btn btn-outline-danger btn-logout" @click="logout">
            <FontAwesomeIcon icon="sign-out-alt" class="mr-1" /> Выйти из аккаунта
          </button>
        </div>
        
        <!-- Profile Main Content -->
        <div class="profile-main">
          <!-- Personal Information Tab -->
          <div v-if="activeTab === 'personal'" class="profile-tab">
            <h2 class="tab-title">Личные данные</h2>
            
            <form @submit.prevent="updateProfile" class="profile-form">
              <div class="form-group">
                <label for="name" class="form-label">Имя</label>
                <div class="input-with-icon">
                  <FontAwesomeIcon icon="user" class="input-icon" />
                  <input 
                    type="text" 
                    id="name" 
                    v-model="profileForm.name" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.name }"
                  />
                </div>
                <div v-if="errors.name" class="invalid-feedback">
                  <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.name }}
                </div>
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <div class="input-with-icon">
                  <FontAwesomeIcon icon="envelope" class="input-icon" />
                  <input 
                    type="email" 
                    id="email" 
                    v-model="profileForm.email" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                    disabled
                  />
                </div>
                <div class="form-text">
                  <FontAwesomeIcon icon="info-circle" class="mr-1" /> Email нельзя изменить
                </div>
              </div>
              
              <div class="form-group">
                <label for="phone" class="form-label">Телефон</label>
                <div class="input-with-icon">
                  <FontAwesomeIcon icon="phone" class="input-icon" />
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="profileForm.phone" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.phone }"
                  />
                </div>
                <div v-if="errors.phone" class="invalid-feedback">
                  <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.phone }}
                </div>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <FontAwesomeIcon icon="circle-notch" spin class="mr-1" /> Сохранение...
                </span>
                <span v-else>
                  <FontAwesomeIcon icon="save" class="mr-1" /> Сохранить изменения
                </span>
              </button>
            </form>
          </div>
          
          <!-- Orders Tab -->
          <div v-if="activeTab === 'orders'" class="profile-tab">
            <h2 class="tab-title">История заказов</h2>
            
            <div v-if="orders.length === 0" class="empty-state">
              <FontAwesomeIcon icon="shopping-bag" class="empty-icon" />
              <p class="empty-text">У вас пока нет заказов</p>
              <NuxtLink to="/catalog" class="btn btn-primary">
                <FontAwesomeIcon icon="search" class="mr-1" /> Перейти в каталог
              </NuxtLink>
            </div>
            
            <div v-else class="orders-list">
              <div v-for="order in orders" :key="order.id" class="order-card">
                <div class="order-header">
                  <div class="order-info">
                    <div class="order-number">
                      <FontAwesomeIcon icon="file-invoice" class="mr-1" /> Заказ #{{ order.id }}
                    </div>
                    <div class="order-date">
                      <FontAwesomeIcon icon="calendar-alt" class="mr-1" /> {{ formatDate(order.date) }}
                    </div>
                  </div>
                  <div class="order-status" :class="order.status">
                    <FontAwesomeIcon :icon="getStatusIcon(order.status)" class="mr-1" /> {{ getStatusText(order.status) }}
                  </div>
                </div>
                
                <div class="order-products">
                  <div v-for="item in order.items" :key="item.id" class="order-product">
                    <PlaceholderImage 
                      width="60px" 
                      height="60px" 
                      bgColor="#f0f0f0" 
                      fontSize="0.8rem"
                    />
                    <div class="product-info">
                      <div class="product-name">{{ item.name }}</div>
                      <div class="product-price">{{ formatPrice(item.price) }} × {{ item.quantity }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="order-footer">
                  <div class="order-total">
                    <span class="total-label">
                      <FontAwesomeIcon icon="receipt" class="mr-1" /> Итого:
                    </span>
                    <span class="total-price">{{ formatPrice(order.total) }}</span>
                  </div>
                  <div class="order-actions">
                    <button class="btn btn-outline-primary btn-sm">
                      <FontAwesomeIcon icon="redo" class="mr-1" /> Повторить заказ
                    </button>
                    <button class="btn btn-outline-secondary btn-sm">
                      <FontAwesomeIcon icon="download" class="mr-1" /> Чек
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Addresses Tab -->
          <div v-if="activeTab === 'addresses'" class="profile-tab">
            <h2 class="tab-title">Адреса доставки</h2>
            
            <div v-if="addresses.length === 0" class="empty-state">
              <FontAwesomeIcon icon="map-marker-alt" class="empty-icon" />
              <p class="empty-text">У вас пока нет сохраненных адресов</p>
              <button class="btn btn-primary" @click="showAddressForm = true">
                <FontAwesomeIcon icon="plus" class="mr-1" /> Добавить адрес
              </button>
            </div>
            
            <div v-else class="addresses-list">
              <div v-for="address in addresses" :key="address.id" class="address-card">
                <div class="address-content">
                  <div class="address-title">
                    <FontAwesomeIcon icon="home" class="mr-1" /> {{ address.title }}
                  </div>
                  <div class="address-text">
                    <FontAwesomeIcon icon="map-marker-alt" class="mr-1 text-muted" /> {{ address.fullAddress }}
                  </div>
                  <div class="address-phone">
                    <FontAwesomeIcon icon="phone" class="mr-1 text-muted" /> {{ address.phone }}
                  </div>
                </div>
                <div class="address-actions">
                  <button class="btn btn-outline-primary btn-sm" @click="editAddress(address)">
                    <FontAwesomeIcon icon="edit" class="mr-1" /> Редактировать
                  </button>
                  <button class="btn btn-outline-danger btn-sm" @click="deleteAddress(address.id)">
                    <FontAwesomeIcon icon="trash-alt" class="mr-1" /> Удалить
                  </button>
                </div>
              </div>
            </div>
            
            <button class="btn btn-primary mt-3" @click="showAddressForm = true">
              <FontAwesomeIcon icon="plus" class="mr-1" /> Добавить новый адрес
            </button>
          </div>
          
          <!-- Security Tab -->
          <div v-if="activeTab === 'security'" class="profile-tab">
            <h2 class="tab-title">Безопасность</h2>
            
            <form @submit.prevent="changePassword" class="profile-form">
              <div class="form-group">
                <label for="currentPassword" class="form-label">Текущий пароль</label>
                <div class="input-with-icon">
                  <FontAwesomeIcon icon="lock" class="input-icon" />
                  <input 
                    type="password" 
                    id="currentPassword" 
                    v-model="passwordForm.currentPassword" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.currentPassword }"
                  />
                </div>
                <div v-if="errors.currentPassword" class="invalid-feedback">
                  <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.currentPassword }}
                </div>
              </div>
              
              <div class="form-group">
                <label for="newPassword" class="form-label">Новый пароль</label>
                <div class="input-with-icon">
                  <FontAwesomeIcon icon="key" class="input-icon" />
                  <input 
                    type="password" 
                    id="newPassword" 
                    v-model="passwordForm.newPassword" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.newPassword }"
                  />
                </div>
                <div v-if="errors.newPassword" class="invalid-feedback">
                  <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.newPassword }}
                </div>
              </div>
              
              <div class="form-group">
                <label for="confirmPassword" class="form-label">Подтверждение пароля</label>
                <div class="input-with-icon">
                  <FontAwesomeIcon icon="check-circle" class="input-icon" />
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    v-model="passwordForm.confirmPassword" 
                    class="form-control"
                    :class="{ 'is-invalid': errors.confirmPassword }"
                  />
                </div>
                <div v-if="errors.confirmPassword" class="invalid-feedback">
                  <FontAwesomeIcon icon="exclamation-circle" class="mr-1" /> {{ errors.confirmPassword }}
                </div>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <FontAwesomeIcon icon="circle-notch" spin class="mr-1" /> Сохранение...
                </span>
                <span v-else>
                  <FontAwesomeIcon icon="shield-alt" class="mr-1" /> Изменить пароль
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useAuthStore } from '~/stores/authStore';

// Define middleware to protect this route
definePageMeta({
  middleware: 'auth'
});

const authStore = useAuthStore();
const router = useRouter();

// User data
const user = computed(() => authStore.user || {
  name: '',
  email: '',
  phone: ''
});

// Active tab
const activeTab = ref('personal');

// Form data
const profileForm = reactive({
  name: user.value.name || '',
  email: user.value.email || '',
  phone: user.value.phone || ''
});

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Form state
const errors = reactive({
  name: '',
  email: '',
  phone: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});
const isSubmitting = ref(false);
const showAddressForm = ref(false);

// Mock data for orders and addresses
const orders = ref([
  {
    id: '12345',
    date: new Date(2025, 4, 10),
    status: 'completed',
    items: [
      { id: 1, name: 'Adobe Photoshop', price: 12990, quantity: 1 },
      { id: 2, name: 'Microsoft Office', price: 8990, quantity: 1 }
    ],
    total: 21980
  },
  {
    id: '12346',
    date: new Date(2025, 4, 5),
    status: 'processing',
    items: [
      { id: 3, name: 'Антивирус Касперского', price: 3990, quantity: 1 }
    ],
    total: 3990
  }
]);

const addresses = ref([
  {
    id: 1,
    title: 'Домашний',
    fullAddress: 'г. Москва, ул. Примерная, д. 123, кв. 45',
    phone: '+7 (123) 456-7890'
  }
]);

// Methods
const updateProfile = async () => {
  isSubmitting.value = true;
  
  try {
    // Validate form
    errors.name = !profileForm.name.trim() ? 'Пожалуйста, введите ваше имя' : '';
    
    if (Object.values(errors).some(error => error)) {
      return;
    }
    
    // In a real app, you would call the API to update the profile
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user in store
    authStore.updateProfile({
      name: profileForm.name,
      phone: profileForm.phone
    });
    
    alert('Профиль успешно обновлен');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Произошла ошибка при обновлении профиля');
  } finally {
    isSubmitting.value = false;
  }
};

const changePassword = async () => {
  isSubmitting.value = true;
  
  try {
    // Validate form
    errors.currentPassword = !passwordForm.currentPassword ? 'Пожалуйста, введите текущий пароль' : '';
    
    if (!passwordForm.newPassword) {
      errors.newPassword = 'Пожалуйста, введите новый пароль';
    } else if (passwordForm.newPassword.length < 6) {
      errors.newPassword = 'Пароль должен содержать не менее 6 символов';
    } else {
      errors.newPassword = '';
    }
    
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Пожалуйста, подтвердите пароль';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    } else {
      errors.confirmPassword = '';
    }
    
    if (Object.values(errors).some(error => error)) {
      return;
    }
    
    // In a real app, you would call the API to change the password
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    passwordForm.currentPassword = '';
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
    
    alert('Пароль успешно изменен');
  } catch (error) {
    console.error('Error changing password:', error);
    alert('Произошла ошибка при изменении пароля');
  } finally {
    isSubmitting.value = false;
  }
};

const editAddress = (address: any) => {
  // In a real app, you would open a form to edit the address
  console.log('Edit address:', address);
};

const deleteAddress = async (id: number) => {
  if (confirm('Вы уверены, что хотите удалить этот адрес?')) {
    // In a real app, you would call the API to delete the address
    addresses.value = addresses.value.filter(address => address.id !== id);
  }
};

const logout = () => {
  authStore.logout();
  router.push('/');
};

// Helper methods
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(price);
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Ожидает оплаты';
    case 'processing':
      return 'В обработке';
    case 'shipped':
      return 'Отправлен';
    case 'completed':
      return 'Завершен';
    case 'cancelled':
      return 'Отменен';
    default:
      return status;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return 'clock';
    case 'processing':
      return 'spinner';
    case 'shipped':
      return 'truck';
    case 'completed':
      return 'check-circle';
    case 'cancelled':
      return 'times-circle';
    default:
      return 'info-circle';
  }
};

// SEO metadata
useSeoMeta({
  title: 'Личный кабинет | SoftPeak',
  description: 'Управляйте своим профилем, просматривайте историю заказов и настраивайте параметры аккаунта'
});
</script>

<style lang="scss" scoped>
.profile-page {
  padding: $spacer * 2 0;
  
  .page-title {
    margin-bottom: $spacer * 2;
  }
  
  .profile-content {
    display: flex;
    gap: $spacer * 3;
    
    @media (max-width: map-get($breakpoints, md)) {
      flex-direction: column;
    }
  }
  
  .profile-sidebar {
    width: 280px;
    flex-shrink: 0;
    
    @media (max-width: map-get($breakpoints, md)) {
      width: 100%;
      margin-bottom: $spacer * 2;
    }
    
    .profile-info {
      background-color: white;
      border-radius: $border-radius;
      padding: $spacer;
      margin-bottom: $spacer * 1.5;
      box-shadow: $box-shadow-sm;
      text-align: center;
    }
    
    .profile-avatar {
      margin: 0 auto $spacer;
      border-radius: 50%;
      overflow: hidden;
    }
    
    .profile-name {
      font-weight: $font-weight-bold;
      font-size: $font-size-lg;
      margin-bottom: $spacer * 0.25;
    }
    
    .profile-email {
      color: $gray-600;
      font-size: $font-size-sm;
    }
    
    .profile-nav {
      background-color: white;
      border-radius: $border-radius;
      box-shadow: $box-shadow-sm;
      margin-bottom: $spacer * 1.5;
      overflow: hidden;
      
      .nav-item {
        display: block;
        width: 100%;
        padding: $spacer;
        text-align: left;
        background: none;
        border: none;
        border-radius: $border-radius;
        cursor: pointer;
        transition: $transition-base;
        
        .nav-icon {
          width: 16px;
          height: 16px;
          margin-right: $spacer * 0.75;
          color: currentColor;
        }
        
        &:hover {
          background-color: $gray-100;
        }
        
        &.active {
          background-color: $primary-light;
          color: $primary;
          font-weight: $font-weight-medium;
        }
      }
    }
    
    .btn-logout {
      width: 100%;
    }
  }
  
  .profile-main {
    flex: 1;
    background-color: white;
    border-radius: $border-radius;
    padding: $spacer * 2;
    box-shadow: $box-shadow-sm;
    
    .tab-title {
      margin-bottom: $spacer * 1.5;
      position: relative;
      
      &::after {
        content: '';
        display: block;
        width: 50px;
        height: 2px;
        background-color: $primary;
        margin-top: $spacer * 0.5;
      }
    }
  }
  
  .profile-form {
    max-width: 500px;
    
    .form-group {
      margin-bottom: $spacer * 1.5;
    }
    
    .form-label {
      display: block;
      margin-bottom: $spacer * 0.5;
      font-weight: $font-weight-medium;
    }
    
    .form-control {
      width: 100%;
      padding: $spacer * 0.75;
      border: 1px solid $gray-300;
      border-radius: $border-radius;
      transition: $transition-base;
      
      &:focus {
        outline: none;
        border-color: $primary;
        box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
      }
      
      &.is-invalid {
        border-color: $danger;
        
        &:focus {
          box-shadow: 0 0 0 0.2rem rgba($danger, 0.25);
        }
      }
      
      &:disabled {
        background-color: $gray-100;
      }
    }
    
    .form-text {
      font-size: $font-size-sm;
      color: $gray-600;
      margin-top: $spacer * 0.25;
    }
    
    .invalid-feedback {
      color: $danger;
      font-size: $font-size-sm;
      margin-top: $spacer * 0.25;
      display: flex;
      align-items: center;
    }
  }
  
  .empty-state {
    text-align: center;
    padding: $spacer * 2;
    
    .empty-icon {
      font-size: 4rem;
      color: $gray-400;
      margin-bottom: $spacer;
    }
    
    .empty-text {
      margin: $spacer 0;
      color: $gray-600;
    }
  }
  
  .text-muted {
    color: $gray-600;
  }
  
  .orders-list {
    display: flex;
    flex-direction: column;
    gap: $spacer * 1.5;
  }
  
  .order-card {
    border: 1px solid $gray-200;
    border-radius: $border-radius;
    overflow: hidden;
    
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacer;
      background-color: $gray-100;
      border-bottom: 1px solid $gray-200;
    }
    
    .order-number {
      font-weight: $font-weight-bold;
    }
    
    .order-date {
      font-size: $font-size-sm;
      color: $gray-600;
    }
    
    .order-status {
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      padding: $spacer * 0.25 $spacer * 0.5;
      border-radius: $border-radius-pill;
      
      &.pending {
        background-color: $warning-light;
        color: $warning;
      }
      
      &.processing {
        background-color: $info-light;
        color: $info;
      }
      
      &.shipped {
        background-color: $primary-light;
        color: $primary;
      }
      
      &.completed {
        background-color: $success-light;
        color: $success;
      }
      
      &.cancelled {
        background-color: $danger-light;
        color: $danger;
      }
    }
    
    .order-products {
      padding: $spacer;
    }
    
    .order-product {
      display: flex;
      align-items: center;
      margin-bottom: $spacer;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .product-info {
        margin-left: $spacer;
      }
      
      .product-name {
        font-weight: $font-weight-medium;
      }
      
      .product-price {
        font-size: $font-size-sm;
        color: $gray-600;
      }
    }
    
    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacer;
      border-top: 1px solid $gray-200;
      background-color: $gray-50;
      
      .order-actions {
        display: flex;
        gap: $spacer * 0.5;
      }
    }
    
    .order-total {
      font-weight: $font-weight-bold;
      
      .total-price {
        color: $primary;
        margin-left: $spacer * 0.5;
      }
    }
  }
  
  .addresses-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $spacer * 1.5;
  }
  
  .address-card {
    border: 1px solid $gray-200;
    border-radius: $border-radius;
    padding: $spacer;
    
    .address-content {
      margin-bottom: $spacer;
    }
    
    .address-title {
      font-weight: $font-weight-bold;
      margin-bottom: $spacer * 0.5;
    }
    
    .address-text {
      margin-bottom: $spacer * 0.25;
    }
    
    .address-phone {
      color: $gray-600;
      font-size: $font-size-sm;
    }
    
    .address-actions {
      display: flex;
      gap: $spacer * 0.5;
    }
  }
  
  .mt-3 {
    margin-top: $spacer * 1.5;
  }
  
  .btn-sm {
    padding: $spacer * 0.25 $spacer * 0.5;
    font-size: $font-size-sm;
  }
}
</style>

```

#### Описание компонента `components/product/ProductCard.vue`

Компонент карточки товара, используемый в каталоге, на главной странице и в блоке похожих товаров. Отображает основную информацию о товаре и предоставляет кнопки для быстрых действий.

**Основные элементы:**
- Изображение товара
- Название и краткое описание
- Цена (обычная и со скидкой)
- Рейтинг товара
- Кнопки добавления в корзину и избранное
- Бейджи для новинок и хитов продаж

#### Описание компонента `components/product/ProductFilter.vue`

Компонент фильтрации товаров, используемый на странице каталога. Позволяет пользователю фильтровать товары по различным параметрам.

**Основные элементы:**
- Фильтр по категориям
- Фильтр по ценовому диапазону
- Фильтр по рейтингу
- Фильтр по наличию скидок
- Кнопки применения и сброса фильтров

### Компоненты корзины и оформления заказа

#### Описание компонента `components/cart/CartItem.vue`

Компонент элемента корзины, отображающий информацию о добавленном товаре и позволяющий изменять его количество или удалять из корзины.

**Основные элементы:**
- Изображение и название товара
- Цена за единицу и общая стоимость
- Элементы управления количеством
- Кнопка удаления из корзины

#### Описание компонента `components/checkout/CheckoutForm.vue`

Компонент формы оформления заказа, позволяющий пользователю ввести данные для доставки и выбрать способ оплаты.

**Основные элементы:**
- Форма с личными данными (имя, email, телефон)
- Выбор способа доставки
- Выбор способа оплаты
- Поле для ввода промокода
- Итоговая сумма заказа
- Кнопка оформления заказа

### Хранилища данных (Stores)

#### Описание хранилища `stores/productStore.ts`

Хранилище для управления данными о товарах. Содержит методы для получения списка товаров, фильтрации, поиска и получения детальной информации о товаре.

**Основные функции:**
- Загрузка списка товаров с сервера
- Фильтрация товаров по различным параметрам
- Поиск товаров по ключевым словам
- Получение детальной информации о товаре по ID
- Получение списка похожих товаров

#### Описание хранилища `stores/cartStore.ts`

Хранилище для управления корзиной покупок. Содержит методы для добавления, удаления и изменения количества товаров в корзине.

**Основные функции:**
- Добавление товара в корзину
- Удаление товара из корзины
- Изменение количества товара
- Применение промокода
- Расчет итоговой стоимости заказа
- Очистка корзины после оформления заказа

#### Описание хранилища `stores/authStore.ts`

Хранилище для управления аутентификацией пользователей. Содержит методы для входа, регистрации, выхода и управления данными пользователя.

**Основные функции:**
- Вход пользователя
- Регистрация нового пользователя
- Выход из системы
- Проверка аутентификации
- Обновление данных пользователя
- Восстановление пароля

## Плагины

#### Описание плагина `plugins/fontawesome.ts`

Плагин для интеграции библиотеки Font Awesome в приложение. Регистрирует иконки, используемые в различных компонентах для улучшения пользовательского интерфейса.

**Основные функции:**
- Импорт и регистрация иконок Font Awesome
- Настройка компонента FontAwesomeIcon для использования в приложении

#### Описание плагина `plugins/pinia-persistence.ts`

Плагин для сохранения состояния хранилищ Pinia в локальном хранилище браузера. Обеспечивает сохранение данных между сессиями пользователя.

**Основные функции:**
- Настройка персистентности для хранилищ Pinia
- Определение правил сохранения и восстановления данных


## Установка и запуск

### Установка зависимостей

```bash
# yarn
yarn install

# npm
npm install
```

### Запуск сервера разработки

```bash
# yarn
yarn dev

# npm
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`

### Сборка для продакшена

```bash
# yarn
yarn build

# npm
npm run build
```

### Предпросмотр продакшен-сборки

```bash
# yarn
yarn preview

# npm
npm run preview
```
