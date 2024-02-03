import { onBeforeMount, ref } from "vue";
// import employeeServices from '../services/employee.services'
import { permissions as allPermissions } from "@/permissions";
export function usePermissions() {
  const permissions = ref([]);

  const getAllPermissions = async () => {
    // let res = await employeeServices.getAllPermissions();
    permissions.value = allPermissions;
  };

  onBeforeMount(() => {
    getAllPermissions();
  });

  return { permissions };
}
