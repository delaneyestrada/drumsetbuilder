<template>
    <div class="mb-3">
        <h3><slot></slot></h3>
        <div v-if="objects && objects.length">
        <div v-for="(object, index) in objects" :key="`object-${index}`">
            <CanvasListItemComponent  v-bind:object="object" v-on:edit-object="$emit('edit-object', object)" v-on:delete-object="$emit('delete-object', object)" />
        </div>
        </div>
        <div v-else>
            Nothing here yet...
        </div>
    </div>
</template>

<script>
    import CanvasListItemComponent from './CanvasListItemComponent'
    export default {
        name: "CanvasList",
        components: {
            CanvasListItemComponent,
        },
        props: ['objects'],
    }
</script>

<style scoped>

</style>