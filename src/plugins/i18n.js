import { createI18n } from 'vue-i18n';
import locales from '../locales';

const messages = {
	...locales,
};

export default createI18n({
	locale: localStorage.getItem('lang') || 'en',
	fallbackLocale: localStorage.getItem('lang') || 'en',
	legacy: false,
	messages,
});
