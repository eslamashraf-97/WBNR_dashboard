
import { ref } from 'vue'
import faqServices from '../services/faq.services'
export function useFaqs() {

    const faqs = ref([])
    function getAllFaqs() {
        faqServices.getAll(res => {
            faqs.value = res.data.data
        })
    }
    getAllFaqs()
    return { faqs }
}
