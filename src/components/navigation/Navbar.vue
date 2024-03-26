<template>



  <nav class="fixed w-screen bg-violet-500 border-gray-200 dark:bg-gray-900 top-0">
    <div class="flex  items-center justify-around  p-4">

      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">E-commerce</span>
      </router-link>

      <div >
        <router-link to="/ShoppingCart" class="relative">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" size="xl" />

          <span
            class="absolute  bottom-3 left-5 inline-block bg-red-500 text-white text-xs rounded-full px-2 py-1"> {{ cartItemCount }}</span>
        </router-link>
      </div>

    </div>
    
  </nav>

  

</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    cartItemCount() {
      // Devuelve el número de productos en el carrito desde el estado de Vuex
      return Object.keys(this.$store.state.cart.items).length;
    }
  }
}
</script>