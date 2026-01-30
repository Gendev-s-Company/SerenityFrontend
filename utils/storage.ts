
export const userStorage = 'userLogged'
export const getLocalStorage = () => {
    const local = localStorage.getItem(userStorage)
    if (local) {
        return JSON.parse(local)
    }
    return null;
}