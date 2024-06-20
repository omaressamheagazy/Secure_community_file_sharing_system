import { GUEST } from '@/Enums/guest.js'
import { routes } from "@/router/routes.js"
import { useAuthStore } from '@/stores/AuthStore.ts';
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory(),
    routes,
})
async function middleware(to, from, next) {
    const authStore = useAuthStore()
    if(!authStore.guest) { // user is not a guest
        const authUser =  await authStore.loadAuthUser();
        if(!authUser) authStore.setGuest(GUEST.isGuest);
    }
    if (to.meta.requiresAuth && !authStore.user) next({ name: 'login' })  // route require authentication, and user not authenticated
    else if (to.meta.requireGuest && authStore.user) next({ name: 'eCommerce' }) // requested route doesn't requre auth,and user is authenticated
    else next()
}
router.beforeEach((to, from, next) => {
    middleware(to, from, next)
})
export default router