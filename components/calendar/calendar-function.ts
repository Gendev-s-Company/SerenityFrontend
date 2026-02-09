const day = new Date();
day.setHours(0, 0, 0, 0);
const createDate = (baseDate: Date, dayOffset: number, hours: number, minutes = 0) => {
    const date = new Date(baseDate);
    // On ajoute le décalage de jours
    date.setDate(date.getDate() + dayOffset);
    // On règle l'heure
    date.setHours(hours, minutes, 0, 0);
    return date;
};
export const simpleTransform = (input: Date) => {
    const inputDate = new Date(input);
    return createDate(input, 0, inputDate.getHours(), inputDate.getMinutes());
};
export type CalendarEvent = {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    variant?: "primary" | "secondary" | "outline";
    color?: string
};
export type Calendarbody = {
    title: string;
    start: string;
    end: string;
    color?: string,
    variant: CalendarEvent["variant"]
}
// export const calendarData: CalendarEvent[] = [
//     {
//         title: "Customer onboarding",
//         start: createDate(1, 13),
//         end: createDate(1, 14),
//         variant: "primary",
//     },
//     {
//         title: "Product design sync",
//         start: createDate(0, 9, 30),
//         end: createDate(0, 10, 30),
//         variant: "primary",
//         color: '#fdef26'
//     },

//     {
//         title: "Deep work block",
//         start: createDate(2, 11),
//         end: createDate(2, 13),
//         variant: "primary",
//     },
//     {
//         title: "Team offsite",
//         start: createDate(-1, 0),
//         end: createDate(1, 0),
//         allDay: true,
//         variant: "primary",
//     },
//     {
//         title: "Retro & planning",
//         start: createDate(3, 15),
//         end: createDate(3, 16, 30),
//         variant: "primary",
//     },
//     {
//         title: "Quarterly roadmap",
//         start: createDate(30, 10),
//         end: createDate(30, 11, 30),
//         variant: "primary",
//     },
//     {
//         title: "Partner demo",
//         start: createDate(32, 14),
//         end: createDate(32, 15),
//         variant: "primary",
//     },
//     {
//         title: "Billing review",
//         start: createDate(34, 9),
//         end: createDate(34, 10),
//         variant: "primary",
//     },
//     {
//         title: "Security tabletop",
//         start: createDate(36, 13),
//         end: createDate(36, 14, 30),
//         variant: "primary",
//     },
// ]

export const startOfToday = day
