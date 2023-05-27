const ham = document.getElementById("ham");
const cross = document.getElementById("cross");
const menulist = document.querySelector(".nav-bar");

ham.addEventListener("click", () => {
    menulist.classList.toggle("-openlist");
    ham.classList.add("-close");
    cross.classList.add("-open");
});
cross.addEventListener("click", () => {
    menulist.classList.toggle("-openlist");
    ham.classList.remove("-close");
    cross.classList.remove("-open");
});

let globalCheck = Vue.createApp({
    data() {
        return {
            isSessionValid: false,
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

            return r2.isSessionValid;
        }
    }
}).mount('#navStatus');




// 選單收合=============
// $(document).ready(function(){
//     $("#ham").click(function(){
//             $(".nav-bar").toggleClass("-openlist");
//             $("#ham").toggleClass("-close");
//             $("#cross").toggleClass("-open");
//     });
//     $("#cross").click(function(){
//             $(".nav-bar").toggleClass("-openlist");
//             $("#ham").removeClass("-close");
//             $("#cross").removeClass("-open");
//     })
//});