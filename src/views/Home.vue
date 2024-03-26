<template>
  <div class="flex justify-center lg:absolute  lg:pl-44 ">
    <div v-if="showSuccessMessage"
      class="flex fixed bottom-0  items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert">
      <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">Info</span>
      <div class="success-message">
        <span class="font-medium">¡Producto agregado al carrito con éxito!</span>
      </div>
    </div>
  </div>

  <div class="pt-28 hidden lg:block ">
    <aside id="sidebar-multi-level-sidebar"
      class="fixed bg-slate-200 pt-5 pb-20  rounded-xl m-2 left-5  w-72 h-max transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar">
      <div class="flex gap-4 flex-wrap justify-center">
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
        <button @click="resetFilters"
          class="p-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Reajustar</button>
      </div>
    </aside>
  </div>

  <!-- Menu Mobile -->

  <div>
    <div class="bg-violet-200 flex justify-around lg:hidden fixed top-16 w-screen">
      <div class="flex items-center  hover:bg-violet-400 cursor-pointer">
        <button type="button" class="p-5" data-collapse-toggle="navbar-categories" aria-controls="navbar-categories"
          aria-expanded="false">
          <font-awesome-icon :icon="['fas', 'bars']" />
          Categorías</button>
      </div>
      <div class="flex items-center hover:bg-violet-400 cursor-pointer">
        <button type="button" class="p-5" data-collapse-toggle="navbar-filters" aria-controls="navbar-filters"
          aria-expanded="false">
          <font-awesome-icon :icon="['fas', 'sliders']" />
          Filtros
        </button>
      </div>

    </div>

    <!-- MENU MOBILE CATEGORIAS -->
    <div class="hidden lg:hidden fixed top-0 bg-violet-100 h-screen w-full p-5" id="navbar-categories">
      <button aria-expanded="true" aria-controls="navbar-categories" type="button"
        data-collapse-toggle="navbar-categories"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
      <!-- Filtro categorias mobile -->
      <div class="py-3" v-for="category in categories" :key="category">
        <ul>
          <li>
            <button @click="selectCategory(category)">{{ category }}</button>
          </li>
        </ul>
      </div>
    </div>

    <!-- MENU MOBILE FILTROS -->
    <div class="hidden lg:hidden fixed top-0 bg-violet-100 h-screen w-full p-5" id="navbar-filters">
      <div class="flex justify-between">
        <button aria-expanded="true" aria-controls="navbar-filters" type="button"
          data-collapse-toggle="navbar-filters"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
        <div class="space-x-2">
          <button @click="resetFilters"><font-awesome-icon :icon="['fas', 'arrow-rotate-left']" />Reajustar</button>
          <button aria-expanded="true" aria-controls="navbar-filters" type="button"
            data-collapse-toggle="navbar-filters"><font-awesome-icon :icon="['fas', 'check']" />Listo</button>
        </div>
      </div>
      <!-- Filtro categorias mobile -->
      <div class="py-5 space-y-5">
        <!-- MARCA -->
        <div class="select-brand">
          <p class="font-semibold pb-2">Marca</p>
          <select v-model="brandFilter" @change="updateCategoryByBrand" class="p-2 border rounded-xl w-full">
            <option value="">Todas las Marcas</option>
            <option v-for="brand in brands" :value="brand">{{ brand }}</option>
          </select>
        </div>
        <!-- PRECIO -->
        <div class="space-y-5">
          <div class="flex flex-col">
            <p class="font-semibold pb-2">Precio Mínimo</p>
            <input v-model.number="minPrice" type="number" placeholder="Precio mínimo" class="w-fit border rounded-xl">
          </div>
          <div class="flex flex-col">
            <p class="font-semibold pb-2">Precio Máximo</p>
            <input v-model.number="maxPrice" type="number" placeholder="Precio máximo" class="w-fit border rounded-xl">
          </div>
        </div>

        <!-- Descuento -->
        <div class="space-y-5">
          <div class="flex flex-col">
            <p class="font-semibold pb-2">Descuento mínimo</p>
            <input v-model.number="minDiscount" type="number" placeholder="Descuento mínimo (%)"
              class="p-2 border rounded-xl w-fit">
          </div>
        </div>
        <!-- Calificacion -->
        <div class="space-y-5">
          <div class="flex flex-col">
            <p class="font-semibold pb-2">Calificación</p>
            <input v-model.number="minRating" type="number" min="0" max="5" step="0.1" placeholder="Calificación"
              class="p-2 border rounded-xl " style="width: 200px;">
          </div>
        </div>
        <!-- Stock Minimo -->
        <div class="">
          <div class="flex flex-col">
            <p class="font-semibold pb-2">Stock mínimo</p>
            <input v-model.number="minStock" type="number" placeholder="Stock mínimo"
              class="p-2 border rounded-xl w-fit">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- GET PRODUCTS -->

  <div class=" lg:ml-64 lg:pl-20 mt-36 lg:mt-0">
    <!-- Filtrado -->
    <div class="pb-10 flex justify-center">
      <h1 class="text-2xl font-bold capitalize">{{ selectedCategory ? selectedCategory : 'Todos los Productos' }}</h1>
    </div>
    <!-- Productos -->
    <div class="grid grid-cols-1 grid-rows-4 md:grid-cols-3 gap-4 lg:grid-cols-4 px-2 ">
      <div v-for="product in filteredProducts" :key="product.id">
        <card-product :product="product" />
      </div>
    </div>


  </div>


</template>

<script>
import CardProduct from './components/cards/CardProduct.vue';
import { getProducts } from '@/api/api.js';
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'


export default {
  name: 'Home',
  components: {
    CardProduct,
  },
  setup() {
    onMounted(() => {
      initFlowbite();
    })
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
    },
    showSuccessMessage() {
      return this.$store.state.cart.showSuccessMessage;
    }
  },
  mounted() {
    this.fetchProducts();
    setTimeout(() => {
      this.$store.commit('hideSuccessMessage');
    }, 5000); // Oculta el mensaje después de 5 segundos
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
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.toggleMobileMenu();
    },
    toggleMobileMenu() {
      const mobileMenu = document.getElementById('navbar-categories');
      mobileMenu.classList.toggle('hidden');
    },
    resetFilters() {
      this.selectedCategory = '';
      this.minPrice = null;
      this.maxPrice = null;
      this.minDiscount = null;
      this.minRating = null;
      this.minStock = null;
      this.brandFilter = '';
    }
  },

}


</script>

<style></style>
