<template>
    <div class="toolbar">
        <b-dropdown no-caret variant="link"
            v-b-tooltip.hover.bottom="{title: 'Add a drum', interactive: false, disabled: !$store.state.app.tooltips}">
            <template slot="button-content">
                <img class="img-fluid p-2" src='../assets/snare-drum.svg' alt=''>
            </template>
            <template v-slot:default="slotProps">

                <b-dropdown-form v-on:keyup.enter="addDrum(); slotProps.hide()">
                    <b-form-group id="drum-type" label="Category">
                        <b-form-select v-model="drumType">
                            <b-form-select-option value="Kick">Kick</b-form-select-option>
                            <b-form-select-option value="Snare">Snare</b-form-select-option>
                            <b-form-select-option value="Tom">Tom</b-form-select-option>
                            <b-form-select-option value="Other">Other</b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group id="drum-diameter" label="Diameter">
                        <b-form-input type="number" min="2" max="30" autofocus v-model="drumDiameter"></b-form-input>

                    </b-form-group>
                    <b-form-group id="drum-depth" label="Depth">
                        <b-form-input type="number" min="2" max="30" autofocus v-model="drumDepth"></b-form-input>
                    </b-form-group>
                    <b-form-group id="drum-brand" label="Brand">
                        <b-form-input placeholder="Optional" v-model="drumBrand">
                        </b-form-input>

                    </b-form-group>
                    <b-form-group id="drum-model" label="Model">
                        <b-form-input placeholder="Optional" v-model="drumModel">
                        </b-form-input>

                    </b-form-group>
                    <b-button type="button" v-on:click="addDrum(); slotProps.hide()" variant="primary">Add to canvas
                    </b-button>

                </b-dropdown-form>
            </template>
        </b-dropdown>
        <b-dropdown no-caret variant="link"
            v-b-tooltip.hover.bottom="{title: 'Add a cymbal', interactive: false, disabled: !$store.state.app.tooltips}">
            <template slot="button-content">
                <img class="img-fluid p-2" src='../assets/cymbal.svg' alt=''>
            </template>
            <template v-slot:default="slotProps">
                <b-dropdown-form v-on:keyup.enter="addCymbal(); slotProps.hide()">
                    <b-form-group id="cymbal-type" label="Category">
                        <b-form-select v-model="cymbalType">
                            <b-form-select-option value="Crash">Crash</b-form-select-option>
                            <b-form-select-option value="Ride">Ride</b-form-select-option>
                            <b-form-select-option value="Hi-Hats">Hi-Hats</b-form-select-option>
                            <b-form-select-option value="China">China</b-form-select-option>
                            <b-form-select-option value="Splash">Splash</b-form-select-option>
                            <b-form-select-option value="Other">Other</b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group id="cymbal-diameter" label="Diameter">
                        <b-form-input type="number" min="2" max="30" autofocus v-model="cymbalDiameter"></b-form-input>
                    </b-form-group>
                    <b-form-group id="cymbal-brand" label="Brand">
                        <b-form-input placeholder="Optional" v-model="cymbalBrand">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="cymbal-model" label="Model">
                        <b-form-input placeholder="Optional" v-model="cymbalModel">
                        </b-form-input>

                    </b-form-group>
                    <b-button type="button" v-on:click="addCymbal(); slotProps.hide()" variant="primary">Add to canvas
                    </b-button>
                </b-dropdown-form>
            </template>

        </b-dropdown>
        <b-button variant="link" v-on:click="moveForward"
            v-b-tooltip.hover.bottom="{title: 'Move selected forwards', interactive: false, disabled: !$store.state.app.tooltips}">
            <img class="img-fluid p-2" src='../assets/up-arrow.svg' alt=''>
        </b-button>
        <b-button variant="link" v-on:click="moveBackward"
            v-b-tooltip.hover.bottom="{title: 'Move selected backwards', interactive: false, disabled: !$store.state.app.tooltips}">
            <img class="img-fluid p-2" src='../assets/down-arrow.svg' alt=''>
        </b-button>
        <b-button variant="link" v-on:click="removeObject"
            v-b-tooltip.hover.bottom="{title: 'Delete selected from canvas', interactive: false, disabled: !$store.state.app.tooltips}">
            <img class="img-fluid p-2" src='../assets/delete.svg' alt=''>
        </b-button>
        <b-dropdown no-caret variant="link"
            v-b-tooltip.hover.bottom="{title: 'Canvas options', interactive: false, disabled: !$store.state.app.tooltips}">
            <template slot="button-content">
                <img class="img-fluid p-2" src='../assets/list.svg' alt=''>
            </template>
            <b-dropdown-item @click="screenshot">Download canvas as .png</b-dropdown-item>
            <b-dropdown-item v-on:click="$emit('new-canvas')">New canvas</b-dropdown-item>
            <!-- <b-dropdown-item v-b-modal.download-modal>Download canvas as .png</b-dropdown-item> -->
            <b-dropdown-item id="save-button" v-b-modal.save-modal :disabled="!user.userProfile.username"
                v-b-tooltip.right="{title: 'Sign in to use this function', interactive: false, disabled: !$store.state.app.tooltips, disabled: this.user.userProfile.username, trigger: 'hover'}">
                Save canvas</b-dropdown-item>
            <b-dropdown-item id="load-button" v-b-modal.load-modal :disabled="!user.userProfile.username"
                v-b-tooltip.right="{title: 'Sign in to use this function', interactive: false, disabled: !$store.state.app.tooltips, disabled: this.user.userProfile.username, trigger: 'hover'}">
                Load canvas</b-dropdown-item>
        </b-dropdown>
        <b-button variant="link" id="toggleTooltipsButton" v-on:click="toggleTooltips"
            v-b-tooltip.hover.bottom="{title: 'Toggle tips', interactive: false, disabled: !$store.state.app.tooltips}">
            <img class="img-fluid p-2" src='../assets/bulb.svg' alt=''>
        </b-button>
        <b-modal id="download-modal" title="Download Canvas" v-on:ok="test">
            <p class="my-4">Hello from modal!</p>
        </b-modal>
        <b-modal id="save-modal" title="Save Canvas" v-on:ok="saveCanvas">
            <template v-slot:default="slotProps">
            <b-form-group id="save-canvas-label" label="Name" v-on:keyup.native.enter="slotProps.ok()">
                <b-form-input v-model="saveCanvasName" autofocus>
                </b-form-input>

            </b-form-group>
            </template>
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
import firebase from 'firebase'


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
            saveCanvasName: "",
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
                model: this.drumModel,
            }
            options.label = `${this.drumDepth ? this.drumDepth + '" x ' : ""}${this.drumDiameter}" ${this.drumBrand ? this.drumBrand + ' ' : ''}${this.drumModel ? this.drumModel + ' ' : ''} ${this.drumType}`

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
                model: this.cymbalModel,
                label: `${this.cymbalDiameter}" ${this.cymbalBrand ? this.cymbalBrand + ' ' : ''}${this.cymbalModel ? this.cymbalModel + ' ' : ''}${this.cymbalType}`
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
        async saveCanvas(){
            let canvasData = CanvasService.canvasToJSON(this.canvas)
            let build = {
                name: this.saveCanvasName.replace(/ /g, '-'),
                canvas: canvasData,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                modifiedAt: firebase.firestore.Timestamp.fromDate(new Date()),
                _id: uuidv4()
            }
            let db = firebase.firestore()
            let user = firebase.auth().currentUser
            let userData = await db.collection("users").doc(user.uid).get()
            let userBuilds = await userData.get('builds')
            const found = userBuilds.some(el => el.name.toLowerCase() == build.name.toLowerCase())
            if(found){
                this.$bvModal.msgBoxOk("Canvas name must be unique", {fade: true})	
            } 
            else if(userBuilds.length >= 20){
                this.$bvModal.msgBoxOk("You may only have 20 saved canvases at a time", {fade: true})	
            }
            else {
                this.$store.dispatch('addBuild', build)
            }
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
</script>

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
