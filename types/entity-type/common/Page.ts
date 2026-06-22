export interface Page<T> {

    content: T[],
    empty: boolean,
    first: true,
    last: true,
    number: number,
    numberOfElements: number,
    page: {
        offset: number,
        number: number,
        size: number,
        paged: boolean,
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        unpaged: boolean
        totalElements: number,
        totalPages: number
    },
    size: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },


}