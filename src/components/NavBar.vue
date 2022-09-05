<template>
    <nav id="nav">
        <div class="nav-left-container">
            <figure class="pokedex-image-figure">
                <img src="../assets/images/pokedex.png" class="pokedex-nav-image">
            </figure>
            <p class="nav-title">WebDex</p>
        </div>
    </nav>
</template>

<script>

export default {
    name: 'NavBar'
}

</script>

<style>
@import url('http://fonts.cdnfonts.com/css/pokemon-solid');
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap");

#nav {
    width: 100%;
    height: 10%;
    /**background-color: #f5f5f5;**/
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-title {
    font-family: 'Pokemon Solid', sans-serif;
    color: #207fb6;
    font-size: 24px;
    margin: 0;
    text-align: center;
}

.nav-left-container {
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

.nav-title:hover {
    transform: scale(1.1);
    transition: all 350ms ease;
}

.nav-title:not(:hover) {
    transform: scale(1);
    transition: all 350ms ease;
}

.pokedex-image-figure {
    margin: 8px 0 8px 0;
}

</style>