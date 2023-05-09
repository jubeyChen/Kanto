Vue.createApp({
    data() {
        return {
            showLogin: true,
            showRegister: false,
            activeBtn: 'login',
            showForget: false,
            showDone: false
        };
    }

}).mount('.loginRegister');