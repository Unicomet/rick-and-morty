import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import DetailsCharacter from './DetailsCharacter.vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
    routes: [
        {
            name: 'CharacterDetails',
            path: '/character/:id',
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
