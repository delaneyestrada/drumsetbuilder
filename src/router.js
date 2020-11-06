import VueRouter from 'vue-router'
import Vue from "vue"
import Home from "./views/Home.vue"
import User from "./views/User.vue"
import About from "./views/About.vue"
import {
    auth
} from './firebase'

Vue.use(VueRouter)



// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/user/:id',
        component: User,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/about',
        name: 'about',
        component: About
    }

]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

    if (requiresAuth && !auth.currentUser) {
        next('/')
    } else {
        next()
    }
})


export default router