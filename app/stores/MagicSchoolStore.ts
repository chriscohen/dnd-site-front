import { defineStore } from 'pinia';

export const useMagicSchoolStore = defineStore('magicSchool', {
    state: () => ({
        contents: [],
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
            this.contents = data.value.magicSchools;
        }
    }
});

export interface MagicSchool {
    id: string,
    name: string,
}
