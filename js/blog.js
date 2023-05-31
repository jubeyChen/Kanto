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
            mainData: '',
            data: '',

            //按鈕加上active
            Region: ['全部', '東京', '神奈川', '埼玉', '茨城', '千葉', '群馬', '栃木'],
            activeIndex: null
        }
    },
    created() {
        this.getData();
        this.handleClick(0)
    },
    methods: {
        getData() {
            let vm = this;
            axios.get('../php/blog.php')
                .then(function (response) {
                    console.log(response.data);


                    //活動
                    vm.data = response.data;

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
        }
    }
}

Vue.createApp(app).mount('.all_blog')



