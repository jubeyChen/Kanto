const app = Vue.createApp({
    data() {
        return {
            products: []
        }
    },

    mounted() {
        const vm = this; // 保留 Vue 實例的引用
        axios.get("../php/backProducts.php")
            .then(function (response) {
                console.log(response.data);
                vm.products = response.data; // 使用 vm.data 來設置資料
                console.log(vm.products);
            });
    },
    methods: {
        checkDetail() {
            location.href = 'backProductDetail.html'
        }

    }

});
app.mount('#app');