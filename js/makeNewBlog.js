const app = Vue.createApp({
    data() {
        return {
            
            

            // status: 'show',
            // region: 'kanagawa',
            
            
            // coverImg: ['image/blogPage/banner.png', 'image/blogPage/title.png'],
            // plan: [
            //     { time: '', title: '', description: '', img: '' },
            //     { time: '10:20', title: '富士山五合目', description: `五合目位於海拔 2305 公尺的山腰被周圍的原始森林環抱，朵朵白雲就在腳下漂浮，近距離觀看富士山！`, img: '' },
            //     { time: '12:30', title: '河口湖音樂盒之森美術館', description: '遠方的富士山的夢幻美景，與大型音樂盒演奏著經典的古典樂都很有看點。', img: 'image/blogPage/event3.png' },
            //     { time: '14:30', title: '忍野八海', description: '由八個湖泊組成，每一個湖泊都有其獨特的形態和特色，並且湖水的顏色也因地形、氣候、時間等因素而不斷變化。春天湖泊周邊開滿了櫻花，夏季水清如鏡，秋季紅葉遍布，冬季則會因雪而變得尤為神秘。每一季的景色都是不同的，都值得讓人慢慢品味。', img: 'image/blogPage/event4.png' }
            // ],
            // editable: false,
            blog: {
                blogID: '',
                name: '',
                intro: '',
                banner1: '',
                region: '',
                display: 1,
                banner2: '',
                CreatedTime: ''
                
            },
            //專欄名稱
            name: '',
            //專欄簡介
            intro: ``,
            //regionID
            region: '',
            banner1: '',
            banner2: '',
            //方案詳情1
            blogSchedule1: {
                image: '',
                time: '',
                title: '',
                description: ''
            },
            //方案詳情2
            blogSchedule2: {
                image: '',
                time: '',
                title: '',
                description: ''
            },
            //方案詳情3
            blogSchedule3: {
                image: '',
                time: '',
                title: '',
                description: ''
            },
            //方案詳情4
            blogSchedule4: {
                image: '',
                time: '',
                title: '',
                description: ''
            }

        }
    },
    methods: {
        // async getBlog() {
        //     await axios.post('../php/backBlog.php')
        //         .then(response => {
        //             this.backBlog = response.data;
        //             console.log(this.backBlog);

        //             this.sortedBlog = this.backBlog;
        //             this.doSlice();
        //             this.checkCurrentNum();
        //         })
        //         .catch(error => {
        //             console.log(error);
        //             alert('取得失敗，請您稍後再試');
        //         });
        // },
        checkDetail() {
            location.href = 'backBlogDetail.html'
        },
        backPage() {
            history.back();
        },
        // uploadImage1(e) {
        //     const file = e.target.files.item(0);
        //     const reader = new FileReader();
        //     reader.addEventListener('load', this.image1Loaded);
        //     reader.readAsDataURL(file);
        // },
        // image1Loaded(e) {
        //     this.product.image1 = e.target.result;
        //     this.previewImage1 = true;
        // },
        updateImg1(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.blog.banner1 = e.target.result;
            });
            reader.readAsDataURL(file);
            
        },
        updateImg2(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.blog.banner2 = e.target.result;
                // console.log(this.blog.banner2);
            });
            reader.readAsDataURL(file);
        },
        updateImg3(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.blogSchedule1.image = e.target.result;
            });
            reader.readAsDataURL(file);
        },
        updateImg4(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.blogSchedule2.image = e.target.result;
            });
            reader.readAsDataURL(file);
        },
        updateImg5(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.blogSchedule3.image = e.target.result;
            });
            reader.readAsDataURL(file);
        },
        updateImg6(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.blogSchedule4.image = e.target.result;
            });
            reader.readAsDataURL(file);
        },
        async updateData(){
            const data = new FormData();
            
            data.append('name', this.blog.name);
            data.append('intro', this.blog.intro);
            // data.append('banner1', document.getElementById('banner1').files[0]);
            // data.append('banner2', document.getElementById('banner2').files[0]);
            data.append('region', this.blog.region);
            
            const banner1Input = document.getElementById('banner1');
            const image1Input = document.getElementById('banner2');
            const blogImage1Input = document.getElementById('blogImg1');
            const blogImage2Input = document.getElementById('blogImg2');
            const blogImage3Input = document.getElementById('blogImg3');
            const blogImage4Input = document.getElementById('blogImg4');

            if(this.blog.name === '' ){
                alert('請輸入專欄名稱');
            }else if(this.blog.region === ''){
                alert('請輸入專欄地區');
            }else if(this.blog.intro === ''){
                alert('請輸入專欄內容');
            }else if(
                banner1Input.files.length === 0 ||
                image1Input.files.length === 0 ||
                blogImage1Input.files.length === 0 ||
                blogImage2Input.files.length === 0 ||
                blogImage3Input.files.length === 0 ||
                blogImage4Input.files.length === 0 
            ){
                alert('所有照片欄位皆須上傳圖片');
            }else if(
                this.blogSchedule1.time === '' ||
                this.blogSchedule1.title === '' ||
                this.blogSchedule1.description === '' ||
                this.blogSchedule2.time === '' ||
                this.blogSchedule2.title === '' ||
                this.blogSchedule2.description === '' ||
                this.blogSchedule3.time === '' ||
                this.blogSchedule3.title === '' ||
                this.blogSchedule3.description === '' ||
                this.blogSchedule4.time === '' ||
                this.blogSchedule4.title === '' ||
                this.blogSchedule4.description === '' 
            ){
                alert('所有方案詳情欄位皆須填寫');
            }else{
                await axios.post('../php/makeNewBlog.php', data)
                .then(response => {
                    if (response.data !== 'fail') {
                        console.log('productSchedule已儲存!');
                        alert('儲存成功!');
                        this.blog.blogID = response.data;
                        this.savePlan();
                        this.saveBanner();
                        window.location.href = './backBlog.html';

                    }

                })
                .catch(error => {
                    console.log(error);
                    alert('連線失敗，請稍後重試');
                });
            }
            // location.href = 'backBlog.html';
            
        },
        async saveBanner(){
            const bannerData = new FormData();
            bannerData.append('banner1', document.getElementById('banner1').files[0]);
            bannerData.append('image1', document.getElementById('banner2').files[0]);
            bannerData.append('blogID', this.blog.blogID);

            await axios.post('../php/saveBlogBanner.php', bannerData)
                .then(response => {
                    console.log(response.data);
                    // if (response.data === 'done') {
                    //     console.log('banner已儲存!');
                        
                    // } else {
                    //     alert('Banner儲存失敗');
                    // }
                    
                })
                .catch(error => {
                    console.log(error);
                    alert('連線失敗，請稍後重試');
                });
        },
        async savePlan(){
            const planData = new FormData();
            planData.append('blogImg1', document.getElementById('blogImg1').files[0]);
            planData.append('blogTime1', this.blogSchedule1.time);
            planData.append('blogTitle1', this.blogSchedule1.title);
            planData.append('blogDescription1', this.blogSchedule1.description);
            planData.append('blogImg2', document.getElementById('blogImg2').files[0]);
            planData.append('blogTime2', this.blogSchedule2.time);
            planData.append('blogTitle2', this.blogSchedule2.title);
            planData.append('blogDescription2', this.blogSchedule2.description);
            planData.append('blogImg3', document.getElementById('blogImg3').files[0]);
            planData.append('blogTime3', this.blogSchedule3.time);
            planData.append('blogTitle3', this.blogSchedule3.title);
            planData.append('blogDescription3', this.blogSchedule3.description);
            planData.append('blogImg4', document.getElementById('blogImg4').files[0]);
            planData.append('blogTime4', this.blogSchedule4.time);
            planData.append('blogTitle4', this.blogSchedule4.title);
            planData.append('blogDescription4', this.blogSchedule4.description);
            planData.append('blogID', this.blog.blogID);

            await axios.post('../php/saveBlogPlan.php', planData)
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
        }
    },
    mounted() {
        // this.getBlog();
        
    }

});

import BackStageLogOutBtn from "./component/BackStageLogOutBtn.js";
app.component('backStageLogOutBtn', BackStageLogOutBtn);

app.mount('#app');