<template>
    <div>
        <b-card no-body class="mb-1 px-2 py-1 text-dark obj-card">
        <div class="obj-label-container" @click="$emit('edit-object')" v-b-tooltip.hover.top="{title: `Edit ${label}`, interactive: false, disabled: !$store.state.app.tooltips}">
        <span class="obj-label">{{label}}</span>
        </div>
        <b-icon icon="x" class="delete-object" @click="$emit('delete-object')" v-b-tooltip.hover.top="{title: `Delete ${label}`, interactive: false, disabled: !$store.state.app.tooltips}"></b-icon>
        </b-card>
    </div> 
</template>

<script>
    export default {
        name: "CanvasListItem",
        props: ['object'],
        computed: {
            label() {
                return this.object.label
            }
        }
    }
</script>

<style scoped>
.obj-label {
    font-size: .9rem;
    line-height: normal;
    margin: auto 0;
    text-align: center;
    max-width: 100%;
    overflow-wrap: break-word;
    vertical-align: bottom;
    font-weight: 600;
}
.obj-label-container:hover {
    background-color: #e1e1e1;
    cursor: pointer;
}
.obj-card {
    display: grid;
    grid-template-columns: 90% 10%;
    max-width: 100%;
}
.delete-object {
    margin: auto 0;
    width: 100%;
    text-align: center;
    font-size: 2em;
    color: red;
    cursor: pointer;
}
.delete-object:hover {
    background-color: #e1e1e1;
}
</style>