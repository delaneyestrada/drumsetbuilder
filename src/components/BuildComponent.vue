<template>
  <div>
    <h1>Latest Builds</h1>
    <!-- CREATE BUILD HERE -->
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="builds-container">
      
      <div class="build"
      v-for="(build, index) in builds"
      v-bind:item="build"
      v-bind:index="index"
      v-bind:key="build._id"
      >
      <b-card>
      {{ `${build.createdAt.getDate()}/${build.createdAt.getMonth() + 1}/${build.createdAt.getFullYear()}`}}
      <p class="name">{{ build.name }}</p>
      <p class="user">{{build.user}}</p>

        <ul class="items"
        v-for="item in build.items"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item"
        >
        <li style="color:red;">{{item}}</li>
      </ul>
      </b-card>
      </div>
      
    </div>
    </div>
</template>

<script>
import BuildService from '../BuildService'

export default {
  name: 'BuildComponent',
  data() {
    return {
      builds: [],
      error: '',
      name: '',
      user: '',
      items: []
    }
  },
  async created() {
    try {
      this.builds = await BuildService.getBuilds()
    } catch(err) {
      this.error = err.message
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
