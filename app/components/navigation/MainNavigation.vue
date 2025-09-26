<script setup lang="ts">
const route = useRoute();
const active = ref<string>('Home');

watch(
    () => route.fullPath,
    () => active.value = route.path,
);

type RouteData = {
    name: string
    path: string
};

const routeData = ref<RouteData[]>([
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Spells',
        path: '/spells',
    },
    {
        name: 'Items',
        path: '/items',
    },
    {
        name: 'Sources',
        path: '/sources',
    },
    {
        name: 'Campaign Settings',
        path: '/campaign-settings',
    }
]);

function getActive(item: RouteData): boolean {
    if (active.value === '/') {
        return item.path === '/';
    } else {
        return item.path === active.value;
    }
}

</script>

<template>
    <nav role="navigation">
        <ul id="main-navigation" class="navigation-menu">
            <li v-for="item in routeData" :key="item.name">
                <ULink :to="item.path" :class="getActive(item) ? 'active' : ''">{{ item.name }}</ULink>
            </li>
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

            &.active {
                background-color: colors.$bg-active;
                color: colors.$text-dark;

                &:hover {
                    background-color: colors.$bg-hover;
                    color: colors.$text-dark-hover;
                }
            }

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
