<template>
  <div id="app">

      <Navbar />


    <router-view />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: 'App',
  components: {
    Navbar: defineAsyncComponent (() => import('@/components/navigation/Navbar.vue'))
  }
}
</script>

<style>
 
</style>
