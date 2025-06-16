import { ref } from 'vue'

export function useState<T>(initialValue: T) {
    const state = ref<T>(initialValue)
    const setState = (newValue: T) => {
        state.value = newValue
    }
    return [state, setState]
}