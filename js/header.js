let globalCheck = Vue.createApp({
    data() {
        return {
            isSessionValid: false,
            ham: '',
            cross: '',
            menulist: ''
        }
    },
    created() {
        this.checkSession();
    },
    methods: {
        checkSession() {
            axios.post('../php/CheckSession.php')
                .then(response => {
                    if (response.data.isSessionValid) {
                        this.isSessionValid = response.data.isSessionValid;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async PageCheckSession() {
            let r = await fetch("../php/CheckSession.php", {
                method: "POST"
            });
            let r2 = await r.json();

            return r2;
        },

        openHam() {
            this.ham = document.getElementById("ham");
            this.cross = document.getElementById("cross");
            this.menulist = document.querySelector(".nav-bar");
            this.menulist.classList.toggle("-openlist");
            this.ham.classList.add("-close");
            this.cross.classList.add("-open");
        },

        closeHam() {
            this.menulist.classList.toggle("-openlist");
            this.ham.classList.remove("-close");
            this.cross.classList.remove("-open");
        }
    }
}).mount('#navStatus');