export const useLocalStorage = () => {
    const get = (key: string) => localStorage.getItem(key) || ''

    const set = (key: string, value: string) => localStorage.setItem(key, value)

    return {
        get,
        set,
    }
}

export default useLocalStorage
