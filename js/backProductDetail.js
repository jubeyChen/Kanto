
const app = Vue.createApp({
    data() {
        return {
            editable: false,
            name: '',
            status: 'show',
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
            introImg4: '',
            isShown: false,
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        //傳遞所有資料到php
        updateData() {

            //整理要傳送到後端的資料
            let updateData = {
                //行程標題
                name: this.name,

                //區域
                region: this.region,

                //行程類別
                typeName: this.typeName,

                //價格
                price: this.price,

                //行程日期
                date: this.date,

                //行程簡介
                Content1: this.Content1,
                Content2: this.Content2,
                Content3: this.Content3,

                //封面照片
                desImg1: this.desImg1,
                desImg2: this.desImg2,
                desImg3: this.desImg3,

                //方案詳情照片
                plan_Img1: this.plan_Img1,
                plan_Img2: this.plan_Img2,
                plan_Img3: this.plan_Img3,
                plan_Img4: this.plan_Img4,

                //行程名稱
                plan_title1: this.plan_title1,
                plan_title2: this.plan_title2,
                plan_title3: this.plan_title3,
                plan_title4: this.plan_title4,

                //行程時間
                plan_time1: this.plan_time1,
                plan_time2: this.plan_time2,
                plan_time3: this.plan_time3,
                plan_time4: this.plan_time4,

                //行程地點
                plan_ContentTitle1: this.plan_ContentTitle1,
                plan_ContentTitle2: this.plan_ContentTitle2,
                plan_ContentTitle3: this.plan_ContentTitle3,
                plan_ContentTitle4: this.plan_ContentTitle4,

                //行程簡介
                plan_content1: this.plan_content1,
                plan_content2: this.plan_content2,
                plan_content3: this.plan_content3,
                plan_content4: this.plan_content4,

                //活動介紹
                intro: this.intro,

                //活動介紹照片
                introImg1: this.introImg1,
                introImg2: this.introImg2,
                introImg3: this.introImg3,
                introImg4: this.introImg4,

            }
            console.log(updateData);

            function getParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return "";
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }
            var productId = getParameterByName('id');

            let checkUpdate = confirm('是否進行更新?');
            if (checkUpdate) {
                axios.post('../php/backProductDetailUpdate.php?id=' + productId, updateData)
                    .then((response) => {
                        console.log(response.data);
                        //更新完重新load重新讓$字號進去
                        this.getData();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                return
            }

            this.editable = false;
        },

        // showComment() {
        //     return isShown = true;
        // },
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
            // 输出 id 参数的值
            // console.log(productId);

            //撈資料
            const vm = this;
            axios.get('../php/backProductDetail.php?id=' + productId)
                .then(function (response) {
                    console.log(response.data);

                    //行程名稱
                    vm.name = response.data.product[0].Name;

                    //行程地區
                    vm.region = response.data.product[0].RegionID;
                    //行程價格
                    vm.price = '$' + response.data.product[0].Price;


                    //行程類別
                    vm.typeName = response.data.product[0].ProductTypeID;

                    //行程簡介
                    vm.Content1 = response.data.product[0].Content1;
                    vm.Content2 = response.data.product[0].Content2;
                    vm.Content3 = response.data.product[0].Content3;
                    vm.desImg1 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.product[0].Banner1}`
                    vm.desImg2 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.product[0].Banner2}`
                    vm.desImg3 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.product[0].Banner3}`
                    vm.phoneImg1 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.product[0].Banner1_m}`
                    vm.phoneImg2 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.product[0].Banner2_m}`
                    vm.phoneImg3 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.product[0].Banner3_m}`

                    //方案詳情圖片
                    vm.plan_Img1 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.productSchedule[0].Image}`
                    vm.plan_Img2 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.productSchedule[1].Image}`
                    vm.plan_Img3 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.productSchedule[2].Image}`
                    vm.plan_Img4 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.productSchedule[3].Image}`

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
                    vm.introImg1 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.product[0].Image1}`
                    vm.introImg2 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.product[0].Image2}`
                    vm.introImg3 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.product[0].Image3}`
                    vm.introImg4 = `./image/productPage/${response.data.product[0].IntroductionID}/${response.data.product[0].Image4}`

                })
                .catch(function (error) {
                    console.log(error);
                })
        },


        //封面照片1
        handledesImg1(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.desImg1 = reader.result;
            };
            reader.readAsDataURL(file);
        },
        //封面照片2
        handledesImg2(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.desImg2 = reader.result;
            };
            reader.readAsDataURL(file);
        },
        //封面照片3
        handledesImg3(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.desImg3 = reader.result;
            };
            reader.readAsDataURL(file);
        },

        //方案詳情照片
        handlePlanImg1(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.plan_Img1 = reader.result;
            };
            reader.readAsDataURL(file);
        },

        handlePlanImg2(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.plan_Img2 = reader.result;
            };
            reader.readAsDataURL(file);
        },
        handlePlanImg3(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.plan_Img3 = reader.result;
            };
            reader.readAsDataURL(file);
        },
        handlePlanImg4(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.plan_Img4 = reader.result;
            };
            reader.readAsDataURL(file);
        },



        //活動介紹照片
        handleintroImg1(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.introImg1 = reader.result;
            };
            reader.readAsDataURL(file);
        },

        handleintroImg2(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.introImg2 = reader.result;
            };
            reader.readAsDataURL(file);
        },

        handleintroImg3(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.introImg3 = reader.result;
            };
            reader.readAsDataURL(file);
        },

        handleintroImg4(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.introImg4 = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }
});

app.mount('#app');

//傳遞id的值到php

