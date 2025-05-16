import { defineNuxtPlugin } from '#app'
import PlaceholderImage from '~/components/common/PlaceholderImage.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('PlaceholderImage', PlaceholderImage)
})
