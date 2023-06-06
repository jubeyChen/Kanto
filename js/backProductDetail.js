
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
        async updateData() {


            //整理要傳送到後端的資料 文字內容更新
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


            }
            console.log(updateData);

            //帶入id
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


            //檢查確認是否更新 確認後再將資料丟入後端
            let checkUpdate = confirm('是否進行更新?');
            if (checkUpdate) {
                axios.post('../php/backProductDetailUpdate.php?id=' + productId, updateData)
                    .then((response) => {
                        console.log(response.data);
                        return this.saveImage();
                    })
                    .then(() => {
                        return this.savePlanImg();
                    })
                    .then(() => {
                        window.onload = () => {
                            this.getData(); // 在所有圖片載入完成後重新渲染畫面
                        };
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                return;
            }

            this.editable = false;
        },

        backPage() {
            history.back();
        },


        //撈取資料
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
                    console.log("更新成功");

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
                    vm.desImg1 = `./image/productPage/${response.data.product[0][0]}/${response.data.product[0].Banner1}`
                    vm.desImg2 = `./image/productPage/${response.data.product[0][0]}/${response.data.product[0].Banner2}`
                    vm.desImg3 = `./image/productPage/${response.data.product[0][0]}/${response.data.product[0].Banner3}`


                    //方案詳情圖片
                    vm.plan_Img1 = `./image/productPage/${response.data.product[0][0]}/${response.data.productSchedule[0].Image}`
                    vm.plan_Img2 = `./image/productPage/${response.data.product[0][0]}/${response.data.productSchedule[1].Image}`
                    vm.plan_Img3 = `./image/productPage/${response.data.product[0][0]}/${response.data.productSchedule[2].Image}`
                    vm.plan_Img4 = `./image/productPage/${response.data.product[0][0]}/${response.data.productSchedule[3].Image}`

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
                    vm.introImg1 = `./image/productPage/${response.data.product[0][0]}/${response.data.product[0].Image1}`
                    vm.introImg2 = `./image/productPage/${response.data.product[0][0]}/${response.data.product[0].Image2}`
                    vm.introImg3 = `./image/productPage/${response.data.product[0][0]}/${response.data.product[0].Image3}`
                    vm.introImg4 = `./image/productPage/${response.data.product[0][0]}/${response.data.product[0].Image4}`

                })
                .catch(function (error) {
                    console.log(error);
                })
        },

        //更新封面照片
        updatedesImg1(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.desImg1 = e.target.result;
            });
            reader.readAsDataURL(file);
        },


        updatedesImg2(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.desImg2 = e.target.result;
            });
            reader.readAsDataURL(file);
        },

        updatedesImg3(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.desImg3 = e.target.result;
            });
            reader.readAsDataURL(file);
        },



        //方案詳情圖片
        updatePlanImg1(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.plan_Img1 = e.target.result;
            });
            reader.readAsDataURL(file);
        },

        updatePlanImg2(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.plan_Img2 = e.target.result;
            });
            reader.readAsDataURL(file);
        },

        updatePlanImg3(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.plan_Img3 = e.target.result;
            });
            reader.readAsDataURL(file);
        },

        updatePlanImg4(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.plan_Img4 = e.target.result;
            });
            reader.readAsDataURL(file);
        },

        //更新活動介紹照片
        updateIntroImg1(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.introImg1 = e.target.result;
            });
            reader.readAsDataURL(file);
        },


        updateIntroImg2(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.introImg2 = e.target.result;
            });
            reader.readAsDataURL(file);
        },

        updateIntroImg3(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.introImg3 = e.target.result;
            });
            reader.readAsDataURL(file);
        },

        updateIntroImg4(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.introImg4 = e.target.result;
            });
            reader.readAsDataURL(file);
        },

        async saveImage() {
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


            const imageData = new FormData();
            imageData.append('desImg1', document.getElementById('desImg1').files[0]);
            imageData.append('desImg2', document.getElementById('desImg2').files[0]);
            imageData.append('desImg3', document.getElementById('desImg3').files[0]);



            imageData.append('introImg1', document.getElementById('introImg1').files[0]);
            imageData.append('introImg2', document.getElementById('introImg2').files[0]);
            imageData.append('introImg3', document.getElementById('introImg3').files[0]);
            imageData.append('introImg4', document.getElementById('introImg4').files[0]);


            await axios.post('../php/detailSaveImg.php?id=' + productId, imageData)
                .then(response => {
                    // console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                    alert('連線失敗，請稍後重試');
                });
        },

        async savePlanImg() {
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


            const imageData2 = new FormData();
            imageData2.append('plan_Img1', document.getElementById('plan_Img1').files[0]);
            imageData2.append('plan_Img2', document.getElementById('plan_Img2').files[0]);
            imageData2.append('plan_Img3', document.getElementById('plan_Img3').files[0]);
            imageData2.append('plan_Img4', document.getElementById('plan_Img4').files[0]);

            await axios.post('../php/detailSavePlanImg.php?id=' + productId, imageData2)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                    alert('連線失敗，請稍後重試');
                });
        }

    }
});

app.mount('#app');

//傳遞id的值到php

