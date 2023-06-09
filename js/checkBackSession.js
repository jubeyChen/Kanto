const backSession = Vue.createApp({
    data() {
        return {}
    },
    methods: {
        checkLoginStatus() {
            axios.post('../php/CheckBackSession.php')
                .then(response => {
                    if (response.data.isSessionValid) {
                        window.location.href = "backMember.html";
                    }else{
                        window.location.href = "backLogin.html";
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

});

backSession.mount('#logo_block');
