import englishFlag from "@/assets/images/flags/flag-01.png";
import arabicFlag from "@/assets/images/flags/flag-500.png";
import i18n from "@/plugins/i18n";

const state = {
  notifications: [],
};
const mutations = {
  updateNotifications(state, data) {
    const notification = state.notifications.find(
      (notification) => notification.id == data.id
    );
    if (notification) {
      state.notifications = state.notifications.map((notification) => {
        if (notification.id == data.id) {
          return data;
        }
        return notification;
      });
    } else {
      state.notifications.push(data);
    }
  },
};

const actions = {
  updateNotifications({ commit }, data) {
    commit("updateNotifications", data);
  },
};

const getters = {
  getNotifications: (state) => state.notifications || null,
  isNewMessages: (state) => {
    const notification = state.notifications.find(
      (notification) => notification.count > 0
    );
    return notification ? true : false;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
