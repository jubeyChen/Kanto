const app = Vue.createApp({
    data(){
        return{
            id: '',
            fullname: '',
            timestamp: '',
            total: 0,
            orderDetail: []
        }
    },
    mounted(){
        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return "";
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        
        // 使用 getParameterByName 函式來獲取 URL 中的 id 參數值
        var orderId = getParameterByName('id');
        
        // 現在你可以使用 productId 變數來進一步處理和使用該值
        // console.log(orderId); // 印出 id 參數的值
        
        axios.get('../php/backOrderDetail.php?id=' + orderId)
            .then(response => {
                console.log(response);
                for(let i = 0; i < response.data.length; i++){
                    this.orderDetail.push(response.data[i]);
                    this.total += parseInt(response.data[i].total);
                }

                this.id = response.data[0].id;
                this.fullname = response.data[0].fullname;
                this.timestamp = response.data[0].timestamp;

            })
            .catch(error => {
                console.log(error);
            });

    },
    methods: {
        backPage(){
            history.back();
        }
    }

});

app.mount('#app');
