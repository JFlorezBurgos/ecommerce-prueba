import { createWebHashHistory, createRouter } from 'vue-router'



const routes = [
    {
        path: '/', 
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/Products/:id', 
        component: () => import('@/views/Product/Product.vue')
    },
    {
        path: '/ShoppingCart', 
        component:() => import('@/views/shoppingCart/ShoppingCart.vue')
    },
    {
        path: '/:pathMatch(.*)*', 
        component: () => import('@/views/Home.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

export default router