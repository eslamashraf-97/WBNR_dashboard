import { createRouter, createWebHistory } from 'vue-router';
import dashboardLayout from "@/layouts/dashboard/Index.vue";
import authLayout from "@/layouts/AuthLayout.vue";

import authRoutes from "@/modules/auth/auth.routes";
import dashboardRoutes from '@/modules/dashboard/dashboard.routes';
import productRoutes from "@/modules/products/product.routes";
import categoryRoutes from "@/modules/category/category.routes";
import countryRoutes from "@/modules/country/country.routes";
import governorateRoutes from "@/modules/governorates/governorate.routes";
import customerRoutes from "@/modules/customers/customer.routes";
import employeeRoutes from "@/modules/employee/employee.routes";
import orderRoutes from "@/modules/orders/order.routes";
import returnedOrderRoutes from "@/modules/returnOrders/order.routes";
import walletRoutes from "@modules/wallet/wallet.routes";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/:catchAll(.*)",
			redirect: '/not-found',
		},
		{
			path: '/',
			redirect: '/index',
			component: dashboardLayout,
			children: [
				...dashboardRoutes,
				...productRoutes,
				...categoryRoutes,
				...countryRoutes,
				...governorateRoutes,
				...customerRoutes,
				...employeeRoutes,
				...orderRoutes,
				...returnedOrderRoutes,
				...walletRoutes
			],
			meta: {
				requireAuth: true,
			},
		},
		{
			path: '/auth',
			component: authLayout,
			children: [
				...authRoutes,
			],
			meta: {
				requireAuth: false,
			},
		}
	],
});
router.beforeEach((to, from, next) => {
	to.matched.some((record) => {
		const tokenValid = !!localStorage.getItem('access_token')
		if (record.meta.requireAuth && !tokenValid) {
			next({
				name: "signIn",
			});
		}
		else if (record.meta.authRoute && tokenValid) {
			next({
				name: "home",
			});
		}
		else {
			next()
		}

		return true
	});
});

export default router;
