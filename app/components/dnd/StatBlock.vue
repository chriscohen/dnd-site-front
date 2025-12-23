<script setup lang="ts">
import AbilitiesBlock from "~/components/dnd/AbilitiesBlock.vue";
import DndHeading from "~/components/headings/DndHeading.vue";
import DndHr from "~/components/DndHr.vue";
import DefinitionList from "~/components/lists/DefinitionList.vue";
import DefinitionListItem from "~/components/lists/DefinitionListItem.vue";
import type {Creature} from "~/classes/creatures/creature";
import type {CreatureEdition} from "~/classes/creatures/creatureEdition";
import type {Language} from "~/classes/language";

const props = defineProps<{
    creature?: Creature
    edition?: CreatureEdition
    showTitle?: boolean
}>();
</script>

<template>
    <aside v-if="creature && edition" class="stat-block p-4 bg-black/50 max-w-5xl rounded-xl flex flex-col gap-2">
        <header>
            <DndHeading v-if="showTitle" size="2">{{ creature?.name }}</DndHeading>
            <span class="font-light italic text-md">
                {{ edition.sizes?.[0] }}
                {{ edition.type?.name }}
                (Yugoloth)
                , {{ 'Unknown Alignment' }}
            </span>
        </header>
        <DndHr/>
        <DefinitionList>
            <DefinitionListItem>
                <template #label>Armor Class</template>
                <template #content>
                    {{ edition.armorClass?.total(edition.abilities?.dex?.modifier() ) }}
                    (from {{ edition.armorClass?.from() }})
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
                <template #content>{{ edition.languages?.map((item: Language) => item.name ).join(', ') }}</template>
            </DefinitionListItem>

            <DefinitionListItem>
                <template #label>Challenge</template>
                <template #content>{{ edition?.challengeRating }}</template>
            </DefinitionListItem>
        </DefinitionList>
    </aside>
</template>

