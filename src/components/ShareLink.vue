<template>
        <input type="text" :value="'http://webdex.online/pokemon/'+ route">
</template>

<script>
export default {
    name: 'ShareLink',
    props: {
        route: String
    }
}
</script>

<style>
</style>