<template>
    <div class="py-12 px-10 flex justify-end">
      <button class="px-10" data-carousel-prev>
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <button data-carousel-next>
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ButtonCarousel'
  };
  </script>

