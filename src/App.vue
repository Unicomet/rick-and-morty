<!-- eslint-disable no-unused-vars -->
<script>
// import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import ListItems from './components/ListItems.vue'
import FilterList from './components/FiltersList.vue'

const axios = require('axios').default

export default {
    name: 'App',
    components: {
        // HelloWorld,
        Header,
        FilterList,
        //ListItems
    },
    mounted() {
        const endpoint = 'https://rickandmortyapi.com/graphql'

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
          } `

        axios
            .post(endpoint, {
                query: query,
            })
            .then((response) => {
                this.characters = response.data.data.characters.results
                const count = response.data.data.characters.info.count
                console.log(this.characters)
            })
            .catch((error) => {
                console.log(error)
            })
        //.finally(() => (this.loading =false));
    },
    data: () => {
        return {
            characters: {},
        }
    },
}
</script>

<template>
    <div id="app">
        <Header />
        <main>
            <div class="row mt-5">
                <FilterList />
                <div class="col-10 px-0">
                    <div class="row mx-5 gap-5 justify-content-center">
                        <div
                            v-for="character in characters"
                            v-bind:key="character.id"
                            class="card"
                            style="width: 18rem"
                        >
                            <img
                                :src="character.image"
                                class="card-img-top"
                                alt="..."
                            />
                            <div class="card-body">
                                <h3 class="card-title">{{ character.name }}</h3>
                                <p>{{ character.status }}</p>
                                <p>{{ character.species }}</p>
                                <p>{{ character.gender }}</p>
                                <p v-if="character.type">
                                    {{ character.type }}
                                </p>
                                <p v-else>Unknown</p>
                                <a href="#" class="btn btn-primary">See </a>
                            </div>
                        </div>
                    </div>
                </div>
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
