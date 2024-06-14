import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import DetailsCharacter from './components/DetailsCharacter.vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ListItems from './components/ListItems.vue'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'ListItems',
            component: ListItems,
        },
        {
            path: '/character/:id',
            name: 'DetailsCharacter',
            component: DetailsCharacter,
        },
    ],
})

new Vue({
    router,
    setup() {
        //provide(DefaultApolloClient, apolloClient)
    },
    render: (h) => h(App),
}).$mount('#app')
