interface IAttackType {
    id: string
    name: string
}

interface IMagicSchool {
    id: string
    name: string
}

interface ISourcebook {
    id: string
    name: string
    product_code: string
    source_type: string
    game_edition: string
    cover_image: string
    editions: ISourcebookEdition[]
}

interface ISourcebookEdition {
    id: string
    sourcebook_id: string
    name: string
    binding: string
    isbn10: string
    isbn13: string
    release_date: string
}
