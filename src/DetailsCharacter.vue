<script>
import HeaderNavbar from './components/HeaderNavbar.vue';
import FooterComponent from './components/FooterComponent.vue';


export default {
    name: 'App',
    components: {
        HeaderNavbar,
        FooterComponent
    },
}
</script>

<template>
    <div>
        <HeaderNavbar />
        <h1> This is character {{ route.params.id }}</h1>
        <FooterComponent />
    </div>
</template>

<style></style>