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
        name: 'Magic',
        children: [
            {
                name: 'Spells',
                path: '/spells'
            },
            {
                name: 'Magic Schools',
                path: '/'
            }
        ]
    },
    {
        name: 'Items',
        path: '/items',
    },
    {
        name: 'Heroes',
        children: [
            {
                name: 'Classes',
                path: '/classes'
            },
            {
                name: 'Feats',
                path: '/'
            },
            {
                name: 'Skills',
                path: '/'
            }
        ]
    },
    {
        name: 'Foes',
        children: [
            {
                name: 'Monsters',
                path: '/'
            }
        ]
    },
    {
        name: 'Sources',
        children: [
            {
                name: 'Sourcebooks',
                path: '/sources'
            },
            {
                name: 'Magazines',
                path: '/'
            },
            {
                name: 'Websites',
                path: '/'
            }
        ]
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
                <ULink v-if="item.path" :to="item.path" :class="getActive(item) ? 'active' : ''">
                    {{ item.name }}
                </ULink>

                <template v-else-if="item.children">
                    <span>{{ item.name }}</span>

                    <ul>
                        <li v-for="inner in item.children" :key="inner.name">
                            <ULink v-if="inner.path" :to="inner.path" :class="getActive(inner) ? 'active' : ''">
                                {{ inner.name }}
                            </ULink>
                        </li>
                    </ul>
                </template>


            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/fonts';
@use '~/assets/css/default/mixins';
@use '~/assets/css/default/variables';

.navigation-menu {
    display: flex;
    font-size: 2rem;
    color: colors.$gray-400;

    padding-top: 1rem;
    margin-bottom: 1rem;

    @include fonts.mrs-eaves;

    > li {
        border-bottom: 1px solid colors.$gray-600;
        cursor: pointer;

        > a, span {
            padding: 0 1rem;

            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;

            transition: 250ms ease-in-out;

            &.active {
                background-color: colors.$white-50;

                &:hover {
                    background-color: colors.$bg-hover;
                }
            }

            &:hover {
                border-bottom: 1px solid colors.$gray-50;
                color: colors.$gray-50;
            }
        }

        > ul {
            background-color: colors.$gray-800;
            border-top: 1px solid transparent;
            position: absolute;
            @include mixins.lightShadow;

            opacity: 0;
            visibility: hidden;

            transition: opacity variables.$default-delay ease-in-out;
        }
        &:hover > ul {
            opacity: 1;
            visibility: visible;
            z-index: 1;

            > li {
                > a {
                    display: block;
                    padding: 0 1rem;
                    transition: all variables.$default-delay ease-in-out;

                    &:hover {
                        background-color: colors.$bg-active;
                        color: colors.$text-dark;
                    }
                }
            }
        }
    }
}
</style>
