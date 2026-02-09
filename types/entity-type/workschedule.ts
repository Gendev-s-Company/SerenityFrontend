export interface WorkSchedule {
    scheduleID: string | null,
    userID: string,
    color?: string,
    starttime: Date,
    endtime: Date|null,
    status: number,
}