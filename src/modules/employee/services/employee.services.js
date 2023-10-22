import { api } from '@/axios';
export default {
    getAllPermissions () {
        return api().get('admin/permissions')
    },
    getAllRoles () {
        return api().get('admin/roles')
    },
    createRole (payload) {
        return api().post('admin/roles', payload)
    },
    editRole (payload) {
        return api().patch(`admin/roles/${payload.id}`, payload)
    },
    createUser (payload) {
        return api().post('admin/users', payload)
    },
    editUser (payload) {
        return api().patch(`admin/users/${payload.id}`, payload)
    }
}
