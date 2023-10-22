const state = {
	loading: false,
};
const mutations = {
	setLoadingStatus(state, data) {
		state.loading = data;
	},
};

const actions = {};

const getters = {
	getLoadingStatus: (state) => state.loading || null,
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
