import index from './pages/index.vue';
import users from './pages/users.vue';
import roles from './pages/roles.vue';

export default [{
    path: '/employee',
    name: 'employee-routes',
    redirect: '/employee/users',
    component: index,
    children: [
        {
            name: 'employee',
            path: 'users',
            component: users,
        },
        {
            name: 'roles',
            path: 'roles',
            component: roles,
        }
    ]
}]
