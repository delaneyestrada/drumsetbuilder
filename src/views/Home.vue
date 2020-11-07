<template>
  <div id="Home">
    
    <b-container fluid="lg">
      <ToolbarComponent 
      v-bind:canvas="canvas" 
      v-on:refresh-canvas="createCanvas({})" 
      v-on:new-canvas="createCanvas({newCanvas: true})" 
      />
    <div class="fabric-wrapper" v-b-tooltip.bottom="{title: 'Double click an object to edit', interactive: false, disabled: !$store.state.app.tooltips, trigger: 'hover'}">
      <canvas ref="can" id="canvas" @edit-object="editObjectModal($event)"></canvas>
    </div>
    <!-- <div id="object-lists">
      <div class="list-container">
        <h3>Drum List</h3>
      <ul id="drum-list"></ul>
      </div>
      <div class="list-container">
        <h3>Cymbal List</h3>
      <ul id="cymbal-list"></ul>
      </div>
    </div> -->
    <b-card bg-variant="dark" no-body class="mt-3 mb-5 list-card">
    <div id="object-lists" class="mt-3">
    <CanvasListComponent class="mx-3 canvas-list" v-bind:objects="canvasDrums" v-on:edit-object="editObjectModal($event)"  v-on:delete-object="deleteObject($event)">Drum List</CanvasListComponent>
    <CanvasListComponent class="mx-3 mb-3 canvas-list" v-bind:objects="canvasCymbals" v-on:edit-object="editObjectModal($event)"  v-on:delete-object="deleteObject($event)">Cymbal List</CanvasListComponent>
    </div>
    </b-card>
    <a id="scrnsht" target="_blank" download="download"></a>
    </b-container>
    <b-modal id="editObjectModal" ref="editModal" v-on:cancel="clearObjForm" v-on:close="clearObjForm" v-on:ok="editObject">
    <template #modal-title>
      Edit object
    </template>
    <div class="item-labels mb-4">
      <div>Current: <code>{{currObj.label}}</code></div>
      <div>New: <code>{{objEditForm.depth ? `${objEditForm.depth}" x ` : ''}}{{objEditForm.diameter}}" {{objEditForm.brand ? objEditForm.brand + ' ' : ''}}{{objEditForm.model ? objEditForm.model + ' ' : ''}}{{currObj.objInstrument}}</code></div>
      </div>
              <b-form-group
              id="diameter"
              label="Diameter"
              >
                <!-- <b-form-spinbutton
                min="4"
                max="30"
                step="1"
                v-model="objEditForm.diameter"
                ></b-form-spinbutton> -->
                <b-form-input type="number" min="2" max="30" autofocus v-model="objEditForm.diameter"></b-form-input>
              </b-form-group>
              <b-form-group
              v-if="currObj.objType == 'drum'"
              id="depth"
              label="Depth"
              >
                <!-- <b-form-spinbutton
                min="2"
                max="20"
                step="1"
                class="mb-1"
                v-model="objEditForm.depth"
                ></b-form-spinbutton> -->
              <b-form-input type="number" min="2" max="30" v-model="objEditForm.depth"></b-form-input>

              </b-form-group>
              <b-form-group
              id="brand"
              label="Brand"
              >
                <b-form-input :placeholder="currObj.brand" maxlength="50" v-model="objEditForm.brand">
                </b-form-input>

              </b-form-group>
              <b-form-group
              id="model"
              label="Model"
              >
                <b-form-input :placeholder="currObj.model" maxlength="50" v-model="objEditForm.model">
                </b-form-input>

              </b-form-group>
  </b-modal>
  </div>
</template>

<script>
import {
  fabric
} from 'fabric';
import firebase from 'firebase'
import CanvasListComponent from '../components/CanvasListComponent.vue'
import ToolbarComponent from '../components/ToolbarComponent.vue'
import CanvasService from '../CanvasService'
import {
  mapState
} from 'vuex'


