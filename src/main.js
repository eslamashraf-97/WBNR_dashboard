import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './plugins/i18n';
import globalComponents from './plugins/globalComponents';
import validator from './plugins/validator';
import './assets/styles/main.scss';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Vue3Lottie from 'vue3-lottie';
import 'vue3-lottie/dist/style.css';
import hasPermission from "@/plugins/hasPermission";
import mitt from 'mitt';
const emitter = mitt();


export const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app
	.use(router)
	.use(store)
	.use(i18n)
	.use(PrimeVue)
	.use(globalComponents)
	.use(validator)
	.use(ToastService)
	.use(hasPermission)
	.use(emitter)
	.use(Vue3Lottie, { name: 'LottieAnimation' })
	.mount('#app')
