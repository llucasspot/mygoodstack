import {ref} from 'vue'

export function useState<T>(initialValue: T) {
    const state = ref(initialValue)
    const setState = (newValue: T) => {
        state.value = newValue
    }
    return [state, setState]
}