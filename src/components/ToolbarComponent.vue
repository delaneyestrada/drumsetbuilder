<template>
  <div class="toolbar">
      <b-dropdown no-caret variant="link" v-b-tooltip.hover.bottom="{title: 'Add a drum', interactive: false, disabled: !$store.state.app.tooltips}">
          <template slot="button-content">
              <img class="img-fluid p-2" src='../assets/snare-drum.svg' alt=''>
          </template>
          <b-dropdown-form>
              <b-form-group
              id="drum-type"
              label="Category"
              >
                <b-form-select v-model="drumType">
                    <b-form-select-option value="Kick">Kick</b-form-select-option>
                    <b-form-select-option value="Snare">Snare</b-form-select-option>
                    <b-form-select-option value="Tom">Tom</b-form-select-option>
                    <b-form-select-option value="Other">Other</b-form-select-option>
                </b-form-select>
              </b-form-group>
              <b-form-group
              id="drum-diameter"
              label="Diameter"
              >
                <!-- <b-form-spinbutton
                min="4"
                max="30"
                step="1"
                class="mb-1"
                v-model="drumDiameter"
                ></b-form-spinbutton> -->
                <b-form-input type="number" min="2" max="30" autofocus v-model="drumDiameter"></b-form-input>

              </b-form-group>
              <b-form-group
              id="drum-depth"
              label="Depth"
              >
                <!-- <b-form-spinbutton
                min="2"
                max="20"
                step="1"
                class="mb-1"
                v-model="drumDepth"
                ></b-form-spinbutton> -->
              <b-form-input type="number" min="2" max="30" autofocus v-model="drumDepth"></b-form-input>
              </b-form-group>
              <b-form-group
              id="drum-brand"
              label="Brand"
              >
                <b-form-input placeholder="Optional" v-model="drumBrand">
                </b-form-input>

              </b-form-group>
              <b-form-group
              id="drum-model"
              label="Model"
              >
                <b-form-input placeholder="Optional" v-model="drumModel">
                </b-form-input>

              </b-form-group>
            <b-button type="button" v-on:click="addDrum" variant="primary">Add to canvas</b-button>

          </b-dropdown-form>
      </b-dropdown>
      <b-dropdown no-caret variant="link" v-b-tooltip.hover.bottom="{title: 'Add a cymbal', interactive: false, disabled: !$store.state.app.tooltips}">
          <template slot="button-content">
              <img class="img-fluid p-2" src='../assets/cymbal.svg' alt=''>
          </template>
          <b-dropdown-form>
              <b-form-group
              id="cymbal-type"
              label="Category"
              >
                <b-form-select v-model="cymbalType">
                    <b-form-select-option value="Crash">Crash</b-form-select-option>
                    <b-form-select-option value="Ride">Ride</b-form-select-option>
                    <b-form-select-option value="Hi-Hats">Hi-Hats</b-form-select-option>
                    <b-form-select-option value="China">China</b-form-select-option>
                    <b-form-select-option value="Splash">Splash</b-form-select-option>
                    <b-form-select-option value="Other">Other</b-form-select-option>
                </b-form-select>
              </b-form-group>
              <b-form-group
              id="cymbal-diameter"
              label="Diameter"
              >
                <!-- <b-form-spinbutton
                min="4"
                max="30"
                step="1"
                class="mb-1"
                v-model="cymbalDiameter"
                ></b-form-spinbutton> -->
              <b-form-input type="number" min="2" max="30" autofocus v-model="cymbalDiameter"></b-form-input>
              </b-form-group>
              <b-form-group
              id="cymbal-brand"
              label="Brand"
              >
                <b-form-input placeholder="Optional" v-model="cymbalBrand">
                </b-form-input>
                </b-form-group>
              <b-form-group
              id="cymbal-model"
              label="Model"
              >
                <b-form-input placeholder="Optional" v-model="cymbalModel">
                </b-form-input>

              </b-form-group>
            <b-button type="button" v-on:click="addCymbal" variant="primary">Add to canvas</b-button>

          </b-dropdown-form>
      </b-dropdown>
      <b-button variant="link" v-on:click="moveForward" v-b-tooltip.hover.bottom="{title: 'Move selected forwards', interactive: false, disabled: !$store.state.app.tooltips}">
              <img class="img-fluid p-2" src='../assets/up-arrow.svg' alt=''>
      </b-button>
      <b-button variant="link" v-on:click="moveBackward" v-b-tooltip.hover.bottom="{title: 'Move selected backwards', interactive: false, disabled: !$store.state.app.tooltips}">
              <img class="img-fluid p-2" src='../assets/down-arrow.svg' alt=''>
      </b-button>
      <b-button variant="link" v-on:click="removeObject" v-b-tooltip.hover.bottom="{title: 'Delete selected from canvas', interactive: false, disabled: !$store.state.app.tooltips}">
              <img class="img-fluid p-2" src='../assets/delete.svg' alt=''>
      </b-button>
      <b-dropdown no-caret variant="link" v-b-tooltip.hover.bottom="{title: 'Canvas options', interactive: false, disabled: !$store.state.app.tooltips}">
          <template slot="button-content">
              <img class="img-fluid p-2" src='../assets/list.svg' alt=''>
          </template>
          <b-dropdown-item @click="screenshot">Download canvas as .png</b-dropdown-item>
        <b-dropdown-item v-on:click="$emit('new-canvas')">New canvas</b-dropdown-item>
          <!-- <b-dropdown-item v-b-modal.download-modal>Download canvas as .png</b-dropdown-item> -->
          <b-dropdown-item id="save-button" v-b-modal.save-modal :disabled="!user.userProfile.username" v-b-tooltip.right="{title: 'Sign in to use this function', interactive: false, disabled: !$store.state.app.tooltips, disabled: this.user.userProfile.username, trigger: 'hover'}">Save canvas</b-dropdown-item>
          <b-dropdown-item id="load-button" v-b-modal.load-modal :disabled="!user.userProfile.username" v-b-tooltip.right="{title: 'Sign in to use this function', interactive: false, disabled: !$store.state.app.tooltips, disabled: this.user.userProfile.username, trigger: 'hover'}">Load canvas</b-dropdown-item>
      </b-dropdown>
      <b-button variant="link" id="toggleTooltipsButton" v-on:click="toggleTooltips" v-b-tooltip.hover.bottom="{title: 'Toggle tips', interactive: false, disabled: !$store.state.app.tooltips}">
              <img class="img-fluid p-2" src='../assets/bulb.svg' alt=''>
      </b-button>
      <!-- <b-button variant="link" v-on:click="screenshot" v-b-tooltip.hover.bottom="'Save canvas as png'">
              <img class="img-fluid p-2" src='../assets/camera.svg' alt=''>
      </b-button>
      <b-button variant="link" v-on:click="saveCanvas" v-b-tooltip.hover.bottom="'Save this canvas'">
              <img class="img-fluid p-2" src='../assets/diskette.svg' alt=''>
      </b-button>
      <b-button variant="link" v-on:click="screenshot" v-b-tooltip.hover.bottom="'Load a canvas'">
              <img class="img-fluid p-2" src='../assets/folder.svg' alt=''>
      </b-button> -->

      <b-modal id="download-modal" title="Download Canvas" v-on:ok="test">
        <p class="my-4">Hello from modal!</p>
      </b-modal>
      <b-modal id="save-modal" title="Save Canvas" v-on:ok="saveCanvas">
        <b-form-group
              id="save-canvas-label"
              label="Name"
              >
                <b-form-input v-model="saveCanvasName">
                </b-form-input>

              </b-form-group>
      </b-modal>
      <b-modal id="load-modal" title="Load Canvas" v-on:ok="$emit('refresh-canvas')">
        <BuildListComponent highlighting />
      </b-modal>
      </div>

