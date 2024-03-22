<template>
    <div class=" flex flex-row gap-4 p-10">
        <div class="grid grid-cols-2 gap-4" style="width: 70rem;">


            <!-- Items del carrito -->
            <div v-for="productId in Object.keys(cartItems)"
                class="col-span-3 md:col-span-2 max-w-screen-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 class="font-semibold">{{ cartItems[productId].title }}</h1>
                <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700">
                <div class="flex flex-row gap-4 items-center">
                    <!-- Imagen del producto -->
                    <div class="img-product" style="width: 200px;">
                        <img :src="cartItems[productId].thumbnail" alt="" class="w-fit h-min p-3">
                    </div>
                    <!-- Descripción del producto -->
                    <div class="flex flex-col">
                        <div class="description-product w-56">
                            <h1 class="truncate">{{ cartItems[productId].description }}</h1>
                        </div>
                        <div class="button-actions gap-4 flex p-2">
                            <!-- Botones de acción -->
                            <button @click="removeFromCart(productId)" class="bg-red-500 text-white py-2 px-2 rounded hover:bg-red-600">Eliminar</button>
                            <button
                                class="bg-yellow-500 text-white py-2 px-2 rounded hover:bg-yellow-600">Guardar</button>
                            <button class="bg-green-500 text-white py-2 px-2 rounded hover:bg-green-600">Comprar
                                ahora</button>
                        </div>
                    </div>
                    <!-- Cantidad y stock -->
                    <div class="flex flex-col">
                        <div class="add">
                            <input type="number" min="0" step="1" v-model="cartItems[productId].quantity"
                                class="p-2 border rounded-xl" style="width: 60px;">
                        </div>
                        <div class="stock-disponible flex justify-center">
                            <p>{{ cartItems[productId].stock }} Disponibles</p>
                        </div>
                    </div>
                    <!-- Precio y descuento -->
                    <div class="precio-descuento">
                        <h1>% {{ cartItems[productId].discountPercentage }}</h1>
                        <h1>$ {{ cartItems[productId].price }}</h1>
                    </div>
                </div>
            </div>

        </div>
        <!-- RESUMEN DE COMPRA -->
        <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            style="width: 20rem; height: max-content;">
            <div class="p-5">
                <h1 class="font-semibold ">Resumen de Compra</h1>
                <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700">
            </div>
            <div class="grid grid-cols-2">
                <div class="grid col-span-1 px-10 py-10">
                    <h1 class="font-semibold">Total</h1>
                </div>
                <div class="grid col-span-1 px-10 py-10">
                    <h1>$ {{ calculateCartTotal(cartItems) }}</h1>
                </div>
                <div class="grid col-start-1 col-end-3 px-10 my-10">
                    <button class="bg-blue-500 text-white rounded hover:bg-blue-600 p-2">Comprar</button>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    name: 'ShoppingCart',
    computed: {
        cartItems() {
            // Accede a los productos del carrito desde el estado de Vuex
            return this.$store.state.cart.items;
        }
    },
    methods: {
        calculateTotalPrice(product) {
            // Calcula el precio total del producto teniendo en cuenta el descuento y la cantidad
            const discount = (100 - product.discountPercentage) / 100;
            return (product.price * product.quantity * discount).toFixed(2);
        },
        calculateCartTotal(cartItems) {
            // Calcula el precio total del carrito sumando el precio total de cada producto
            let total = 0;
            for (const productId in cartItems) {
                total += parseFloat(this.calculateTotalPrice(cartItems[productId]));
            }
            return total.toFixed(2);
        },
        removeFromCart(productId) {
            // Elimina el producto del carrito
            this.$store.commit('removeFromCart', productId);
        }
    }
};
</script>

<style>
/* Estilos personalizados si es necesario */
</style>