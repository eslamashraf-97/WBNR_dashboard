export default {
    install: (app) => {
        app.config.globalProperties.$hasPer = function (permission) {
            if (!permission) {
                return true
            }
            if(localStorage.getItem('userData')) {
                return JSON.parse(localStorage.getItem('userData')).permissions.indexOf(permission) > -1;
            } return false
        }
    }
};
