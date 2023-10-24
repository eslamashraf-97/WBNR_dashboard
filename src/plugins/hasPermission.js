export default {
    install: (app) => {
        app.config.globalProperties.$hasPer = function (permission) {
            if (!permission) {
                return true
            }
            if(localStorage.getItem('permissions')) {
                return JSON.parse(localStorage.getItem('permissions')).indexOf(permission) > -1;
            } return false
        }
    }
};
