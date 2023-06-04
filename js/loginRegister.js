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
            isUniqueEmail: true,
            pw: '',
            pwCheck: '',
            isPasswordMatch: true,
            forgetEmail: '',
            errorMessage: ''
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
            this.email = '';
        },

        checkEmailValidity() {
            // 使用正則表達式檢查email地址的有效性
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.isValidEmail = regex.test(this.email);
        },

        PWCheck() {
            this.isPasswordMatch = (this.pwCheck === this.pw);
        },

        //完成↓
        doLogin() {
            const userData = {
                loginID: document.getElementById('loginID').value,
                loginPW: document.getElementById('loginPW').value,
            };

            axios.post('../php/Login.php', userData)
                .then(response => {
                    if (response.data === '登入成功') {
                        alert('登入成功');
                        window.location.href = '../dist/product.html';
                    } else if (response.data === 'locked'){
                        alert('您的帳號已被鎖定，請洽客服為您協助，謝謝。');
                    }
                    else {
                        alert('帳號或密碼有誤，請重新輸入');
                        this.email = '';
                        this.pw = '';
                    }
                })
                .catch(error => {
                    alert(error);
                });
        },

        //完成↓
        checkUnique() {
            const registerID = (this.email).trim();

            axios.post('../php/CheckEmail.php', { registerID: registerID })
                .then(response => {
                    if (response.data === 'isUsed' && this.email !== '') {
                        this.isUniqueEmail = false;
                    } else {
                        this.isUniqueEmail = true;
                    }
                })
                .catch(error => {
                    alert(error);
                });
        },

        //完成↓
        doRegister() {
            const registerData = {
                registerID: (this.email).trim(),
                registerPW: (this.pw),
            };

            if (this.isValidEmail && this.isPasswordMatch && this.email !== '' && this.pw !== '' & this.pwCheck !== '' && this.isUniqueEmail) {
                axios.post('../php/Register.php', registerData)
                    .then(response => {
                        if (response.data === '註冊成功') {
                            alert('註冊成功! 請您登入');
                            window.location.href = '../dist/loginRegister.html';
                        } else {
                            alert('註冊會員失敗，請重新註冊帳號密碼');
                            this.email = '';
                            this.pw = '';
                            this.pwCheck = '';
                        }
                    })
                    .catch(error => {
                        alert(error);
                    });
            } else {
                alert('請確認您輸入的Email與密碼');
            }
        },

        //完成↓
        doForget() {
            const forgetID = document.getElementById('forgetID').value;
            const forgetData = {
                forgetID: forgetID
            }
            axios.post('../php/Forget.php', forgetData)
                .then(response => {
                    if (response.data === 'yes') {
                        this.showDone = true;
                        Email.send({
                            SecureToken: "adf84833-cc46-45a2-850a-092ac2f86858",
                            To: forgetID,
                            From: "kantoasuka1@gmail.com",
                            Subject: 'Kanto帳號重設密碼',
                            Body: "您好，請您重新設定密碼唷!"
                        })
                    } else {
                        alert('系統查無此帳號Email，請您重新輸入');
                    }
                })
                .catch(error => {
                    alert(error);
                });
        },

        checkLoginStatus() {
            axios.post('../php/CheckSession.php')
                .then(response => {
                    if (response.data.isSessionValid) {
                        this.isSessionValid = response.data.isSessionValid;
                        this.user = response.data.user;
                        window.location.href = "member.html";
                    }
                })
                .catch(error => {
                    console.log(error);
                    window.location.href = "index.html";
                });
        }
    },

    watch: {
        email() {
            // 監聽email變化，並在每次變化時檢查其有效性
            this.checkEmailValidity();
        }
    },

    created() {
        setTimeout(() => {
            this.start = true;
        }, 100);


    },
    mounted() {
        this.checkLoginStatus();
    }

}).mount('#app');