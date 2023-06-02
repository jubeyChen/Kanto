const app = Vue.createApp({
    data() {
        return {
            products: [],
            sliceProducts: [],
            selectValue: '',
            textValue: '',
            startNum: 0,
            currentNum: 10
        }
    },

    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            const vm = this; // 保留 Vue 实例的引用
            return new Promise((resolve, reject) => {
                axios
                    .get("../php/backProducts.php")
                    .then(function (response) {
                        console.log(response.data);
                        vm.products = response.data; // 使用 vm.data 来设置数据

                        // 先让 sliceProducts 进行初始化筛选
                        vm.sliceData();
                        resolve(); // 请求成功后解析 Promise
                    })
                    .catch(function (error) {
                        // 请求发生错误时拒绝 Promise
                        reject(error);
                    });
            });
        },
        searchBtn() {
            this.getData().then(() => {
                // 執行後續處理邏輯
                if (this.textValue == "") {
                    alert('請輸入資料')
                    return;
                }
                else if (this.selectValue == "行程編號") {
                    this.products = this.products.filter((item) => {
                        return item.ID == this.textValue;
                    })
                } else if (this.selectValue == "行程名稱") {
                    this.products = this.products.filter((item) => {
                        //includes模糊篩選，只要有部分符合，就篩選。
                        return item.Name.includes(this.textValue);
                    })
                }
                this.startNum = 0;
                this.sliceData();
                this.checkcurrentNum();
            });

        },
        checkDetail() {
            location.href = `backProductDetail.html?id=${this.products[0].ID}`
        },

        //檢查顯示那些資料
        sliceData() {
            if (this.startNum > this.products.length) {
                return
            } else {
                //tbody會帶這筆篩選過的資料
                this.sliceProducts = this.products.slice(this.startNum, this.startNum + 10)
            }

        },

        //檢查顯示當前頁
        checkcurrentNum() {
            if (this.startNum + 10 > this.products.length) {
                this.currentNum = this.products.length
            }
            else if (this.startNum + 10 < this.products.length) {
                this.currentNum = this.startNum + 10;
            }
        },

        //下一頁
        addPage() {
            if (this.startNum + 10 < this.products.length) {
                this.startNum += 10;
            }
            this.sliceData()
            this.checkcurrentNum()

        },

        //上一頁
        reducePage() {
            if (this.startNum > 0) {
                this.startNum -= 10;
            }
            this.sliceData()
            this.checkcurrentNum()
        }
    },


});
app.mount('#app');