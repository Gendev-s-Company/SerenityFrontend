
export function getCurrency (lang: string, currency:string, amount: number){
    return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: currency,
}).format(amount)
}