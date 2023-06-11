
const app = Vue.createApp({
    data() {
        return {
            isSessionValid: '',
        };
    },
    methods: {
    },
    async mounted(){
        let a  = await globalCheck.PageCheckSession();
        // console.log(a);
        this.isSessionValid = a.isSessionValid;
        // this.user= a.user;
        // console. log (this.isSessionValid);

        if (this.isSessionValid === false) {
            // alert('請先登入會員，才可進入購物車');
            window.location.href = "loginRegister.html";
        }          
    },
});

app.mount('#app');
