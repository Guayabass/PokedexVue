<template>
    <section id="header">
        <figure class="pokemon-image-figure">
        <img src="../assets/logo.png" class="pokemon-header-image">
    </figure>
    </section>
</template>

<script>

export default {
    name: 'DefaultMessage'
}

</script>

<style>
    #header{
        width: 100%;
        height: 300px;
    }
    .pokemon-header-image:hover{
        transform: scale(1.1);
        transition: all 350ms ease;
    }
    .pokemon-header-image:not(:hover){
        transform: scale(1);
        transition: all 350ms ease;
    }
    .pokemon-image-figure{
        display: flex;
        justify-content: center;
    }
</style>