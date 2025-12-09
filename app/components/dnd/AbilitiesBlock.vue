<script setup lang="ts">
import type {ActorAbilityScores} from "dnd5e-ts";

interface Props {
    abilities?: ActorAbilityScores
}

const props = defineProps<Props>();
console.log(props.abilities);
</script>

<template>
    <ul>
        <li title="Strength">
            <span>str</span>
            <span>
                {{ abilities?.str.format() }}
            </span>
        </li>
        <li title="Dexterity">
            <span>dex</span>
            <span>{{ abilities?.dex.format() }}</span>
        </li>
        <li title="Constitution">
            <span>con</span>
            <span>{{ abilities?.con.format() }}</span>
        </li>
        <li title="Intelligence">
            <span>int</span>
            <span>{{ abilities?.int.format() }}</span>
        </li>
        <li title="Wisdom">
            <span>wis</span>
            <span>{{ abilities?.wis.format() }}</span>
        </li>
        <li title="Charisma">
            <span>cha</span>
            <span>{{ abilities?.cha.format() }}</span>
        </li>
    </ul>
</template>

<style scoped lang="scss">
@use '~/assets/css/default/colors';
@use '~/assets/css/default/fonts';

ul {
    @include fonts.scala-sans;
    color: colors.$dnd-red-text;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    padding: 0.5rem 1rem;

    > li {
        > span {
            display: block;
            text-align: center;
            width: 100%;
            text-transform: uppercase;

            &:first-child {
                font-weight: 700;
            }
        }

    }
}
</style>