</template>

<script>
import CanvasService from '../CanvasService'
import BuildListComponent from '../components/BuildListComponent'
import {mapState} from 'vuex'
import {
    v4 as uuidv4
} from 'uuid'


export default {
    name: 'ToolbarComponent',
    props: ['canvas'],
    components: {
        BuildListComponent
    },
    data() {
        return {
            drumType: 'Kick',
            drumDiameter: 14,
            drumDepth: 6,
            drumBrand: "",
            drumModel: "",
            cymbalDiameter: 18,
            cymbalType: 'Crash',
            cymbalBrand: "",
            cymbalModel: "",
            saveCanvasName: ""
        }
    },
    computed: mapState(['user', 'build']),
    methods: {
        screenshot(){
            CanvasService.convertToImage(this.canvas)
        },
        addDrum(){
            var options = {
                type: this.drumType,
                diameter: this.drumDiameter,
                brand: this.drumBrand,
                model: this.drumModel
            }
            if(this.depth != ""){
                options = {
                    ...options, depth: this.drumDepth
                }
            }
            CanvasService.addToCanvas(this.canvas, 'drum', options)
        },
        addCymbal(){
            var options = {
                type: this.cymbalType,
                diameter: this.cymbalDiameter,
                brand: this.cymbalBrand,
                model: this.cymbalModel
            }
            CanvasService.addToCanvas(this.canvas, 'cymbal', options)
        },
        removeObject(){
            this.canvas.remove(this.canvas.getActiveObject())
        },
        moveForward(){
            this.canvas.bringForward(this.canvas.getActiveObject())
        },
        moveBackward(){
            this.canvas.sendBackwards(this.canvas.getActiveObject())
        },
        saveCanvas(){
            let canvasData = CanvasService.canvasToJSON(this.canvas)
            let build = {
                name: this.saveCanvasName.replace(/ /g, '-'),
                canvas: canvasData,
                createdAt: new Date,
                modifiedAt: new Date,
                _id: uuidv4()
            }
            this.$store.dispatch('addBuild', build)
        },
        toggleTooltips(){
            if(this.$store.state.app.tooltips){
            this.$root.$emit('bv::hide::tooltip')
        } else {
            this.$root.$emit('bv::show::tooltip', 'toggleTooltipsButton')
        }
            this.$store.dispatch('toggleTooltips')
        },
        test(){
            console.log('test')
        },
    }
}
// export default {
//   name: 'BuildComponent',
//   data() {
//     return {
//       builds: [],
//       error: '',
//       name: '',
//       user: '',
//       items: []
//     }
//   },
//   async created() {
//     try {
//       this.builds = await BuildService.getBuilds()
//     } catch(err) {
//       this.error = err.message
//     }
//   }
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
    height: 3em;
}
</style>
<style>
form {
    font-size: .8em;
}
.form-group {
    margin-bottom: 0;
}
.btn:hover {
    background-color: #222222 !important;
}
.btn:focus {
    outline: none !important;
    box-shadow: none !important;
}
</style>
