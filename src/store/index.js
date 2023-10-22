// create store
import Vuex from 'vuex';
import loading from './loading';
import languages from './languages';
const store = new Vuex.Store({
	modules: {
		loading,
		languages,
	},
});

export default store;
