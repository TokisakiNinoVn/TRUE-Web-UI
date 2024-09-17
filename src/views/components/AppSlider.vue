<template>
    <div class="image-slider">
      <div class="slider-wrapper">
        <img v-for="(image, index) in images" :src="image" :key="index" class="slider-image" />
      </div>
      <button @click="prevSlide">‹</button>
      <button @click="nextSlide">›</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const images = ref([
    '/uploads/image.png',
    'uploads/image2.png',
    'uploads/image1.png',
  ]);
  
  const currentIndex = ref(0);
  
  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
  };
  
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
  };
  </script>
  
  <style scoped>
  .image-slider {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  
  .slider-wrapper {
    display: flex;
    transition: transform 0.5s ease;
    transform: translateX(-calc(100% * var(--current-index)));
  }
  
  .slider-image {
    width: 100%;
    flex-shrink: 0;
  }
  
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  button:nth-of-type(1) {
    left: 10px;
  }
  
  button:nth-of-type(2) {
    right: 10px;
  }
  </style>
  