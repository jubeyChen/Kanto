Vue.createApp({
    data() {
        return {
            current_tab: 'login',
            activeBtn: 'login',
            showForget: false,
            showDone: false
        };
    },
    methods: {
        tabOn(show) {
            this.current_tab = show;
            this.activeBtn = show;
        }
    }

}).mount('.loginRegister');