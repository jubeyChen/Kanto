
const app = Vue.createApp({
    data() {
        return {
            editable: false,
            name: '',
            status: 'show',
            region: 'kanagawa',
            price: '',
            date: '2023/6/21',

            //行程簡介
            Content1: '',
            Content2: '',
            Content3: '',

            //行程地區
            region: '',

            //行程類別
            typeName: '',

            //電腦封面照
            desImg1: '',
            desImg2: '',
            desImg3: '',

            //手機封面照
            phoneImg1: '',
            phoneImg2: '',
            phoneImg3: '',

            //方案詳情
            plan_Img1: '',
            plan_title1: '',
            plan_time1: '',
            plan_content1: '',
            plan_ContentTitle1: '',



            plan_Img2: '',
            plan_title2: '',
            plan_time2: '',
            plan_content2: '',
            plan_ContentTitle2: '',

            plan_Img3: '',
            plan_title3: '',
            plan_time3: '',
            plan_content3: '',
            plan_ContentTitle3: '',

            plan_Img4: '',
            plan_title4: '',
            plan_time4: '',
            plan_content4: '',
            plan_ContentTitle4: '',
            //活動介紹
            intro: '',

            //活動介紹圖片
            introImg1: '',
            introImg2: '',
            introImg3: '',
            comment: [
                { name: 'Jeff', time: '2021-1-19 14:23', star: 5, content: '建議到日本自由行的人可以選擇這樣的行程，可以省很多時間，這次的導遊Zoey很親切，用中、英文導覽, 當天很幸運，因爲天氣很好，可以看到富士山的全貌，還有抹茶體驗哦，很值得推薦的行程' },
                { name: '阿花', time: '2021-1-19 14:23', star: 5, content: 'Jacky 導遊人特別和善親切，幫我們團員拍照又講解重點，淺顯易懂，還會把集合時間跟聯絡方式一上車就讓我們知道， 相當安心。很幸運天氣很好，整天看得到富士山, 當天很幸運，因爲天氣很好，可以看到富士山的全貌，還有抹茶體驗哦，很值得推薦的行程' },
                { name: '小明', time: '2021-1-19 14:23', star: 5, content: '這次旅程非常幸運，全日都可以看到富士山，導遊小姐也很用心，會提供一些tips，令我們玩得更盡興。 相當安心。很幸運天氣很好，整天看得到富士山, 當天很幸運，因爲天氣很好，可以看到富士山的全貌，還有抹茶體驗哦，很值得推薦的行程' },
            ],
            review: [],
            isShown: false,
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        switchBtn(e) {
            $(e.target).closest('tr').find('.switch-track').toggleClass('-off');
        },
        showComment() {
            console.log('aaa');
            return isShown = true;
        },
        backPage() {
            history.back();
        },

        getData() {
            function getParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return "";
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }

            // 使用 getParameterByName 函数来获取 URL 中的 id 参数值
            var productId = getParameterByName('id');
            console.log(productId); // 输出 id 参数的值

            //撈資料
            const vm = this;
            axios.get('../php/backProductDetail.php?id=' + productId)
                .then(function (response) {
                    console.log(response.data);

                    //行程名稱
                    vm.name = response.data.product[0].Name;

                    //行程地區
                    vm.region = response.data.product[0].RegionName
                    //行程價格
                    vm.price = '$' + response.data.product[0].Price;


                    //行程類別
                    vm.typeName = response.data.product[0].TypeName;
                    //行程簡介
                    vm.Content1 = response.data.product[0].Content1;
                    vm.Content2 = response.data.product[0].Content2;
                    vm.Content3 = response.data.product[0].Content3;
                    vm.desImg1 = `./image/productPage/${response.data.product[0].ID}/${response.data.product[0].Banner1}`
                    vm.desImg2 = `./image/productPage/${response.data.product[0].ID}/${response.data.product[0].Banner2}`
                    vm.desImg3 = `./image/productPage/${response.data.product[0].ID}/${response.data.product[0].Banner3}`
                    vm.phoneImg1 = `./image/productPage/${response.data.product[0].ID}/${response.data.product[0].Banner1_m}`
                    vm.phoneImg2 = `./image/productPage/${response.data.product[0].ID}/${response.data.product[0].Banner2_m}`
                    vm.phoneImg3 = `./image/productPage/${response.data.product[0].ID}/${response.data.product[0].Banner3_m}`

                    //方案詳情圖片
                    vm.plan_Img1 = `./image/productPage/${response.data.product[0].ID}/${response.data.productSchedule[0].Image}`
                    vm.plan_Img2 = `./image/productPage/${response.data.product[0].ID}/${response.data.productSchedule[1].Image}`
                    vm.plan_Img3 = `./image/productPage/${response.data.product[0].ID}/${response.data.productSchedule[2].Image}`
                    vm.plan_Img4 = `./image/productPage/${response.data.product[0].ID}/${response.data.productSchedule[3].Image}`

                    //方案詳情-行程名稱
                    vm.plan_title1 = response.data.productSchedule[0].ScheduleTitle;
                    vm.plan_time1 = response.data.productSchedule[0].Times;
                    vm.plan_content1 = response.data.productSchedule[0].Content;
                    vm.plan_ContentTitle1 = response.data.productSchedule[0].ContentTitle

                    vm.plan_title2 = response.data.productSchedule[1].ScheduleTitle;
                    vm.plan_time2 = response.data.productSchedule[1].Times;
                    vm.plan_content2 = response.data.productSchedule[1].Content;
                    vm.plan_ContentTitle2 = response.data.productSchedule[1].ContentTitle

                    vm.plan_title3 = response.data.productSchedule[2].ScheduleTitle;
                    vm.plan_time3 = response.data.productSchedule[2].Times;
                    vm.plan_content3 = response.data.productSchedule[2].Content
                    vm.plan_ContentTitle3 = response.data.productSchedule[2].ContentTitle


                    vm.plan_title4 = response.data.productSchedule[3].ScheduleTitle;
                    vm.plan_time4 = response.data.productSchedule[3].Times;
                    vm.plan_content4 = response.data.productSchedule[3].Content
                    vm.plan_ContentTitle4 = response.data.productSchedule[3].ContentTitle

                    //活動介紹
                    vm.intro = response.data.product[0].Content

                    //活動介紹圖片
                    vm.introImg1 = `./image/productPage/${response.data.product[0].ID}/${response.data.product[0].Image1}`
                    vm.introImg2 = `./image/productPage/${response.data.product[0].ID}/${response.data.product[0].Image2}`
                    vm.introImg3 = `./image/productPage/${response.data.product[0].ID}/${response.data.product[0].Image3}`
                    vm.introImg4 = `./image/productPage/${response.data.product[0].ID}/${response.data.product[0].Image4}`

                    //評鑑
                    vm.review = response.data.review
                    console.log(vm.review);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
});

app.mount('#app');

//傳遞id的值到php

