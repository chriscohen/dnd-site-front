import { defineStore } from 'pinia';

interface IEditionButton {
    id: string
    name: string
    text: string
    sup?: string
    bgClass: string
    active?: boolean
}

export const usePersistedStore = defineStore('persisted', {
    state: () => ({
        editions: [
            {
                id: 'all',
                name: 'all',
                text: '∞',
                bgClass: 'default',
                active: true
            },
            {
                id: 'e1',
                name: '1e',
                text: '1',
                sup: 'st',
                bgClass: 'edition-1',
                active: false
            },
            {
                id: 'e2',
                name: '2e',
                text: '2',
                sup: 'nd',
                bgClass: 'edition-2',
                active: false
            },
            {
                id: 'e3',
                name: '3e',
                text: '3',
                sup: 'rd',
                bgClass: 'edition-3',
                active: false
            },
            {
                id: 'e4',
                name: '4e',
                text: '4',
                sup: 'th',
                bgClass: 'edition-4',
                active: false
            },
            {
                id: 'e2014',
                name: '5.2014',
                text: '5',
                sup: '2014',
                bgClass: 'edition-5',
                active: false
            },
            {
                id: 'e2024',
                name: '5.2024',
                text: '5',
                sup: '2024',
                bgClass: 'edition-2024',
                active: false
            },
        ]
    }),
    persist: true,
    getters: {
        /**
         * Determine if all buttons are active.
         */
        all: (state) => {
            let ret = true;

            state.editions.forEach((item: IEditionButton) => {
                if (item.id !== 'all' && !item.active) {
                    ret = false;
                }
            });
            return ret;
        },
        /**
         * Are any editions selected except "all"?
         */
        any: (state) => {
            let ret = false;
            state.editions.forEach((item: IEditionButton) => {
                if (item.id !== 'all' && item.active) {
                    ret = true;
                }
            });
            return ret;
        },
        get: (state) => {
            return (id: string) => state.editions.find((item: IEditionButton) => item.id === id);
        },
        getEditionsQueryString: (state) => {
            const enabled: string[] = [];

            state.editions.forEach((item: IEditionButton) => {
                if (item.active) {
                    enabled.push(item.name);
                }
            });

            return 'editions=' + enabled.join(',');
        }
    },
    actions: {

        set(key: string, value: boolean) {
            this.editions.forEach((item: IEditionButton) => {
                if (item.id === key) {
                    item.active = value;
                }
            });
        },
        setAll(onOrOff: boolean) {
            const editionsClone = this.editions.slice();
            editionsClone.forEach((item: IEditionButton) => {
                item.active = onOrOff;
            });
            this.$patch({editions: editionsClone});
        },
        toggle(id: string) {
            if (id === 'all') {
                this.setAll(false);
            }

            const editionsClone = this.editions.slice();
            editionsClone.forEach((item: IEditionButton) => {
                if (item.id === 'all') {
                    // If ANY editions are selected, set the "ALL" button to off.
                    item.active = !this.any;
                } else if (item.id === id) {
                    item.active = !item.active;
                }
            });
            this.$patch({editions: editionsClone});
        }
    }
});
