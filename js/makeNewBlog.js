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
                banner2: ''
                
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
            console.log(this.image1)
        },
        updateImg2(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                this.blog.banner2 = e.target.result;
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
            let data = new FormData();
            
            data.append('name', this.blog.name);
            data.append('intro', this.blog.intro);
            data.append('banner1', this.blog.banner1);
            data.append('banner2', this.blog.banner2);
            data.append('region', this.blog.region);
            data.append('blogImage1', this.blogSchedule1.image);
            data.append('blogTime1', this.blogSchedule1.time);
            data.append('blogTitle1', this.blogSchedule1.title);
            data.append('blogDescription1', this.blogSchedule1.description);
            data.append('blogImage2', this.blogSchedule2.image);
            data.append('blogTime2', this.blogSchedule2.time);
            data.append('blogTitle2', this.blogSchedule2.title);
            data.append('blogDescription2', this.blogSchedule2.description);
            data.append('blogImage3', this.blogSchedule3.image);
            data.append('blogTime3', this.blogSchedule3.time);
            data.append('blogTitle3', this.blogSchedule3.title);
            data.append('blogDescription3', this.blogSchedule3.description);
            data.append('blogImage4', this.blogSchedule4.image);
            data.append('blogTime4', this.blogSchedule4.time);
            data.append('blogTitle4', this.blogSchedule4.title);
            data.append('blogDescription4', this.blogSchedule4.description);
            
            await axios.post('../php/makeNewBlog.php', data)
                .then(response => {
                    if (response.data) {
                        console.log('productSchedule已儲存!');
                        alert('儲存成功!');
                        this.blog.blogID = response.data;
                        // window.location.href = './backProduct.html';

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

app.mount('#app');