<template>
    <header class="mb-lg-5">
        <nav class="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-center"
            style="background-color: #7BC8F9 !important;">
            <a class="navbar-brand fw-bold" href="#">Rick and Morty</a>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        msg: String,
    },
}
</script>