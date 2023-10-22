
import {onBeforeMount, ref} from 'vue'
import employeeServices from '../services/employee.services'
export function usePermissions() {
    const permissions = ref([])

    const getAllPermissions = async () => {
        let res  = await employeeServices.getAllPermissions()
        permissions.value = res.data.data
    }

    onBeforeMount(() => {
        getAllPermissions()
    })

    return { permissions }
}
