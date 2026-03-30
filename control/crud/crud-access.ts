import { Actions } from "@/types/component-type/Action-type"

// cas général
const list_action: Actions[] = [
    { min_weight: 0, max_weight: 0, action: ['unauthorized'] },
    { min_weight: 1, max_weight: 4, action: ['read'] },
    { min_weight: 5, max_weight: 6, action: ['read', 'update'] },
    { min_weight: 7, max_weight: 8, action: ['read', 'update', 'create'] },
    { min_weight: 9, max_weight: 10, action: ['read', 'update', 'create', 'delete'] },
]
export const findAuthority = (authority: number = 1) => {
    return list_action.find((row) => row.min_weight <= authority && row.max_weight >= authority)
}
