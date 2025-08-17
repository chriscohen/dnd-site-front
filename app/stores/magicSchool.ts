import { defineStore } from 'pinia';

export const useMagicSchoolStore = defineStore('magicSchool', {
    state: () => ({
        magicSchools: [],
    }),
    actions: {
        async getAll() {
            const query = gql`
                query {
                    magicSchools {
                        id
                        name
                    }
                }`;

            const { data } = await useAsyncQuery(query);
            this.magicSchools = data.value.magicSchools;
        }
    }
});
