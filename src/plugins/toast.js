import { ToastSeverity } from 'primevue/api';
import { app } from '@/main';

const lifeTime = 3000;

export function info(title = 'I am title', body = 'I am body') {
	app.config.globalProperties.$toast.add({
		severity: ToastSeverity.INFO,
		summary: title,
		detail: body,
		life: lifeTime,
	});
}
export function success(title = 'Success', body = 'success Message') {
	app.config.globalProperties.$toast.add({
		severity: ToastSeverity.SUCCESS,
		summary: title,
		detail: body,
		life: lifeTime,
	});
}

export function error(title = 'error', body = 'error mesage') {
	app.config.globalProperties.$toast.add({
		severity: ToastSeverity.ERROR,
		summary: title,
		detail: body,
		life: lifeTime,
	});
}
