
import { ref } from 'vue'
import governorateServices from '../services/governorate.services'
export function useGovernorates() {

    const governorates = ref([])


    function getAllGovernorates() {
        governorateServices.getAll(res => {
            governorates.value = res.data.data
        })
    }
    getAllGovernorates()

    return { governorates }
}
