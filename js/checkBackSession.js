let backSession = Vue.createApp({
    data() {
        return {
            isSessionValid: false
        }
    },

    methods: {
        async checkLoginStatus() {
            await axios.post('../php/CheckBackSession.php')
                .then(response => {
                    if (response.data.isSessionValid) {
                        this.isSessionValid = response.data.isSessionValid;
                        // window.location.href = "backMember.html";
                    }else{
                        window.location.href = "backLogin.html";
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        
    },

    async created(){
        await this.checkLoginStatus();
    }

});

backSession.mount('#logo_block');
