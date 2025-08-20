import { defineStore } from 'pinia';

export const useAttackTypeStore = defineStore('attackType', {
    state: () => ({
        contents: [] as IAttackType[],
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
            this.contents = data.value.attackTypes;
        }
    }
});
