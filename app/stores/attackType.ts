import { defineStore } from 'pinia';

export const useAttackTypeStore = defineStore('attackType', {
    state: () => ({
        attackTypes: [],
    }),
    actions: {
        async getAll() {
            const query = gql`
                query {
                    attackTypes {
                        id
                        name
                    }
                }`;

            const { data } = await useAsyncQuery(query);
            this.magicSchools = data.value.magicSchools;
        }
    }
});
