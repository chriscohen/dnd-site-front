<script setup lang="ts">
const store = useItemStore();
store.getAll(RenderMode.FULL);
</script>

<template>
    <div>
        <LoadingConjuringScreen v-if="store.isLoading()"/>
        <div v-if="!store.isLoading()" class="flex gap-4" >
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="item in store.full" :key="item.id">
                    <td>{{ item.name }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
