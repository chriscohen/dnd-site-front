export default defineAppConfig({
    ui: {
        colors: {
            primary: 'white'
        },
        popover: {
            slots: {
                content: 'bg-none'
            }
        },
        tabs: {
            slots: {
                label: 'uppercase',
                list: 'p-0 border-b-none',
                trigger: [
                    'rounded-none',
                    'grow',
                    'data-[state=inactive]:not-disabled:text-gray-400',
                    'data-[state=active]:border-highlighted',
                    'data-[state=active]:border-b',
                    'data-[state=inactive]:border-b',
                    'data-[state=inactive]:border-muted',
                ]
            }
        }
    }
})
