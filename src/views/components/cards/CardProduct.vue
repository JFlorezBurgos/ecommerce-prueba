import { default } from '../../Product.vue';
<template>
    <div
        class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:drop-shadow-2xl">
        <router-link :to="`/Products/${product.id}`" class="flex justify-center">
            <img class="p-2 rounded-t-lg product-image" :src="product.thumbnail" :alt="product.title" />
        </router-link>
        <div class="px-5 pb-5">
            <a>
                <h5 class="text-xs font-semibold tracking-tight text-gray-900 dark:text-white">{{ product.title }}</h5>
            </a>
            <a>
                <h5 class="text-xs font-semibold tracking-tight text-gray-900 dark:text-white">{{
            product.discountPercentage + '%' }}</h5>
            </a>

            <div class="flex items-center">
                <!-- Agrega las estrellas según la calificación del producto -->
                <div v-html="getStarIcons(product.rating)" class="flex items-center"></div>
            </div>

            
            <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-gray-900 dark:text-white">{{ '$' + product.price }}</span>
                <button @click="addToCartClicked"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                    to cart</button>
            </div>

            
        </div>
    </div>
</template>


<script>

export default {
    name: 'CardProduct',
    props: {
        product: Object, 
    },
    methods: {
        getStarIcons(rating) {
            const roundedRating = Math.round(rating); 
            const starIcons = []; 
            for (let i = 0; i < 5; i++) {
                if (i < roundedRating) {
                    
                    starIcons.push('<svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"><path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/></svg>');
                } else {
                
                    starIcons.push('<svg class="w-4 h-4 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"><path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/></svg>');
                }
            }
            return starIcons.join(''); 
        },
        addToCartClicked() {
            this.$store.dispatch('addProductToCart', this.product);
        }
    },

};
</script>

<style>
.product-image {
    display: flex;
    align-items: center;
    height: 200px;
    width: 200px;
}

.star-icon {
    margin-right: 0.5rem;
}
</style>