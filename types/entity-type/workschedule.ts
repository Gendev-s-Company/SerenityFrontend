export interface WorkSchedule {
    scheduleID: string | null,
    userID: string,
    starttime: Date,
    endtime: Date|null,
    status: number,
}