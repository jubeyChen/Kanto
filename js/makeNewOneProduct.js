const vm = Vue.createApp({
    data() {
        return {
            previewBanner1: false,
            previewBanner2: false,
            previewBanner3: false,
            previewImage1: false,
            previewImage2: false,
            previewImage3: false,
            previewImage4: false,
            previewPlanImage1: false,
            previewPlanImage2: false,
            previewPlanImage3: false,
            previewPlanImage4: false,
            selectedDate: '',
            selectedDates: [], 
            product: {
                productID: '',
                name: '',
                content: '',
                introductionID: '',
                price: '',
                Banner1: null,
                Banner2: null,
                Banner3: null,
                productType: '',
                region: '',
                image1: null,
                image2: null,
                image3: null,
                image4: null
            },
            productIntroduction: {
                content1: '',
                content2: '',
                content3: ''
            },
            productSchedule1: {
                times: '',
                scheduleTitle: '',
                content: '',
                contentTitle: '',
                image: ''
            },
            productSchedule2: {
                times: '',
                scheduleTitle: '',
                content: '',
                contentTitle: '',
                image: ''
            },
            productSchedule3: {
                times: '',
                scheduleTitle: '',
                content: '',
                contentTitle: '',
                image: ''
            },
            productSchedule4: {
                times: '',
                scheduleTitle: '',
                content: '',
                contentTitle: '',
                image: ''
            }
        }
    },
    methods: {
        back() {
            window.location.href = './backProduct.html';
        },

        saveDate() {
            if (this.selectedDate) {
                this.selectedDates.push(this.selectedDate);
                this.selectedDate = ''; 
            }
        },

        updateRegion(e) {
            this.product.region = e.target.value;
        },

        updateType(e) {
            this.product.productType = e.target.value;
        },

        updateTitle1(e) {
            this.productSchedule1.scheduleTitle = e.target.value;
        },

        updateTitle2(e) {
            this.productSchedule2.scheduleTitle = e.target.value;
        },

        updateTitle3(e) {
            this.productSchedule3.scheduleTitle = e.target.value;
        },

        updateTitle4(e) {
            this.productSchedule4.scheduleTitle = e.target.value;
        },

        uploadBanner1(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.banner1Loaded);
            reader.readAsDataURL(file);
        },

        banner1Loaded(e) {
            this.product.Banner1 = e.target.result;
            this.previewBanner1 = true;
        },

        uploadBanner2(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.banner2Loaded);
            reader.readAsDataURL(file);
        },

        banner2Loaded(e) {
            this.product.Banner2 = e.target.result;
            this.previewBanner2 = true;
        },

        uploadBanner3(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.banner3Loaded);
            reader.readAsDataURL(file);
        },

        banner3Loaded(e) {
            this.product.Banner3 = e.target.result;
            this.previewBanner3 = true;
        },

        uploadImage1(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.image1Loaded);
            reader.readAsDataURL(file);
        },

        image1Loaded(e) {
            this.product.image1 = e.target.result;
            this.previewImage1 = true;
        },

        uploadImage2(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.image2Loaded);
            reader.readAsDataURL(file);
        },

        image2Loaded(e) {
            this.product.image2 = e.target.result;
            this.previewImage2 = true;
        },

        uploadImage3(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.image3Loaded);
            reader.readAsDataURL(file);
        },

        image3Loaded(e) {
            this.product.image3 = e.target.result;
            this.previewImage3 = true;
        },

        uploadImage4(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.image4Loaded);
            reader.readAsDataURL(file);
        },

        image4Loaded(e) {
            this.product.image4 = e.target.result;
            this.previewImage4 = true;
        },

        uploadPlanImage1(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.planImage1Loaded);
            reader.readAsDataURL(file);
        },

        planImage1Loaded(e) {
            this.productSchedule1.image = e.target.result;
            this.previewPlanImage1 = true;
        },

        uploadPlanImage2(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.planImage2Loaded);
            reader.readAsDataURL(file);
        },

        planImage2Loaded(e) {
            this.productSchedule2.image = e.target.result;
            this.previewPlanImage2 = true;
        },

        uploadPlanImage3(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.planImage3Loaded);
            reader.readAsDataURL(file);
        },

        planImage3Loaded(e) {
            this.productSchedule3.image = e.target.result;
            this.previewPlanImage3 = true;
        },

        uploadPlanImage4(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.planImage4Loaded);
            reader.readAsDataURL(file);
        },

        planImage4Loaded(e) {
            this.productSchedule4.image = e.target.result;
            this.previewPlanImage4 = true;
        },

        async saveOfferDate() {
            const dateData = new FormData();
            dateData.append('ProductID', this.product.productID);
            dateData.append('OfferDate', JSON.stringify(this.selectedDates));

            await axios.post('../php/saveOfferDate.php', dateData)
                .then(response => {
                    if (response.data === 'done') {
                        console.log('productSchedule已儲存!');
                        alert('儲存成功!');
                        window.location.href = './backProduct.html';

                    } else {
                        alert('productSchedule儲存失敗');
                    }

                })
                .catch(error => {
                    console.log(error);
                    alert('連線失敗，請稍後重試');
                });
        },

        async savePlan() {
            const planData = new FormData();
            planData.append('Times1', this.productSchedule1.times);
            planData.append('Times2', this.productSchedule2.times);
            planData.append('Times3', this.productSchedule3.times);
            planData.append('Times4', this.productSchedule4.times);
            planData.append('ScheduleTitle1', this.productSchedule1.scheduleTitle);
            planData.append('ScheduleTitle2', this.productSchedule2.scheduleTitle);
            planData.append('ScheduleTitle3', this.productSchedule3.scheduleTitle);
            planData.append('ScheduleTitle4', this.productSchedule4.scheduleTitle);
            planData.append('ContentTitle1', this.productSchedule1.contentTitle);
            planData.append('ContentTitle2', this.productSchedule2.contentTitle);
            planData.append('ContentTitle3', this.productSchedule3.contentTitle);
            planData.append('ContentTitle4', this.productSchedule4.contentTitle);
            planData.append('Content1', this.productSchedule1.content);
            planData.append('Content2', this.productSchedule2.content);
            planData.append('Content3', this.productSchedule3.content);
            planData.append('Content4', this.productSchedule4.content);
            planData.append('Image1', document.getElementById('planImage1').files[0]);
            planData.append('Image2', document.getElementById('planImage2').files[0]);
            planData.append('Image3', document.getElementById('planImage3').files[0]);
            planData.append('Image4', document.getElementById('planImage4').files[0]);
            planData.append('ProductID', this.product.productID);

            await axios.post('../php/saveProductPlan.php', planData)
                .then(response => {
                    if (response.data === 'done') {
                        console.log('productSchedule已儲存!');

                    } else {
                        alert('productSchedule儲存失敗');
                    }

                })
                .catch(error => {
                    console.log(error);
                    alert('連線失敗，請稍後重試');
                });

        },

        async saveImage() {
            const imageData = new FormData();
            imageData.append('Image1', document.getElementById('image1').files[0]);
            imageData.append('Image2', document.getElementById('image2').files[0]);
            imageData.append('Image3', document.getElementById('image3').files[0]);
            imageData.append('Image4', document.getElementById('image4').files[0]);
            imageData.append('ProductID', this.product.productID);

            await axios.post('../php/saveProductImage.php', imageData)
                .then(response => {
                    if (response.data === 'done') {
                        console.log('image已儲存!');
                        
                    } else {
                        alert('Image儲存失敗');
                    }

                })
                .catch(error => {
                    console.log(error);
                    alert('連線失敗，請稍後重試');
                });
        },

        async saveBanner() {
            const bannerData = new FormData();
            bannerData.append('Banner1', document.getElementById('banner1').files[0]);
            bannerData.append('Banner2', document.getElementById('banner2').files[0]);
            bannerData.append('Banner3', document.getElementById('banner3').files[0]);
            bannerData.append('ProductID', this.product.productID);

            await axios.post('../php/saveProductBanner.php', bannerData)
                .then(response => {
                    if (response.data === 'done') {
                        console.log('banner已儲存!');
                        
                    } else {
                        alert('Banner儲存失敗');
                    }
                    
                })
                .catch(error => {
                    console.log(error);
                    alert('連線失敗，請稍後重試');
                });
        },

        async saveProduct() {
            const productData = new FormData();
            productData.append('Name', this.product.name);
            productData.append('Content', this.product.content);
            productData.append('IntroductionID', this.product.introductionID);
            productData.append('Price', this.product.price);
            productData.append('ProductType', this.product.productType);
            productData.append('RegionID', this.product.region);


            await axios.post('../php/makeNewProduct.php', productData)
                .then(response => {
                    if (response.data !== 'fail') {
                        this.product.productID = response.data;
                        console.log('product Table已輸入一筆，下一步儲存banner、image、schedule、offerdate');
                        this.saveBanner();
                        this.saveImage();
                        this.savePlan();
                        this.saveOfferDate();
                    }

                })
                .catch(error => {
                    console.log(error);
                    alert('連線失敗，請稍後重試');
                });
        },

        async doSave() {
            const banner1Input = document.getElementById('banner1');
            const banner2Input = document.getElementById('banner2');
            const banner3Input = document.getElementById('banner3');
            const planImage1Input = document.getElementById('planImage1');
            const planImage2Input = document.getElementById('planImage2');
            const planImage3Input = document.getElementById('planImage3');
            const planImage4Input = document.getElementById('planImage4');
            const image1Input = document.getElementById('image1');
            const image2Input = document.getElementById('image2');
            const image3Input = document.getElementById('image3');
            const image4Input = document.getElementById('image4');

            const introductionData = {
                Content1: this.productIntroduction.content1,
                Content2: this.productIntroduction.content2,
                Content3: this.productIntroduction.content3,
            }

            if (this.product.region == '' || this.product.productType == '') {
                alert('行程地區和行程類別為必填，請您填寫');
            } else if (this.product.name === '') {
                alert('請輸入商品名稱');
            } else if (this.product.price === '') {
                alert('請輸入金額');
            } else if (this.productIntroduction.content1 == '' || this.productIntroduction.content2 == '' || this.productIntroduction.content3 == '') {
                alert('請完整輸入三個行程簡介');
            } else if (this.selectedDates.length === 0) {
                alert('請選擇行程日期');
            } else if (
                banner1Input.files.length === 0 ||
                banner2Input.files.length === 0 ||
                banner3Input.files.length === 0 ||
                planImage1Input.files.length === 0 ||
                planImage2Input.files.length === 0 ||
                planImage3Input.files.length === 0 ||
                planImage4Input.files.length === 0 ||
                image1Input.files.length === 0 ||
                image2Input.files.length === 0 ||
                image3Input.files.length === 0 ||
                image4Input.files.length === 0 ) {
                alert('所有照片欄位皆須上傳圖片');
            } else if (
                this.productSchedule1.times === '' ||
                this.productSchedule2.times === '' ||
                this.productSchedule3.times === '' ||
                this.productSchedule4.times === '' ||
                this.productSchedule1.scheduleTitle === '' ||
                this.productSchedule2.scheduleTitle === '' ||
                this.productSchedule3.scheduleTitle === '' ||
                this.productSchedule4.scheduleTitle === '' ||
                this.productSchedule1.contentTitle === '' ||
                this.productSchedule2.contentTitle === '' ||
                this.productSchedule3.contentTitle === '' ||
                this.productSchedule4.contentTitle === '' ||
                this.productSchedule1.content === '' ||
                this.productSchedule2.content === '' ||
                this.productSchedule3.content === '' ||
                this.productSchedule4.content === '') {
                alert('所有方案詳情欄位皆須填寫');
            } else if (this.product.content === '') {
                alert('請填寫活動介紹');
            }
            else {
                await axios.post('../php/makeNewIntro.php', introductionData)
                    .then(response => {
                        if (response.data !== 'fail') {
                            this.product.introductionID = response.data;
                            this.saveProduct();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert('連線失敗，請稍後重試');
                    });
            }



        }
    }
}).mount('#app');

// import BackStageLogOutBtn from "./component/BackStageLogOutBtn.js";
// app.component('backStageLogOutBtn', BackStageLogOutBtn);
