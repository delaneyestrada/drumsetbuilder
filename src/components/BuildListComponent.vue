<template>
    <div>
        <div class="builds-container" v-if="builds">
            <b-card>
                <ul class="build-items">
                    <li v-for="build in sortedBuilds" 
                    class="build-item" 
                    v-bind:key="build.name"
                    :id="build.name"
                    @click="highlighting ? highlightItemHandler(build.name) : null"
                    >
                        <div class="build-info" v-b-tooltip.hover :title="`Click to load '${build.name.replace(/-/g, ' ')}'`" @click="loadBuild(build._id)">
                        <h3>{{build.name.replace(/-/g, ' ')}}</h3>
                         {{ `Created: ${build.createdAt.getMonth() + 1}-${build.createdAt.getDate()}-${build.createdAt.getFullYear()}` }} 
                         {{ `Modified: ${build.modifiedAt.getMonth() + 1}-${build.modifiedAt.getDate()}-${build.modifiedAt.getFullYear()}` }} 
                        </div>
                        <div class="delete" v-if="deleteButton">
                            <b-button variant="danger" v-on:click="deleteBuild(build._id)">Delete</b-button>
                        </div>
                    </li>
                    </ul>
            </b-card>

        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'BuildListComponent',
    data() {
        return {
            builds: "",
            error: '',
            name: '',
            user: '',
            items: []
        }
    },
    props: {
        deleteButton: Boolean,
        highlighting: Boolean
    },
    mounted() {
        this.getBuilds()
    },
    computed: {
        sortedBuilds: function() {
            let sortedBuilds = this.builds
            sortedBuilds.sort((a, b) => {
                return a.createdAt - b.createdAt
            })
            return sortedBuilds
        }, 
        ...mapState(['build'])
    },
    methods: {
        getBuilds() {
            fetch(`http://localhost:5001/api/builds/user/${this.$store.state.user.userId}`, {
                    method: 'GET',
                    headers: {
                        'auth-token': this.$store.state.user.authToken
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.builds = data.map(build => {
                        return {...build, createdAt: new Date(build.createdAt), modifiedAt: new Date(build.modifiedAt)}
                    })
                })
        },
        deleteBuild(buildId) {
            fetch(`http://localhost:5001/api/builds/${buildId}`, {
                    method: 'DELETE',
                    headers: {
                        'auth-token': this.$store.state.user.authToken
                    }
                })
                .then(res => res.json())
                .then(() => {
                    this.getBuilds()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        loadBuild(buildId) {
            this.$store.dispatch('setBuildId', buildId)
            if(this.$route.name != 'home'){
            this.$router.push({
                path: '/'
            })
            }
        },
        highlightItemHandler(buildName){
            // console.log(buildName)
            // let element = document.querySelector(`.build-items #${buildName}`)
            // element.classList.add('active')
            let buildList = document.querySelector('.build-items')
            buildList.children.forEach(build => {
                if(build.id == buildName){
                    build.classList.add('active')
                } else {
                    build.classList.remove('active')
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
.build-item {
    display: grid;
    width: 100%;
}
.build-info:hover {
    background-color: #e1e1e1;
}
.build-item .delete {
    margin: 1em auto;
}
.build-items li {
    cursor: pointer;
}
.build-info {
    padding: 1em;
}
.card-body {
    padding: 0;
}
.build-item.active {
    background-color: #e1e1e1;
}

</style>
