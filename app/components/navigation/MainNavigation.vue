<script setup lang="ts">

</script>

<template>
    <nav role="navigation">
        <ul id="main-navigation" class="navigation-menu">
            <li><ULink to="/">Home</ULink></li>
            <li><ULink to="/spells">Spells</ULink></li>
            <li><ULink to="/items">Items</ULink></li>
            <li><ULink to="/sources">Sources</ULink></li>
            <li><ULink to="/campaign-settings">Campaign Settings</ULink></li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
@use '../../assets/css/colors';
@use '~/assets/css/fonts';

.navigation-menu {
    display: flex;
    font-size: 2rem;
    color: colors.$gray-400;

    padding-top: 1rem;
    margin-bottom: 1rem;

    @include fonts.mrs-eaves;

    > li {
        > a {
            padding: 0 1rem;
            border-bottom: 1px solid colors.$gray-600;

            transition: 250ms ease-in-out;

            &:hover {
                border-bottom: 1px solid colors.$gray-50;
                color: colors.$gray-50;
            }

            > ul {
                position: absolute;

                display: none;
                opacity: 0;
                visibility: hidden;
            }
        }
    }
}
</style>
