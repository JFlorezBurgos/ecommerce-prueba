<template>
  <div class="pt-10">

    <aside id="sidebar-multi-level-sidebar"
      class="absolute  bg-slate-200 pt-4 rounded-xl m-2 left-2 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar">

      <div class="flex flex-wrap gap-4 justify-center ">
        <!-- Filtro por categoría -->
        <select v-model="selectedCategory" @change="filterProducts" class="p-2 border rounded-xl">
          <option value="">Todas las categorías</option>
          <option v-for="category in categories" :value="category">{{ category }}</option>
        </select>

        <!-- Filtro por marca -->

        <select v-model="brandFilter" @change="updateCategoryByBrand" class="p-2 border rounded-xl "
          style="width: 200px;">
          <option value="">Todas las Marcas</option>
          <option v-for="brand in brands" :value="brand">{{ brand }}</option>
        </select>

        <!-- Filtro por precio -->
        <input v-model.number="minPrice" type="number" placeholder="Precio mínimo" class="p-2 border rounded-xl">
        <input v-model.number="maxPrice" type="number" placeholder="Precio máximo" class="p-2 border rounded-xl">

        <!-- Filtro por porcentaje de descuento -->
        <input v-model.number="minDiscount" type="number" placeholder="Descuento mínimo (%)"
          class="p-2 border rounded-xl">


        <!-- Filtro por Calificacion -->
        <input v-model.number="minRating" type="number" min="0" max="5" step="0.1" placeholder="Calificación"
          class="p-2 border rounded-xl " style="width: 200px;">

        <!-- Filtro por stock disponible -->
        <input v-model.number="minStock" type="number" placeholder="Stock mínimo" class="p-2 border rounded-xl">


      </div>

    </aside>
  </div>



  <div class="pl-20 sm:ml-64 m-2">
    <!-- Filtrado -->
    <div class="pb-10">
      <h1 class="text-2xl font-bold capitalize">{{ selectedCategory ? selectedCategory : 'Todos los Productos' }}</h1>
    </div>
    <!-- Productos -->
    <div class="grid grid-cols-5 grid-rows-4 md:grid-cols-4 gap-4">
      <div v-for="product in filteredProducts" :key="product.id">
        <card-product :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import CardProduct from './components/cards/CardProduct.vue';
import { getProducts } from '@/api/api.js';


export default {
  name: 'Home',
  components: {
    CardProduct,
  },
  data() {
    return {
      products: [],
      selectedCategory: '',
      minPrice: null,
      maxPrice: null,
      minDiscount: null,
      minRating: null,
      minStock: null,
      brandFilter: '',
    };
  },
  computed: {
    categories() {
      // Obtener todas las categorías únicas de los productos
      return [...new Set(this.products.map(product => product.category))];
    },
    brands() {
      // Obtener todas las marcas únicas de los productos
      return [...new Set(this.products.map(product => product.brand))];
    },
    filteredProducts() {
      // Aplicar filtros a los productos
      let filtered = this.products;

      if (this.selectedCategory) {
        // Filtrar por categoría
        filtered = filtered.filter(product => product.category === this.selectedCategory);
      }

      if (this.minPrice !== null) {
        // Filtrar por precio mínimo
        filtered = filtered.filter(product => product.price >= this.minPrice);
      }

      if (this.maxPrice !== null) {
        // Filtrar por precio máximo
        filtered = filtered.filter(product => product.price <= this.maxPrice);
      }

      if (this.minDiscount !== null) {
        // Filtrar por porcentaje de descuento mínimo
        filtered = filtered.filter(product => (product.discountPercentage || 0) >= this.minDiscount);
      }

      if (this.minRating !== null) {
        // Filtrar por calificación mínima
        filtered = filtered.filter(product => (product.rating || 0) >= this.minRating);
      }

      if (this.minStock !== null) {
        // Filtrar por stock mínimo
        filtered = filtered.filter(product => product.stock >= this.minStock);
      }

      if (this.brandFilter.trim() !== '') {
        // Filtrar por marca
        const brandQuery = this.brandFilter.trim().toLowerCase();
        filtered = filtered.filter(product => product.brand.toLowerCase().includes(brandQuery));
      }


      return filtered;
    }
  },
  mounted() {

    this.fetchProducts();
  },
  async created() {
    this.products = await getProducts();
  },
  methods: {
    async fetchProducts() { 
        this.products = await getProducts(); // Llamar a getproducto
    },
    filterProducts() {
     

    },
    updateCategoryByBrand() {

      if (this.brandFilter === '') {
        this.selectedCategory = ''; 
      } else {
       
        const productWithBrand = this.products.find(product => product.brand === this.brandFilter);
        if (productWithBrand) {
          this.selectedCategory = productWithBrand.category;
        } else {
          this.selectedCategory = ''; 
        }
      }
    }
  },
};
</script>

<style></style>
