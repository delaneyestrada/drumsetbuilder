<template>
  <div id="app">
    <b-container fluid="lg">
      <ToolbarComponent v-bind:canvas="canvas" />
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
import { fabric } from 'fabric';

// import BuildComponent from './components/BuildComponent.vue'
import ToolbarComponent from './components/ToolbarComponent.vue'
import CanvasService from './CanvasService'

export default {
  name: 'App',
  components: {
    ToolbarComponent
  },
  data(){
return {
  canvas: ""
}
  },
  mounted() {
    const ref = this.$refs.can;
    this.canvas = new fabric.Canvas(ref, {
      backgroundColor: '#dddddd',
      width: 500,
      height: 281
    });
    this.canvas.preserveObjectStacking = true;
    CanvasService.initCanvas(this.canvas)
    CanvasService.resizeCanvas(this.canvas, true)
    // CanvasService.initTooltip(this.canvas)

    this.$nextTick(()=> {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize(){
      CanvasService.resizeCanvas(this.canvas)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-color: #1a1a1a;
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
