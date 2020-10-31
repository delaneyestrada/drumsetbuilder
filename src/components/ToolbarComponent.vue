<template>
  <div class="toolbar">
      <b-dropdown no-caret variant="link" v-b-tooltip.hover.bottom="'Add a drum'">
          <template slot="button-content">
              <img class="img-fluid p-2" src='../assets/snare-drum.svg' alt=''>
          </template>
          <b-dropdown-form>
              <b-form-group
              id="drum-type"
              label="Type of drum"
              >
                <b-form-select class="mb-1" v-model="drumType">
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
                <b-form-spinbutton
                id="drum-diameter"
                min="4"
                max="30"
                step="1"
                class="mb-1"
                v-model="drumDiameter"
                ></b-form-spinbutton>
              </b-form-group>
              <b-form-group
              id="drum-depth"
              label="Depth"
              >
                <b-form-spinbutton
                id="drum-depth"
                min="2"
                max="20"
                step="1"
                class="mb-1"
                v-model="drumDepth"
                ></b-form-spinbutton>
              </b-form-group>
              <b-form-group
              id="drum-label"
              label="Label"
              >
                <b-form-input placeholder="Optional" v-model="drumLabel">
                </b-form-input>

              </b-form-group>
            <b-button type="button" v-on:click="addDrum" variant="primary">Add to canvas</b-button>

          </b-dropdown-form>
      </b-dropdown>
      <b-dropdown no-caret variant="link" v-b-tooltip.hover.bottom="'Add a cymbal'">
          <template slot="button-content">
              <img class="img-fluid p-2" src='../assets/cymbal.svg' alt=''>
          </template>
          <b-dropdown-form>
              <b-form-group
              id="cymbal-type"
              label="Type of cymbal"
              >
                <b-form-select class="mb-1" v-model="cymbalType">
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
                <b-form-spinbutton
                id="cymbal-diameter"
                min="4"
                max="30"
                step="1"
                class="mb-1"
                v-model="cymbalDiameter"
                ></b-form-spinbutton>
              </b-form-group>
              <b-form-group
              id="cymbal-label"
              label="Label"
              >
                <b-form-input placeholder="Optional" v-model="cymbalLabel">
                </b-form-input>

              </b-form-group>
            <b-button type="button" v-on:click="addCymbal" variant="primary">Add to canvas</b-button>

          </b-dropdown-form>
      </b-dropdown>
      <b-button variant="link" v-on:click="moveForward" v-b-tooltip.hover.bottom="'Move selected forwards'">
              <img class="img-fluid p-2" src='../assets/up-arrow.svg' alt=''>
      </b-button>
      <b-button variant="link" v-on:click="moveBackward" v-b-tooltip.hover.bottom="'Move selected backwards'">
              <img class="img-fluid p-2" src='../assets/down-arrow.svg' alt=''>
      </b-button>
      <b-button variant="link" v-on:click="removeObject" v-b-tooltip.hover.bottom="'Delete selected from canvas'">
              <img class="img-fluid p-2" src='../assets/delete.svg' alt=''>
      </b-button>
      <b-dropdown no-caret variant="link" v-b-tooltip.hover.bottom="'Show list'">
          <template slot="button-content">
              <img class="img-fluid p-2" src='../assets/list.svg' alt=''>
          </template>
      </b-dropdown>
      <b-button variant="link" v-on:click="screenshot" v-b-tooltip.hover.bottom="'Save canvas as png'">
              <img class="img-fluid p-2" src='../assets/camera.svg' alt=''>
      </b-button>
  </div>
</template>

<script>
import CanvasService from '../CanvasService'

export default {
    name: 'ToolbarComponent',
    props: ['canvas'],
    data() {
        return {
            drumType: 'Kick',
            drumDiameter: 14,
            drumDepth: "",
            drumLabel: "",
            cymbalDiameter: 18,
            cymbalType: 'Crash',
            cymbalLabel: ""
        }
    },
    methods: {
        screenshot(){
            CanvasService.convertToImage(this.canvas)
        },
        addDrum(){
            var options = {
                type: this.drumType,
                diameter: this.drumDiameter,
                label: this.drumLabel
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
                label: this.cymbalLabel
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
        }
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
.btn:hover {
    background-color: #222222 !important;
}
.btn:focus {
    outline: none !important;
    box-shadow: none !important;
}
</style>
