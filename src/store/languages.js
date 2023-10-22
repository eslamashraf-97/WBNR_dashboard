import englishFlag from '@/assets/images/flags/flag-01.png';
import arabicFlag from '@/assets/images/flags/flag-500.png';
import i18n from '@/plugins/i18n';

const state = {
	lang:	{ title: 'Arabic', value: 'ar', image: arabicFlag, rtl: true },
	langOptions: [
		{ title: 'English', value: 'en', image: englishFlag, rtl: false },
		{ title: 'Arabic', value: 'ar', image: arabicFlag, rtl: true },
	],
};
const mutations = {
	changeLang(state, data) {
		state.lang = data;
		i18n.global.locale = data.value;
		document
			.getElementsByTagName('html')[0]
			.setAttribute('dir', data.rtl ? 'rtl' : 'ltr');
		localStorage.setItem('lang', data.value);
		// window.location.reload()
	},
};

const actions = {};

const getters = {
	getLang: (state) => state.lang || null,
	getLangOptions: (state) => state.langOptions || null,
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
