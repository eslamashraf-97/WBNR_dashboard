
import {onBeforeMount, ref} from 'vue'
import countryServices from '../services/country.services'
export function useCountries() {
    const countries = ref([])

    const getAllCountries = async () => {
        let res  = await countryServices.getAll()
        countries.value = res.data.data
    }

    onBeforeMount(() => {
        getAllCountries()
    })

    return { countries }
}
