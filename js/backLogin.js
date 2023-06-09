Vue.createApp({
    data() {
        return {
            account: '',
            password: '',
            isSessionValid: false
        }
    },
    methods: {
        doLogin() {
            const userData = {
                account: document.getElementById('account').value,
                password: document.getElementById('password').value,
            };

            axios.post('../php/BackStageLogin.php', userData)
                .then(response => {
                    if (response.data === 'success') {
                        alert('登入成功');
                        window.location.href = 'backMember.html';
                    } else {
                        alert('帳號或密碼有誤，請重新輸入');
                        this.account = '';
                        this.password = '';
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        checkLoginStatus() {
            axios.post('../php/CheckBackSession.php')
                .then(response => {
                    if (response.data.isSessionValid) {
                        this.isSessionValid = response.data.isSessionValid;
                        window.location.href = "backMember.html";
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },

    mounted(){
        this.checkLoginStatus();
    }

}).mount('#app');