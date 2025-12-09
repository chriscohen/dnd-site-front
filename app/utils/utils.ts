export const DEFAULT_ABILITY_SCORE = 10;

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

export function primaryEdition(item: ISourcebook | ISpell): null | ISourcebookEdition | ISpellEdition {
    if (!item || item.editions != Array) {
        return null;
    }

    return item.editions[0];
}

export function editionToClass(input: string): string {
    switch (input) {
        case '1e':
            return 'edition-1';
        case '2e':
            return 'edition-2';
        case '3e':
        case '3.5':
            return 'edition-3';
        case '4e':
            return 'edition-4';
        case '5e (2014)':
            return 'edition-5';
        case '5e (2024)':
            return 'edition-2024';
        default:
            return '1e';
    }
}

export function formatEdition(input: string) {
    switch (input) {
        case '1e':
            return '1st Edition';
        case '2e':
            return '2nd Edition';
        case '3e':
            return '3rd Edition';
        case '3.5':
            return '3.5 Edition';
        case '4e':
            return '4th Edition';
        case '5e (2014)':
            return '5th Edition (2014)';
        case '5e (2024)':
            return '5th Edition (2024)';
        default:
            return 'unknown edition';
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

export function formatPages(from: number, to?: number): string {
    return 'pp. ' + from + (to ? '—' + to : '');
}
