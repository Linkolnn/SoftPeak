<template>
  <div 
    class="placeholder-image" 
    :style="{ 
      width: width, 
      height: height, 
      backgroundColor: bgColor 
    }"
  >
    <span class="placeholder-text" :style="{ fontSize: fontSize }">
      <span class="soft">Soft</span><span class="peak">Peak</span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '200px'
  },
  bgColor: {
    type: String,
    default: '#f0f0f0'
  },
  fontSize: {
    type: String,
    default: '1.5rem'
  }
});
</script>

<style lang="scss" scoped>
.placeholder-image {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $border-radius;
  overflow: hidden;
  
  .placeholder-text {
    font-weight: $font-weight-bold;
    letter-spacing: 1px;
    
    .soft {
      color: $primary;
    }
    
    .peak {
      color: $secondary;
    }
  }
}
</style>
