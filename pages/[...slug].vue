<template>
  <div class="error-page">
    <div class="container">
      <div class="error-content">
        <div class="error-code">404</div>
        <h1 class="error-title">Страница не найдена</h1>
        <p class="error-message">
          Извините, запрашиваемая страница не существует или была перемещена.
        </p>
        <div class="error-actions">
          <NuxtLink to="/" class="btn btn-primary">На главную</NuxtLink>
          <NuxtLink to="/catalog" class="btn btn-outline-primary">В каталог</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Set the HTTP status code
definePageMeta({
  validate: () => false
});

// SEO metadata
useSeoMeta({
  title: 'Страница не найдена | SoftPeak',
  description: 'Извините, запрашиваемая страница не существует или была перемещена.'
});
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacer * 3 0;
  
  .error-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .error-code {
    font-size: 8rem;
    font-weight: $font-weight-bold;
    color: $primary;
    line-height: 1;
    margin-bottom: $spacer;
    text-shadow: 2px 2px 0 rgba($primary-dark, 0.2);
    
    @media (max-width: map-get($breakpoints, md)) {
      font-size: 6rem;
    }
  }
  
  .error-title {
    font-size: $h2-font-size;
    margin-bottom: $spacer;
  }
  
  .error-message {
    color: $gray-600;
    margin-bottom: $spacer * 2;
    font-size: $font-size-lg;
  }
  
  .error-actions {
    display: flex;
    justify-content: center;
    gap: $spacer;
    
    @media (max-width: map-get($breakpoints, sm)) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
