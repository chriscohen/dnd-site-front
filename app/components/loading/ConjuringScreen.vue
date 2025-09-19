<script setup lang="ts">

</script>

<template>
    <div class="conjuring-wrapper">
        <aside class="conjuring-container">
            <img :src="'/images/rose.svg'" alt="Loading indicator">
            <h1>Conjuring…</h1>
        </aside>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/fonts';

.conjuring-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.conjuring-container {
    width: 50rem;
    height: 20rem;
    position: relative;

    > h1 {
        @include fonts.mrs-eaves;
        position: absolute;
        top: 3rem;
        font-size: 8rem;
    }

    > img {
        width: 20rem;
        height: 20rem;
        position: absolute;
        left: 10rem;
        rotate: 0deg;
        animation: roseRotate 12s linear infinite;
    }
}

@keyframes roseRotate {
    from {
        rotate: 0deg;
    }
    to {
        rotate: 360deg;
    }
}
</style>
