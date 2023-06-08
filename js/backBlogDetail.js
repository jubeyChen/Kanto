
const app = Vue.createApp({
    data(){
        return{

            editable: false,

            Blog: [],
            blogBlock: [],
            name: '',
            status: 'show',

            //專欄簡介
            intro: '',

            //行程地區
            region: '',


            //電腦封面照
            desImg1: '',
            desImg2: '',


            //方案詳情
            plan_Img1: '',
            plan_TimeTitle1: '',
            plan_times1: '',
            plan_content1: '',

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

        }
    },
    mounted(){
        this.getData();           
    },

    methods: {

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
            var blogId = getParameterByName('id');
            // 输出 id 参数的值
            console.log(blogId);

            //撈資料
            const vm = this;

            axios.get('../php/backblogDetail.php?id=' + blogId)
                .then(function (response) {
                    console.log(response.data);
                    console.log("更新成功");


                    //行程名稱
                    vm.name = response.data.Blog[0].Title;

                    //行程地區
                    vm.region = response.data.Blog[0].RegionID;

                    
                    //專欄簡介
                    vm.intro = response.data.Blog[0].Content;

                    //活動介紹的圖片
                    vm.desImg1 = `./image/blog/${response.data.Blog[0][0]}/${response.data.Blog[0].BannerPC}`
                    vm.desImg2 = `./image/Blog/${response.data.Blog[0][0]}/${response.data.Blog[0].Image1}`



                    // //方案詳情圖片
                    vm.plan_Img1 = `./image/blog/${response.data.blogBlock[0][1]}/${response.data.blogBlock[0].Image}`
                    vm.plan_Img2 = `./image/blog/${response.data.blogBlock[0][1]}/${response.data.blogBlock[1].Image}`
                    vm.plan_Img3 = `./image/blog/${response.data.blogBlock[0][1]}/${response.data.blogBlock[2].Image}`
                    vm.plan_Img4 = `./image/blog/${response.data.blogBlock[0][1]}/${response.data.blogBlock[3].Image}`

                    //方案詳情-行程名稱
                    vm.plan_TimeTitle1 = response.data.blogBlock[0].TimeTitle;
                    vm.plan_Times1 = response.data.blogBlock[0].Times;
                    vm.plan_Content1 = response.data.blogBlock[0].Content;

                    vm.plan_TimeTitle2 = response.data.blogBlock[1].TimeTitle;
                    vm.plan_Times2 = response.data.blogBlock[1].Times;
                    vm.plan_Content2 = response.data.blogBlock[1].Content;

                    vm.plan_TimeTitle3 = response.data.blogBlock[2].TimeTitle;
                    vm.plan_Times3 = response.data.blogBlock[2].Times;
                    vm.plan_Content3 = response.data.blogBlock[2].Content;

                    vm.plan_TimeTitle4 = response.data.blogBlock[3].TimeTitle;
                    vm.plan_Times4 = response.data.blogBlock[3].Times;
                    vm.plan_Content4 = response.data.blogBlock[3].Content;

                
            })

        },


        saveDate() {
            if (this.editable) {
                if (this.selectedDate == "") {
                    alert('請輸入日期')
                    return;
                }
                else if (this.selectedDate == this.lastSavedDate) {
                    alert('日期重複，請輸入其他日期')
                    return;
                } else {
                    this.lastSavedDate = this.selectedDate;
                    this.selectedDates.push(this.selectedDate);
                }
            }
        },
        //傳遞所有資料到php
        async updateData() {


            //整理要傳送到後端的資料 文字內容更新
            let updateData = {


                //行程標題
                name: this.name,

                //區域
                region: this.region,
              
                //行程名稱
                plan_TimeTitle1: this.plan_TimeTitle1,
                plan_TimeTitle2: this.plan_TimeTitle2,
                plan_TimeTitle3: this.plan_TimeTitle3,
                plan_TimeTitle4: this.plan_TimeTitle4,

                //行程時間
                plan_Times1: this.plan_Times1,
                plan_Times2: this.plan_Times2,
                plan_Times3: this.plan_Times3,
                plan_Times4: this.plan_Times4,

                //行程簡介
                plan_Content1: this.plan_Content1,
                plan_Content2: this.plan_Content2,
                plan_Content3: this.plan_Content3,
                plan_Content4: this.plan_Content4,

                //專欄簡介
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
            var blogId = getParameterByName('id');


            //檢查確認是否更新 確認後再將資料丟入後端
            let checkUpdate = confirm('是否進行更新?');
            if (checkUpdate) {
                axios.post('../php/backBlogDetailUpdate.php?id=' + blogId, updateData)
                    .then((response) => {
                        console.log(response.data);
                        this.selectedDates = [];
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
            alert('更新成功')
            this.editable = false;

        },



        backPage(){
            history.back();
        },

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



    //方案詳情圖片
    updatePlanImg1(e) {
        const file = e.target.files.item(0);
        const reader = new FileReader();
        console.log('aaaaa')
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
        var blogId = getParameterByName('id');


        const imageData = new FormData();
        imageData.append('desImg1', document.getElementById('desImg1').files[0]);
        imageData.append('desImg2', document.getElementById('desImg2').files[0]);



        imageData.append('PlanImg1', document.getElementById('PlanImg1').files[0]);
        imageData.append('PlanImg2', document.getElementById('PlanImg2').files[0]);
        imageData.append('PlanImg3', document.getElementById('PlanImg3').files[0]);
        imageData.append('PlanImg4', document.getElementById('PlanImg4').files[0]);


        await axios.post('../php/detailSaveImg.php?id=' + blogId, imageData)
            .then(response => {
                console.log(response.data);
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
        var blogId = getParameterByName('id');


        const imageData2 = new FormData();
        imageData2.append('plan_Img1', document.getElementById('plan_Img1').files[0]);
        imageData2.append('plan_Img2', document.getElementById('plan_Img2').files[0]);
        imageData2.append('plan_Img3', document.getElementById('plan_Img3').files[0]);
        imageData2.append('plan_Img4', document.getElementById('plan_Img4').files[0]);

        await axios.post('../php/detailSavePlanImg.php?id=' + blogId, imageData2)
            .then(response => {
                console.log('更新成功');
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                alert('連線失敗，請稍後重試');
            });
    },

    

});

app.mount('#app');
