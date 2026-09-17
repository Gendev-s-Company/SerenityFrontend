import { UserEntity } from "./userEntity";

export interface WorkSchedule {
    scheduleID: string | null;
    users: UserEntity;
    color?: string;
    starttime: Date;
    endtime: Date | null;
    description: string;
    status: number;
}