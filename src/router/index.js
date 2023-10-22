import { createRouter, createWebHistory } from 'vue-router';
import dashboardLayout from "@/layouts/dashboard/Index.vue";
import authLayout from "@/layouts/AuthLayout.vue";
// import index from "@/views/index.vue";
import authRoutes from "@/modules/auth/auth.routes";
import dashboardRoutes from '@/modules/dashboard/dashboard.routes';
import healthInsuranceRoutes from "@modules/healthInsuranceDocuments/healthInsurance.routes";
import carInsuranceRoutes from "@modules/carInsuranceDocuments/carInsurance.routes";
import savedCarRoutes from "@modules/savedCar/savedCar.routes";
import familyRoutes from "@modules/family/family.routes";
import settingsRoutes from "@modules/settings/settings.routes";

import productRoutes from "@/modules/products/product.routes";
import categoryRoutes from "@/modules/category/category.routes";
import countryRoutes from "@/modules/country/country.routes";
import governorateRoutes from "@/modules/governorates/governorate.routes";

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
				...healthInsuranceRoutes,
				...carInsuranceRoutes,
				...savedCarRoutes,
				...familyRoutes,
				...settingsRoutes,
				...productRoutes,
				...categoryRoutes,
				...countryRoutes,
				...governorateRoutes
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
// router.beforeEach((to, from, next) => {
// 	to.matched.some((record) => {
// 		const tokenValid = !!localStorage.getItem('access_token')
// 		if (record.meta.requireAuth && !tokenValid) {
// 			next({
// 				name: "signIn",
// 			});
// 		}
// 		else if (record.meta.authRoute && tokenValid) {
// 			next({
// 				name: "home",
// 			});
// 		}
// 		else {
// 			next()
// 		}
//
// 		return true
// 	});
// });

export default router;
