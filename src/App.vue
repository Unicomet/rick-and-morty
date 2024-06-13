<!-- eslint-disable no-unused-vars -->
<script>
// import HelloWorld from './components/HelloWorld.vue'
import HeaderNavbar from './components/HeaderNavbar.vue'


const axios = require('axios').default;

export default {
    name: 'App',
    components: {
        HeaderNavbar,
    },
    data() {
        return {
            characters: {},
            inputSearch: "",
            currentPage: "1",
            totalItems: 0,
            itemsPerPage: 20
        }
    },
    methods: {
        getCharacters() {
            const endpoint = "https://rickandmortyapi.com/graphql";

            const query = `
                query getCharacters {
                    characters {
                        info {
                            count,
                            pages,
                        }
                        results {
                            id,
                            image,
                            name,
                            status,
                            species,
                            type,
                            gender
                        }
                    }
                } `;
            axios
                .post(endpoint, {
                    query: query,
                })
                .then((response) => {
                    this.characters = response.data.data.characters.results;
                    this.totalItems = response.data.data.characters.info.count;
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => (this.loading = false));
        },
        getCharactersBySearch(page = 1) {
            this.currentPage = page;
            const endpoint = "https://rickandmortyapi.com/graphql";
            const query = `
                query getCharacters {
                    characters (page: ${page} ,filter: { name: "${this.inputSearch}" }){
                        info {
                            count
                            pages
                        }
                        results {
                            id
                            image
                            name
                            status
                            species
                            type
                            gender
                        }
                    }
                } `;
            axios
                .post(endpoint, {
                    query: query,
                })
                .then((response) => {
                    this.characters = response.data.data.characters.results;
                    this.totalItems = response.data.data.characters.info.count; console.log(this.characters);
                    console.log("search: " + this.inputSearch + " page: " + this.currentPage);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => (this.loading = false));
        },
        linkGen(pageNum) {
            return `/page/${pageNum}`
        },
    },
    mounted() {
        this.getCharacters();
    },
}


</script>

<template>
    <div id="app">
        <header-navbar />
        <main>
            <b-row class="d-flex justify-content-center align-items-center w-75 mx-auto">
                <label :for="'search'" class="w-auto">Find By Name:</label>
                <b-form-input :id="'search'" class="w-auto" v-model="inputSearch"
                    v-on:keypress="getCharactersBySearch()"></b-form-input>
                <b-button class="ms-4 w-auto" v-on:click="getCharactersBySearch()">Search</b-button>
            </b-row>
            <div class="row mt-5 mx-0">
                <div class="col-12 px-0">
                    <div class="row mx-5 gap-5 justify-content-center">
                        <div v-for="character in characters" v-bind:key="character.id" class="card"
                            style="width: 18rem; ">
                            <img :src="character.image" class="card-img-top" alt="...">
                            <div class="card-body ">
                                <h3 class="card-title">{{ character.name }}</h3>
                                <p>{{ character.status }}</p>
                                <p>{{ character.species }}</p>
                                <p>{{ character.gender }}</p>
                                <p v-if="character.type">{{ character.type }}</p>
                                <p v-else>unknown</p>
                                <a href="/character/id" class="btn btn-primary">See Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" w-25 mx-auto mt-5">
                <b-pagination v-model="currentPage" :total-rows="totalItems" :per-page="itemsPerPage"
                    aria-controls="my-table" v-on:change="getCharactersBySearch(currentPage)"></b-pagination>
            </div>

        </main>
        <!-- <Home msg="Welcome to Your Vue.js App"/> -->
    </div>
</template>


<style>
#app {
    width: 100%;
}
</style>
