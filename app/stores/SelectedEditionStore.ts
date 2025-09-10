import { defineStore } from 'pinia';

interface IEditionButton {
    id: string
    text: string
    sup?: string
    bgClass: string
    active?: boolean
}

export const useSelectedEditionStore = defineStore('selectedEdition', {
    state: () => ({
        editions: [
            {
                id: 'all',
                text: '∞',
                bgClass: 'default',
                active: true
            },
            {
                id: 'e1',
                text: '1',
                sup: 'st',
                bgClass: 'edition-1',
                active: false
            },
             {
                id: 'e2',
                text: '2',
                sup: 'nd',
                bgClass: 'edition-2',
                active: false
            },
            {
                id: 'e3',
                text: '3',
                sup: 'rd',
                bgClass: 'edition-3',
                active: false
            },
            {
                id: 'e4',
                text: '4',
                sup: 'th',
                bgClass: 'edition-4',
                active: false
            },
            {
                id: 'e2014',
                text: '5',
                sup: '2014',
                bgClass: 'edition-5',
                active: false
            },
            {
                id: 'e2024',
                text: '5',
                sup: '2024',
                bgClass: 'edition-2024',
                active: false
            },
        ]
    }),
    getters: {
        /**
         * Determine if all buttons are active.
         */
        all: (state) => {
            state.editions.forEach((item: IEditionButton) => {
                if (!item.active) {
                    return false;
                }
            });
            return true;
        },
        get: (state) => {
            return (id: string) => state.editions.find((item: IEditionButton) => item.id === id);
        }
    },
    actions: {
        setAll(onOrOff: boolean) {
            const editionsClone = this.editions.slice();
            editionsClone.forEach((item: IEditionButton) => {
                item.active = onOrOff;
            });
            this.$patch({editions: editionsClone});
        },
        toggle(id: string) {
            if (id === 'all') {
                this.setAll(!this.all);
            }

            const editionsClone = this.editions.slice();
            editionsClone.forEach((item: IEditionButton) => {
                if (item.id === id) {
                    item.active = !item.active;
                }
            });
            this.$patch({editions: editionsClone});
        }
    }
});
