<template>
    <figure
      class="responsive-image"
      :class="[align, { 'with-caption': caption }]"
      :style="computedStyles"
    >
      <img
        :src="src"
        :alt="alt"
        :style="imageStyles"
        @load="handleImageLoad"
        ref="imageRef"
      />
      <figcaption v-if="caption">{{ caption }}</figcaption>
    </figure>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'
  
  const props = defineProps<{
    src: string
    alt: string
    caption?: string
    align?: 'left' | 'center' | 'right'
    margin?: string
    padding?: string
    maxWidth?: string
    aspectRatio?: string
  }>()
  
  const imageRef = ref<HTMLImageElement | null>(null)
  const imageLoaded = ref(false)
  
  const computedStyles = computed(() => ({
    margin: props.margin,
    padding: props.padding,
    maxWidth: props.maxWidth,
    aspectRatio: props.aspectRatio,
  }))
  
  const imageStyles = computed(() => ({
    opacity: imageLoaded.value ? 1 : 0,
    transition: 'opacity 0.3s ease',
  }))
  
  const handleImageLoad = () => {
    imageLoaded.value = true
  }
  </script>
  
  <style scoped>
  .responsive-image {
    display: flex;
    flex-direction: column;
    margin: var(--image-margin, 1rem 0);
    padding: var(--image-padding, 0);
  }
  
  .responsive-image img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .responsive-image.left {
    float: left;
    margin-right: 1rem;
  }
  
  .responsive-image.right {
    float: right;
    margin-left: 1rem;
  }
  
  .responsive-image.center {
    margin-left: auto;
    margin-right: auto;
  }
  
  .responsive-image.with-caption {
    margin-bottom: 1.5rem;
  }
  
  figcaption {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #666;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .responsive-image.left,
    .responsive-image.right {
      float: none;
      margin: 1rem auto;
    }
  }
  </style>