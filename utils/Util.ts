

export function getCurrency (amount: number,lang: string='fr', currency:string='MGA'){
    return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: currency,
}).format(amount)
}