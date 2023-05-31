// const blog_btn = document.querySelectorAll('.blog_btn');

// for (let i = 0; i < blog_btn.length; i++) {
//     blog_btn[i].addEventListener("click", function (e) {
//         for (let i = 0; i < blog_btn.length; i++) {
//             blog_btn[i].classList.remove("-active");
//         }
//         blog_btn[i].classList.add("-active");
//     })
// }









//主要活動
const app = {
    data() {
        return {
            BannerPC: '',
            //活動資料
            data: [],

            //按鈕加上active
            Region: ['全部', '東京', '神奈川', '埼玉', '茨城', '千葉', '群馬', '栃木'],
            activeIndex: null,

            //分頁寫法
            currentPage: 1, //當前頁數
            itemsPerPage: 6 //每頁顯示的資料量
        }
    },
    created() {
        this.getData();
        this.handleClick(0)
    },
    methods: {
        //撈取資料
        getData() {
            let vm = this;
            axios.get('../php/blog.php')
                .then(function (response) {
                    console.log(response.data);


                    //活動
                    vm.data = response.data;

                    console.log(vm.data);
                    // 篩選資料放這裡
                    //需要點擊地區篩選按鈕之後，activeIndex才會有值，再往下看handleClick(index)的函式
                    if (vm.activeIndex !== null) {
                        //這裡數字0 代表是點到全部
                        if (vm.activeIndex == 0) {
                            vm.data = response.data;
                            return;
                        }
                        //不是0的話才進行篩選
                        vm.data = vm.data.filter((item) => {
                            return item.RegionName == vm.Region[vm.activeIndex];
                        });

                    }

                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        //按鈕active
        handleClick(index) {
            //這裡的activeIndex 是數字
            this.activeIndex = index;
            console.log(this.Region[index]);
            this.getData();
            this.currentPage = 1; // 重置當前頁數
        },
        goToPage(page) {
            this.currentPage = page;
        }
    },
    computed: {
        //html迴圈的部分 原先是跑data現在要跑這個函式
        paginatedActivities() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;

            //data.slice() 是 JavaScript 中陣列的方法，用於從原陣列中取出指定範圍的元素，並返回一個新的陣列。
            return this.data.slice(startIndex, endIndex);
        },
        //計算會有幾個分頁按鈕會被渲染出來
        totalPages() {
            return Math.ceil(this.data.length / this.itemsPerPage);
        }
    }
}

Vue.createApp(app).mount('.all_blog')



