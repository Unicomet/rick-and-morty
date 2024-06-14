<template>
    <div class="container">
        <b-row class="d-flex justify-content-center align-items-center w-75 mx-auto">
            <label :for="'search'" class="w-auto">Find By Name:</label>
            <b-form-input :id="'search'" class="w-auto" v-model="inputSearch" v-on:input="findByName"></b-form-input>
            <b-button class="ms-4 w-auto" v-on:click="findByName">Search</b-button>
        </b-row>
        <div class="row mt-5 mx-0">
            <div class="col-12 px-0">
                <div class="row mx-5 gap-5 justify-content-center">

                    <div v-for="character in characters" v-bind:key="character.id" class="card" style="width: 18rem; ">
                        <img :src="character.image" class="card-img-top" alt="...">
                        <div class="card-body ">
                            <h3 class="card-title">{{ character.name }}</h3>
                            <img class="w">
                            <p>{{ character.status }}</p>
                            <p>{{ character.species }}</p>
                            <p>{{ character.gender }}</p>
                            <p v-if="character.type">{{ character.type }}</p>
                            <p v-else>unknown</p>
                            <router-link class="btn btn-primary"
                                :to="{ name: 'DetailsCharacter', params: { id: character.id } }">See
                                Details</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=" w-25 mx-auto my-5">
            <b-pagination v-model="currentPage" :total-rows="totalItems" :per-page="itemsPerPage"
                aria-controls="characters-list" v-on:change="findByName"></b-pagination>
        </div>
    </div>
</template>



<script>
const axios = require('axios').default;


export default {
    name: 'ListItems',
    data() {
        return {
            characters: {},
            inputSearch: "",
            currentPage: 1,
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
                    this.totalItems = response.data.data.characters.info.count
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => (this.loading = false));
        },
        findByName(inputSearch) {
            console.log(inputSearch)
            this.inputSearch = inputSearch;
            const endpoint = "https://rickandmortyapi.com/graphql";
            const query = `
                        query getCharacters {
                            characters (page: 1 ,filter: { name: "${this.inputSearch}" }){
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
                    this.totalItems = response.data.data.characters.info.count;
                    console.log(this.characters);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => (this.loading = false));
        }
        ,
    },
    mounted() {
        this.getCharacters();
    }
}
</script>
