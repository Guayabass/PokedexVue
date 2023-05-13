<template>
    <nav class="landing-nav">
        <input type="checkbox" id="check">
        <label for="check" class="checkbtn">
            <i class="fa-solid fa-bars"></i>
        </label>
        <figure class="figure-landing-page">
            <img src="../assets/images/pokedex.png" class="image-landing-page">
        </figure>
        <ul class="landing-ul">
            <li><a href="#" class="active">Home</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Register</a></li>
            <li><a href="#">WebDex</a></li>
        </ul>
    </nav>
</template>

<script>

</script>

<style>
.landing-nav {
    background: #24a1e9;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.figure-landing-page {
    display: flex;
    align-items: center;
    margin: 8px;
}

.image-landing-page {
    height: 64px;
    width: 64px;
}

.landing-ul {
    float: right;
    margin-right: 20px;
}

.landing-ul li {
    display: inline-block;
    line-height: 80px;
    margin: 0 10px;
}

.landing-ul li a {
    color: white;
    font-size: 17px;
    padding: 7px 13px;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: bold;
}

.image-landing-page:hover {
    transform: scale(1.1);
    transition: all 350ms ease;
}

.image-landing-page:not(:hover) {
    transform: scale(1);
    transition: all 350ms ease;
}

a.active,
a:hover {
    background: #047bd6;
    transition: .5s;
}

.checkbtn {
    font-size: 30px;
    color: white;
    float: right;
    line-height: 80px;
    margin-right: 40px;
    cursor: pointer;
    display: none;
}

#check {
    display: none;
}

@media (max-width: 952px) {
    nav ul li a {
        font-size: 16px;
    }
}

@media (max-width: 858px) {
    .checkbtn {
        display: block;
    }

    ul {
        position: fixed;
        width: 100%;
        height: 100vh;
        background: #2c3e50;
        top: 80px;
        left: -100%;
        text-align: center;
        transition: all .5s;
    }

    nav ul li {
        display: block;
        margin: 50px 0;
        line-height: 30px;
    }

    nav ul li a {
        font-size: 20px;
    }

    a.active,
    a:hover {
        background: none;
        color: #0082e6;
    }

    #check:checked ~ ul{
        left: 0;
    }
}
</style>