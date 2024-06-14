<template>
    <div class="container text-center mb-5">
        <h1> Name: {{ character.name }}</h1>
        <h3>Origin: {{ character.origin.name }}</h3>
        <b-img thumbnail fluid :src="character.image" alt="Image" class="my-4"></b-img>
        <div class="fw-semibold fs-5">
            <p>Location: {{ character.location.name }}</p>
            <p>Gender: {{ character.gender }}</p>
            <p>Species: {{ character.species }}</p>
            <p>Status: {{ character.status }}</p>
            <p v-if="character.type">Type: {{ character.type }}</p>
        </div>

    </div>
</template>


<script>

const axios = require('axios').default;

export default {
    name: 'DetailsCharacter',
    data() {
        return {
            character: {},
            mainProps: { blank: true, blankColor: '#777', width: 75, height: 75, class: 'm1' }

        }
    },
    methods: {
        getDetailsCharacter() {
            const endpoint = "https://rickandmortyapi.com/graphql";

            const query = `
                query Character{
                    character(id: ${this.$route.params.id}) {
                        name
                        species
                        status
                        type
                        gender
                        origin{name}
                        location {name}
                        image
                    },
                } `;

            axios
                .post(endpoint, {
                    query: query,
                })
                .then((response) => {
                    this.character = response.data.data.character;
                    console.log(this.character)
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => (this.loading = false));
        }
    },
    mounted() {
        this.getDetailsCharacter();
    }
}

</script>

<style></style>