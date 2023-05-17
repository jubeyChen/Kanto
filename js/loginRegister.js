Vue.createApp({
    data() {
        return {
            current_tab: 'login',
            activeBtn: 'login',
            showForget: false,
            showDone: false,
            start: false,
            email: '',
            isValidEmail: true,
            pw: '',
            pwCheck: '',
            isPasswordMatch: true,
        };
    },
    computed: {
        isValidPwLength() {
            return this.pw.length >= 4;
        }
    },
    methods: {
        tabOn(show) {
            this.current_tab = show;
            this.activeBtn = show;
        },

        submitForm() {
            // 如果電子郵件地址無效，則顯示錯誤消息
            if (!this.isValidEmail || !this.isValidPwLength) {
                return;
            }

            if (!this.isPasswordMatch) {
                return;
            }
        },
        checkEmailValidity() {
            // 使用正則表達式檢查email地址的有效性
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.isValidEmail = regex.test(this.email);
        }
    },

    watch: {
        email() {
            // 監聽email變化，並在每次變化時檢查其有效性
            this.checkEmailValidity();
        },

        pwCheck() {
            this.isPasswordMatch = this.pwCheck === this.pw;
        }

    },

    created() {
        setTimeout(() => {
            this.start = true;
        }, 100);


    },

}).mount('.loginRegister');