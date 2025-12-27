<script setup lang="ts">
import AbilitiesBlock from "~/components/dnd/AbilitiesBlock.vue";
import DndHeading from "~/components/headings/DndHeading.vue";
import DndHr from "~/components/DndHr.vue";
import DefinitionList from "~/components/lists/DefinitionList.vue";
import DefinitionListItem from "~/components/lists/DefinitionListItem.vue";
import type {Creature} from "~/classes/creatures/creature";
import type {CreatureEdition} from "~/classes/creatures/creatureEdition";
import type {Language} from "~/classes/language";
import InlineLabel from "~/components/labels/InlineLabel.vue";
import {orList} from "~/utils/utils";
import PopoverCreatureType from "~/components/popovers/PopoverCreatureType.vue";
import AlignmentLabel from "~/components/labels/AlignmentLabel.vue";

const props = defineProps<{
    creature?: Creature
    edition?: CreatureEdition
    showTitle?: boolean
}>();

</script>

<template>
    <aside v-if="creature && edition" class="stat-block p-4 bg-black/50 max-w-5xl md:rounded-xl flex flex-col gap-2">
        <header>
            <DndHeading v-if="showTitle" size="2">{{ creature?.name }}</DndHeading>
            <span class="font-light italic">
                {{ ucFirst(orList(edition.sizes.map((size) => size.toString()))) }}

                <PopoverCreatureType :slug="edition?.type?.majorType?.slug">
                    {{ ucFirst(edition?.type?.toString() ?? '') }}
                </PopoverCreatureType>,
                <AlignmentLabel v-for="alignment in edition?.alignment ?? []" :key="alignment.alignment" :alignment="alignment"/>
            </span>
        </header>
        <DndHr/>
        <DefinitionList>
            <DefinitionListItem>
                <template #label>Armor Class</template>
                <template #content>
                    {{ edition.getArmorClass()?.total(edition?.abilities?.dex?.modifier) }}
                    (from )
                </template>
            </DefinitionListItem>

            <DefinitionListItem>
                <template #label>Hit Points</template>
                <template #content>
                    {{ edition.hitPoints?.average}}
                    ({{ edition.hitPoints?.formula }})
                </template>
            </DefinitionListItem>

            <DefinitionListItem>
                <template #label>Speed</template>
                <template #content>
                    {{ edition.movementSpeeds?.toString() }} ft.
                </template>
            </DefinitionListItem>
        </DefinitionList>
        <DndHr/>
        <AbilitiesBlock :abilities="edition.abilities"/>
        <DndHr/>
        <DefinitionList>
            <DefinitionListItem>
                <template #label>Languages</template>
                <template #content>
                    {{ edition.languages?.map((item: Language) => item.name ).join(', ') }}
                    <InlineLabel icon="book">test</InlineLabel>
                </template>
            </DefinitionListItem>

            <DefinitionListItem>
                <template #label>Challenge</template>
                <template #content>
                    {{ edition?.challengeRating }}
                    ({{ edition.xp() }} XP)
                </template>
            </DefinitionListItem>
        </DefinitionList>
    </aside>
</template>