export default {
  name: 'Home',
  components: {
    ToolbarComponent,
    CanvasListComponent
  },
  data() {
    return {
      canvas: "",
      editModalId: "none",
      currObj: "",
      scaleFactor: 4,
      objEditForm: {
        diameter: "",
        depth: "",
        model: "",
        brand: ""
      }
    }
  },
  computed: {
    ...mapState(['user', 'build']),
    canvasDrums: function () {
      if (this.canvas) {
        let drumObjects = this.canvas._objects.filter(object => object.objType == 'drum')
        console.log(drumObjects)
        return drumObjects
      } else {
        return null
      }
    },
    canvasCymbals: function () {
      if (this.canvas) {
        let cymbalObjects = this.canvas._objects.filter(object => object.objType == 'cymbal')
        return cymbalObjects
      } else {
        return null
      }
    },
    currBuild: function () {
      if (this.build.buildId && this.user.userProfile.builds) {
        return this.user.userProfile.builds.filter(build => build._id == this.build.buildId)[0]
      } else {
        return null
      }
    },
    rugPattern(){
      return require('@/assets/pattern.png')
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        console.log('logged in')
      } else {
        console.log('logged out')
      }
    })

    this.createCanvas({})

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
      // const ref = this.$refs.can;
      // console.log(ref)
      // ref.addEventListener('click', (e) => {
      //   console.log('test')
      //   console.log(e)
      // })
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      CanvasService.resizeCanvas(this.canvas)
    },
    createCanvas({
      newCanvas = false
    }) {
      if (this.canvas) {
        this.canvas.dispose()
      }

      if (newCanvas) {
        this.$store.dispatch('setBuildId', null)
      }
      const ref = this.$refs.can;
      this.canvas = new fabric.Canvas(ref, {
        backgroundColor: '#dddddd',
        width: 500,
        height: 281
      });

      this.canvas.preserveObjectStacking = true;

      if (this.currBuild) {
        this.canvas.loadFromJSON(this.currBuild.canvas, this.canvas.renderAll.bind(this.canvas), function (o, object) {
          console.log(o)
          object.on("mousedblclick", function (e) {
            const event = new CustomEvent('edit-object', {
              detail: e.target
            })
            document.getElementById("canvas").dispatchEvent(event)
          })
        })
      } else {
        CanvasService.initCanvas(this.canvas, this.rugPattern)
      }


      CanvasService.resizeCanvas(this.canvas, true)
    },
    deleteObject(object) {
      this.canvas.remove(object)
    },
    editObjectModal(object) {
      if (object.detail) {
        object = object.detail
      }
      this.canvas.setActiveObject(object)
      this.currObj = object
      console.log(object)
      this.editModalId = object.id
      this.$forceUpdate()
      this.$bvModal.show('editObjectModal')
    },
    editObject() {
      let options = {}
      if (this.objEditForm.diameter) {
        if (this.currObj.radius) {
          options.radius = (this.objEditForm.diameter / 2) * this.scaleFactor
        } else {
          options.width = this.objEditForm.diameter * this.scaleFactor
        }
      }
      if (this.objEditForm.depth) {
        options.height = this.objEditForm.depth * this.scaleFactor
      }


      options.label = `${this.objEditForm.depth ? this.objEditForm.depth + '" x ' : ""}${this.objEditForm.diameter}" ${this.objEditForm.brand} ${this.objEditForm.model} ${this.currObj.objInstrument}`
      options.brand = this.objEditForm.brand
      options.model = this.objEditForm.model
      this.currObj.set(options)
      this.canvas.renderAll()
      this.clearObjForm()
    },
    clearObjForm() {
      this.objEditForm.diameter = ""
      this.objEditForm.depth = ""
      this.objEditForm.label = ""
    }
  }
}
</script>

<style>
.dropdown-menu{
  min-width: 20em;
}
/* .user-dropdown {
  margin-left: auto;
}

.user-dropdown a {
  height: 1rem;
} */
/* 
.user-dropdown .nav-link {
  padding: 0 1rem;
}

.user-dropdown em {
  font-size: .9rem;
} */
.canvas-list {
  max-width: 100%;
}
.fabric-wrapper, .toolbar, .list-card {
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 3rem;
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
