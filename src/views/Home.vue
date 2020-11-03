<template>
  <div id="Home">
    
    <b-container fluid="lg">
      <ToolbarComponent 
      v-bind:canvas="canvas" 
      v-on:refresh-canvas="getBuild()" 
      v-on:new-canvas="createCanvas({newCanvas: true})" 
      />
    <div class="fabric-wrapper">
      <canvas ref="can"></canvas>
    </div>
    <div id="object-lists">
      <div class="list-container">
        <h3>Drum List</h3>
      <ul id="drum-list"></ul>
      </div>
      <div class="list-container">
        <h3>Cymbal List</h3>
      <ul id="cymbal-list"></ul>
      </div>
    </div>
    <a id="scrnsht" target="_blank" download="download"></a>
    </b-container>
  </div>
</template>

<script>
import {
  fabric
} from 'fabric';

// import BuildComponent from './components/BuildComponent.vue'
import ToolbarComponent from '../components/ToolbarComponent.vue'
import CanvasService from '../CanvasService'
import {mapState} from 'vuex'


export default {
  name: 'Home',
  components: {
    ToolbarComponent
  },
  data() {
    return {
      canvas: "",
      buildData: ""
    }
  },
  computed: mapState(['user', 'build']),
  mounted() {
    if (this.build.buildId) {
      this.getBuild()
    }

    this.createCanvas({})

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
        CanvasService.resizeCanvas(this.canvas)
      },
      createCanvas({loadedCanvas = null, newCanvas = false}) {
        if(this.canvas){
          this.canvas.dispose()
        }

        if(newCanvas){
          this.buildData = null
          this.$store.dispatch('setBuildId', null)
        }
        const ref = this.$refs.can;
        this.canvas = new fabric.Canvas(ref, {
          backgroundColor: '#dddddd',
          width: 500,
          height: 281
        });
        
        this.canvas.preserveObjectStacking = true;

        if (loadedCanvas) {
          this.canvas.loadFromJSON(loadedCanvas, this.canvas.renderAll.bind(this.canvas), function (o, object) {
            console.log(o)
            console.log(object)
          })
        } else {
          CanvasService.initCanvas(this.canvas)
        }


        CanvasService.resizeCanvas(this.canvas, true)
        // CanvasService.initTooltip(this.canvas)
    },
    getBuild() {
      fetch(`http://localhost:5001/api/builds/${this.build.buildId}`, {
          method: 'GET',
          headers: {
            'auth-token': this.user.authToken
          }
        })
        .then(res => res.json())
        .then(data => {
          this.buildData = data
          this.createCanvas({loadedCanvas: this.buildData.canvas})
        })
    }
  }
}
</script>

<style>

/* .user-dropdown {
  margin-left: auto;
}

.user-dropdown a {
  height: 1rem;
} */

.user-dropdown .nav-link {
  padding: 0 1rem;
}

.user-dropdown em {
  font-size: .9rem;
}

.fabric-wrapper, .toolbar {
  width: 100%;
  max-width: 1000px;
}

.canvas-container {
  margin: 0 auto;
}

.container-lg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#object-lists {
  display: flex;
  gap: 3rem;
  color: white;
}

#object-lists h3 {
  font-size: 1.4rem;
}

#object-lists ul {
  list-style: none;
}

#object-lists li {
  font-size: .9rem;
}
</style>
