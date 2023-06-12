
const app = Vue.createApp({
    data(){
        return{
            orders: [],
            slicedOrders: [],
            sortedOrders: [],
            startNum: 0,
            currentNum: 10,
            searchType: '',
            searchText: ''
        }
    },
    methods: {
        checkDetail(e){
            let id = e.target.getAttribute('data-id')
            location.href='backOrderDetail.html?id=' + id
        },
        doSlice(){
            this.slicedOrders = this.sortedOrders.slice(this.startNum, this.startNum + 10);
        },
        checkCurrentNum(){
            if(this.sortedOrders.length < 10 || this.startNum + 10 > this.sortedOrders.length){
                this.currentNum = this.sortedOrders.length;

            }            
            else if(this.sortedOrders.length > 10 && this.startNum + 10 < this.sortedOrders.length){
                this.currentNum = this.startNum + 10;

            }
        },
        addStartNum(){
            if(this.startNum + 10 < this.sortedOrders.length){
                this.startNum += 10;
                this.doSlice();
                this.checkCurrentNum();

            }
        },
        reduceStartNum(){
            if(this.startNum >= 10){
                this.startNum -= 10;
                this.doSlice();
                this.checkCurrentNum();

            }
        },
        doSearch(){
            this.startNum = 0;
            this.currentNum = 10;

            this.sortedOrders = this.orders.filter(e => e[this.searchType] && e[this.searchType].toString().includes(this.searchText));
            // console.log(this.orders[0][this.searchType])
            this.doSlice();
            this.checkCurrentNum();
        },
        reverseArray(){
            this.sortedOrders = this.sortedOrders.reverse();
            this.doSlice();
            this.checkCurrentNum();
        }

    },
    mounted(){
        axios.get('../php/backOrder.php')
            .then(response => {
                //console.log(response.data);
                this.orders = response.data;

                this.sortedOrders = this.orders;
                this.doSlice();
                this.checkCurrentNum();
            })
            .catch(error => {
                console.log(error);
            });

    }
});

import BackStageLogOutBtn from "./component/BackStageLogOutBtn.js";
app.component('backStageLogOutBtn', BackStageLogOutBtn);
app.mount('#app');

