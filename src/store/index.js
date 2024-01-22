// create store
import Vuex from 'vuex';
import loading from './loading';
import languages from './languages';
import notifications from './notifications';
const store = new Vuex.Store({
	modules: {
		loading,
		languages,
		notifications
	},
});

export default store;
