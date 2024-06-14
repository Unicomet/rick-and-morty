<!-- eslint-disable no-unused-vars -->
<script>
// import HelloWorld from './components/HelloWorld.vue'
import HeaderNavbar from './components/HeaderNavbar.vue'
import FooterComponent from './components/FooterComponent.vue';
const axios = require('axios').default;

export default {
    name: 'App',
    components: {
        HeaderNavbar,
        FooterComponent,
    },
}


</script>

<template>
    <div id="app">
        <header-navbar />
        <main>
            <router-view />
        </main>
        <footer-component />
    </div>
</template>


<style>
#app {
    width: 100%;
}
</style>
