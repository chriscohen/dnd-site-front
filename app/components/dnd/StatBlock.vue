<script setup lang="ts">
import AbilitiesBlock from "~/components/dnd/AbilitiesBlock.vue";
import type {ActorType} from "dnd5e-ts";

const props = defineProps<{
    creature: ActorType
}>();
console.log(props.creature);
</script>

<template>
    <div>
        <aside class="stat-block">
            <header>
                <h2>{{ creature?.name }}</h2>
                <span>
                    {{ creature.size?.getName() ?? 'Size' }}
                    {{ creature.type?.name ?? 'Type' }}
                    (Yugoloth)
                    , {{ creature.getAlignment() ?? 'Unknown Alignment' }}
                </span>
            </header>
            <hr>
            <dl>
                <dt>Armor Class</dt>
                <dd>15 (natural armor)</dd>

                <dt>Hit Points</dt>
                <dd>
                    {{ creature.hitPoints?.average }}
                    ({{ creature.hitPoints?.formula?.toString() }})
                </dd>

                <dt>Speed</dt>
                <dd>{{ creature.movementSpeeds?.toString() }}</dd>
            </dl>
            <hr>
            <AbilitiesBlock :abilities="creature.abilities"/>
            <hr>
            <dl>
                <dt>Languages</dt>
                <dd>{{ creature.languages?.toString() ?? 'unknown' }}</dd>

                <dt>Challenge</dt>
                <dd>{{ creature.challengeRating }} ({{ creature.getXp() }} XP)</dd>
            </dl>
        </aside>
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/fonts';

hr {
    border-top: 0.5rem double colors.$dnd-red-500;
}

dl {
    color: colors.$dnd-red-200;
    @include fonts.scala-sans;
}

.stat-block {
    color: colors.$black;
    padding: 1rem;
    background: radial-gradient(colors.$dnd-bg-to, colors.$dnd-bg-from);
    @include fonts.bookmania;
    font-size: 125%;

    > header {
        h2 {
            @include fonts.mrs-eaves;
            font-size: 2.5rem;
            color: colors.$dnd-red-500;
            font-weight: 700;
        }
    }
}
</style>
