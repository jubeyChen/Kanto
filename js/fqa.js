import QAComponent from "./component/QAComponent.js";

const app = Vue.createApp({
    data() {
        return {
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
            ],
            orderQA: [],
            accountQA: [],
            paymentQA: [],
        }
    },
    computed: {
    },
    methods: {
        accordion(e) {
            e.target.closest('.accordion-item').querySelector('.v').classList.toggle('-rotate');
            e.target.closest('.accordion-item').querySelector('.accordion-content').classList.toggle('-open');
        },
        clearOpen(e) {
            e.target.closest('#app').querySelectorAll('.accordion-content').forEach(function (item) {
                item.classList.remove('-open');
                item.previousElementSibling.querySelector('.v').classList.remove('-rotate');
            });
        },
        changeTabName() {
            if (this.current_tab == 'order') {
                this.current_tab_name = '訂單相關';
            } else if (this.current_tab == 'account') {
                this.current_tab_name = '帳號相關';
            } else {
                this.current_tab_name = '付款相關';
            }
        },
        changeValue(e) {
            // console.log(e);
            this.current_tab = e.target.value;
        }

    },
    async mounted() {
        let a = await globalCheck.PageCheckSession();// 測試連線
        // console.log(a);

        axios.get('../php/fqa.php')
        .then(response => {
            // console.log(response.data[0]);
            for(let i = 0; i < response.data.length; i++){
                if(response.data[i].Category == 'order'){
                    this.orderQA.push({q: response.data[i][1], a: response.data[i][5]})
                }
                if(response.data[i].Category == 'account'){
                    this.accountQA.push({q: response.data[i][1], a: response.data[i][5]})
                }
                if(response.data[i].Category == 'payment'){
                    this.paymentQA.push({q: response.data[i][1], a: response.data[i][5]})
                }

            }
            // console.log(this.orderQA, this.accountQA, this.paymentQA)
        })
        .catch(error => {
            console.log(error);
        });
    }

});

app.component('qaComponent', QAComponent);
app.mount('#app');

