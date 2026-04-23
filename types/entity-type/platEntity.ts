import { PlatTypeEntity } from "./platTypeEntity";

export interface PlatEntity {
    dishID: string|null,
    name: string,
    description: string,
    type: PlatTypeEntity,
    status: number,
    state: number,
    skipValidation?: boolean
}