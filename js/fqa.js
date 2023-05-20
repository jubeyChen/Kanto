import QAComponent from "./component/QAComponent.js";

const app = Vue.createApp({
    data(){
        return{
            current_tab: 'order',
            current_tab_name: '訂單相關',
            tabs: [
                {
                    id: "order",
                    name: "訂單相關"
                },
                {
                    id: "account",
                    name: "帳號相關"
                },
                {
                    id: "payment",
                    name: "付款相關"
                }
            ]
        }
    }, 
    computed: {
    },
    methods: {
        accordion(e){
            e.target.nextElementSibling.classList.toggle('-open')
            e.target.firstElementChild.classList.toggle('-rotate')
        },
        clearOpen(e){
            // console.log(e.target.closest('#app').querySelector('.accordion-content'));
            e.target.closest('#app').querySelectorAll('.accordion-content').forEach(function(item){
                //console.log(item.previousElementSibling.querySelector('.v'));
                item.classList.remove('-open');
                item.previousElementSibling.querySelector('.v').classList.remove('-rotate');
            });
        },
        changeTabName(){
            // console.log('aaa');
            if(this.current_tab == 'order'){
                this.current_tab_name = '訂單相關';
            }else if(this.current_tab == 'account'){
                this.current_tab_name = '帳號相關';
            }else{
                this.current_tab_name = '付款相關';
            }
        },
        changeValue(e){
            console.log(e);
            this.current_tab = e.target.value;
        }

    }

});

app.component('qaComponent', QAComponent);
app.mount('#app');

