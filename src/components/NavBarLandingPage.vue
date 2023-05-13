<template>
    <nav class="landing-nav">
        <figure class="figure-landing-page">
            <img src="../assets/images/pokedex.png" class="image-landing-page">
        </figure>
        <ul class="landing-ul">
            <li><a href="#">Home</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Register</a></li>
            <li><a href="#">WebDex</a></li>
        </ul>
    </nav>
</template>

<script>

</script>

<style>
    .landing-nav{
        background: #24a1e9;
        height: 80px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .figure-landing-page{
        display: flex;
        align-items: center;
        margin: 8px;
    }
    .image-landing-page{
        height: 64px;
        width: 64px;
    }
    .landing-ul{
        float: right;
        margin-right: 20px;
    }
    .landing-ul li{
        display: inline-block;
        line-height: 80px;
        margin: 0 5px;
    }
</style>