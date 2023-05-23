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
        ,
        sendEmail() {
            let subject = document.getElementById("forgetID").value;
            console.log('submit')
            Email.send({
                SecureToken: "d8f8fcac-762b-4858-956c-cc3abc40e0cc",
                To: subject,
                From: "kantoasuka1@gmail.com",
                Subject: 'Kanto帳號重設密碼',
                Body: "您好，請您重新設定密碼唷!"
            })
        },
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
                    } else {
                        alert('帳號或密碼有誤，請重新輸入');
                        this.email = '';
                        this.pw = '';
                    }
                })
                .catch(error => {
                    alert(error);
                });
        },
        doRegister() {
            const registerData = {
                registerID: document.getElementById('registerID').value,
                registerPW: document.getElementById('registerPW').value,
            };

            axios.post('../php/Register.php', registerData)
                .then(response => {
                    if (response.data === '註冊成功') {
                        alert('註冊成功! 請您登入');
                        window.location.href = '../dist/loginRegister.html';
                    } else {
                        alert('註冊會員失敗');
                        this.email = '';
                        this.pw = '';
                        this.pwCheck = ''; 
                    }
                })
                .catch(error => {
                    alert(error);
                });
        },
        doForget() {
            const forgetID = document.getElementById('forgetID').value;
            const forgetData = {
                forgetID: forgetID
            }
            axios.post('../php/Forget.php', forgetData)
                .then(response => {
                    if (response.data === 'yes') {
                        alert('有這個帳號');
                        console.log(forgetID);
                        this.showDone = true;
                        Email.send({
                            SecureToken: "d8f8fcac-762b-4858-956c-cc3abc40e0cc",
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

}).mount('#app');