<template>
    <section id="nav">
        <div class="nav-container">
            <figure class="pokedex-image-figure">
                <img src="../assets/images/pokedex.png" class="pokedex-nav-image">
            </figure>
            <p class="nav-title">WebDex</p>
        </div>
            <figure class="search-image-figure">
                <img src="../assets/images/search.png" class="search-nav-image">
            </figure>
    </section>
</template>

<script>

export default {
    name: 'NavBar'
}

</script>

<style>
@import url('http://fonts.cdnfonts.com/css/pokemon-solid');

#nav {
    width: 100%;
    height: 10%;
    /**background-color: #f5f5f5;**/
    background-color: white;
}

.nav-title {
    font-family: 'Pokemon Solid', sans-serif;
    color: #207fb6;
    font-size: 24px;
    margin: 0;
    text-align: center;
}

.nav-container {
    display: flex;
    align-content: center;
}

.pokedex-nav-image:hover {
    transform: scale(1.1);
    transition: all 350ms ease;
}

.pokedex-nav-image:not(:hover) {
    transform: scale(1);
    transition: all 350ms ease;
}

.pokedex-image-figure {
    margin: 8px 0 8px 0;
}

.search-image-figure{
    display: flex;
    align-content: center;
}
</style>