export function toOrdinal(input: string): string {
    switch (input) {
        case '1':
            return '1st'
        case '2':
            return '2nd'
        case '3':
            return '3rd';
        default:
            return input + 'th'
    }
}

export function formatIsbn(input: string): string {
    if (input.length == 10) {
        return [
            input.substring(0, 1),
            input.substring(1, 5),
            input.substring(5, 9),
            input.substring(9)
        ].join('-');
    } else {
        return [
            input.substring(0, 3),
            input.substring(3, 4),
            input.substring(4, 6),
            input.substring(6, 12),
            input.substring(12, 13)
        ].join('-');
    }
}
