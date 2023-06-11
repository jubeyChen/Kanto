//寫看看vue

const app = Vue.createApp({
    data() {
        return {
            count: 1,
            price: "",
            total: "",
            // date: flatpickr.formatDate(new Date(), "Y-m-d"),
            // selectedDate: flatpickr.formatDate(new Date(), "Y-m-d"),
            productDetailId: [],
            productID: 0,

            //axios的部分
            title: '',
            banner1: '',
            banner2: '',
            banner3: '',
            eventContent: '',
            event_pic1: '',
            event_pic2: '',
            event_pic3: '',
            event_pic4: '',
            Introduction1: '',
            Introduction2: '',
            Introduction3: '',

            //方案詳情
            detail1_Time: '',
            detail1_ScheduleTitle: '',
            detail1_Pic: '',
            detail1_Content: '',

            detail2_Time: '',
            detail2_ScheduleTitle: '',
            detail2_Pic: '',
            detail2_Content: '',
            detail2_ContentTitle: '',

            detail3_Time: '',
            detail3_ScheduleTitle: '',
            detail3_Pic: '',
            detail3_Content: '',
            detail3_ContentTitle: '',

            detail4_Time: '',
            detail4_ScheduleTitle: '',
            detail4_Pic: '',
            detail4_Content: '',
            detail4_ContentTitle: '',

            detail5_Time: '',
            detail5_ScheduleTitle: '',


            //照片庫的部分----------------------
            photos: [],
            photosPath: [],
            //限定只顯示前面四張
            limitedPhotos: [],



            //會員評論--------------------------------------
            memberReview: [],
            memberStar: [],


            //活動日期---------------------------------------
            eventDate: [],
            //撈出日期
            selectedDate: '',



            //分頁寫法
            currentPage: 1, //當前頁數
            itemsPerPage: 3, //每頁顯示的資料量


            //紀錄登入資訊
            isSessionValid: false,
            user: '',

            //
            planChoose: [],

            selectedDataId: null,
        }
    },
    created() {
        this.getData();

        this.total = this.price;
        this.total = this.total.toLocaleString();

    },
    computed: {
        //html迴圈的部分 原先是跑data現在要跑這個函式
        paginatedActivities() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;

            //data.slice() 是 JavaScript 中陣列的方法，用於從原陣列中取出指定範圍的元素，並返回一個新的陣列。
            return this.memberReview.slice(startIndex, endIndex);
        },
        //計算會有幾個分頁按鈕會被渲染出來
        totalPages() {
            //無條件進入
            return Math.ceil(this.memberReview.length / this.itemsPerPage);
        }
    },

    methods: {
        updateSelectedDataId(e) {
            // console.log(e.target.selectedOptions[0]);
            const selectedOption = e.target.selectedOptions[0];
            this.selectedDataId = selectedOption.getAttribute('data-id')
            // console.log(this.selectedDataId);
        },
        //撈取資料
        getData() {
            //傳遞id的值到php
            function getParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return "";
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }

            // 使用 getParameterByName 函式來獲取 URL 中的 id 參數值
            var productId = getParameterByName('id');

            // 現在你可以使用 productId 變數來進一步處理和使用該值
            // 例如：
            // console.log(productId); // 印出 id 參數的值



            //撈取資料 丟到data
            //因為由低至高需要加入return
            return axios.get('../php/productPage.php?id=' + productId)
                .then((response) => {
                    //被包裝成二維陣列

                    // console.log(response.data);
                    // console.log(response.data.data1);


                    this.productDetailId = response.data.date.map((item) => {
                        return item.ID;
                    })
                    // console.log(this.productDetailId);


                    this.productID = response.data.data1[0][0];
                    this.title = response.data.data1[0]['Name'];
                    this.banner1 = `./image/productPage/${response.data.data1[0][0]}/${response.data.data1[0]['Banner1']}` + `?t=${Date.now()}`;
                    this.banner2 = `./image/productPage/${response.data.data1[0][0]}/${response.data.data1[0]['Banner2']}` + `?t=${Date.now()}`;
                    this.banner3 = `./image/productPage/${response.data.data1[0][0]}/${response.data.data1[0]['Banner3']}` + `?t=${Date.now()}`;
                    this.eventContent = response.data.data1[0]['Content'];
                    this.event_pic1 = `./image/productPage/${response.data.data1[0][0]}/${response.data.data1[0]['Image1']}` + `?t=${Date.now()}`;
                    this.event_pic2 = `./image/productPage/${response.data.data1[0][0]}/${response.data.data1[0]['Image2']}` + `?t=${Date.now()}`;
                    this.event_pic3 = `./image/productPage/${response.data.data1[0][0]}/${response.data.data1[0]['Image3']}` + `?t=${Date.now()}`;
                    this.event_pic4 = `./image/productPage/${response.data.data1[0][0]}/${response.data.data1[0]['Image4']}` + `?t=${Date.now()}`;
                    this.Introduction1 = response.data.data1[0]['Content1'];
                    this.Introduction2 = response.data.data1[0]['Content2'];
                    this.Introduction3 = response.data.data1[0]['Content3'];
                    this.total = response.data.data1[0]['Price'];
                    this.price = response.data.data1[0]['Price'];


                    //data2 是方案詳情---------------------------------------
                    // console.log(response.data.data2);
                    this.detail1_Time = response.data.data2[0]['Times'];
                    this.detail1_ScheduleTitle = response.data.data2[0]['ScheduleTitle'];
                    this.detail1_Pic = `./image/productPage/${response.data.data1[0][0]}/${response.data.data2[0]['Image']}` + `?t=${Date.now()}`;
                    this.detail1_Content = response.data.data2[0]['Content'];

                    this.detail2_Time = response.data.data2[1]['Times'];
                    this.detail2_ScheduleTitle = response.data.data2[1]['ScheduleTitle'];
                    this.detail2_Pic = `./image/productPage/${response.data.data1[0][0]}/${response.data.data2[1]['Image']}` + `?t=${Date.now()}`;
                    this.detail2_Content = response.data.data2[1]['Content'];
                    this.detail2_ContentTitle = response.data.data2[1]['ContentTitle'];

                    this.detail3_Time = response.data.data2[2]['Times'];
                    this.detail3_ScheduleTitle = response.data.data2[2]['ScheduleTitle'];
                    this.detail3_Pic = `./image/productPage/${response.data.data1[0][0]}/${response.data.data2[2]['Image']}` + `?t=${Date.now()}`;
                    this.detail3_Content = response.data.data2[2]['Content'];
                    this.detail3_ContentTitle = response.data.data2[2]['ContentTitle'];

                    this.detail4_Time = response.data.data2[3]['Times'];
                    this.detail4_ScheduleTitle = response.data.data2[3]['ScheduleTitle'];
                    this.detail4_Pic = `./image/productPage/${response.data.data1[0][0]}/${response.data.data2[3]['Image']}` + `?t=${Date.now()}`;
                    this.detail4_Content = response.data.data2[3]['Content'];
                    this.detail4_ContentTitle = response.data.data2[3]['ContentTitle'];





                    //照片庫----------------------------------------
                    // console.log(response.data.photos);
                    this.photos.push(...response.data.photos);

                    //篩選掉資料庫中是""或是null的
                    this.photosPath = this.photos
                        .filter(function (item) {
                            return item !== null && item !== "";
                        })
                        .map(function (item) {
                            return `./image/productPage/${response.data.data1[0][0]}/reviewPhoto/${item}`
                        });

                    // console.log(this.photosPath);
                    //將photosPath的前4筆資料賦予到limitedPhotos
                    this.limitedPhotos = this.photosPath.slice(0, 4);

                    //MEMBER
                    // console.log(response.data.member);
                    this.memberReview = response.data.member;
                    // console.log(this.memberReview);





                    //查詢日期
                    // console.log(response.data.date);
                    this.eventDate = response.data.date;





                    this.detail5_Time = response.data.data2[4]['Times'];
                    this.detail5_ScheduleTitle = response.data.data2[4]['ScheduleTitle'];







                })
                .catch((error) => {
                    // console.log(error);
                })
        },


        goToPage(page) {
            this.currentPage = page;
        },

        //只看附圖評價
        haveImage() {
            this.memberReview = this.memberReview.filter((item) => {
                return item.Image1 != null || item.Imgae2 != null || item.Imgae3 != null || item.Image4 != null || item.Imgae5 != null || item.Imgae6 != null
            })
            this.currentPage = 1;
            // console.log(this.memberReview);
        },
        //全部評價
        allImage() {
            //要將photos還原成空陣列，不然照片庫的數字會不斷增加
            this.photos = [];
            this.getData();

        },


        //由低至高
        lowToHigh() {
            this.photos = [];
            this.getData().then(() => {
                // 在这里可以添加任何需要在获取数据后执行的代码
                // ...

                // 根据星星数从低到高排序
                this.memberReview.sort((a, b) => {
                    return a.Star - b.Star;

                });
                this.currentPage = 1;
                // console.log(this.memberReview);
            });
        },


        //由高至低
        highToLow() {
            this.photos = [];
            this.getData().then(() => {
                // 在这里可以添加任何需要在获取数据后执行的代码
                // ...

                // 根据星星数从高到低排序
                this.memberReview.sort((a, b) => {
                    return b.Star - a.Star;
                });
                this.currentPage = 1;
                // console.log(this.memberReview);
            });
        },

        //+按鈕
        countAdd() {
            if (this.count < 9) {
                this.count += 1;
                this.total = this.price * this.count;
                //轉成千分
                this.total = this.total.toLocaleString();
            }
        },
        //-按鈕
        countMinus() {
            if (this.count > 1) {
                this.count -= 1;
                this.total = this.price * this.count;
                this.total = this.total.toLocaleString();
            }
        },
        //清空按鈕
        clear() {
            this.count = 1;
            this.total = this.price;
            this.total = this.total.toLocaleString();
            this.selectedDate = ""
            this.content = "查看可預訂的日期";
        },

        //左右滑動按鈕
        scrollBtn() {
            window.scrollTo({ top: 5250, behavior: 'smooth' })
        },

        //加入購物車狀態
        addCart(e) {
            if (this.isSessionValid == true) {
                if (this.selectedDate == "") {
                    alert('請選擇日期')
                    e.preventDefault();
                    return
                }

                // 從 localStorage 中獲取現有的資料
                const existingData = localStorage.getItem('shoppingList');
                let shoppingList = [];

                if (existingData) {
                    //如果localStorage已經有資料
                    shoppingList = JSON.parse(existingData)
                }


                //將資料組成物件
                const planObj = {
                    productDetailId: this.selectedDataId,
                    productID: this.productID,
                    total: this.total,
                    selectedDate: this.selectedDate,
                    title: this.title,
                    count: this.count,
                    banner: this.banner1,
                    user: this.user,
                    isSessionValid: this.isSessionValid
                }
                shoppingList.push(planObj)
                const updatedData = JSON.stringify(shoppingList);
                localStorage.setItem('shoppingList', updatedData);
                // console.log(shoppingList);

                alert('加入購物車成功')


            } else {
                alert('請先進行登入')
                //跳轉網頁
                window.location.href = './loginRegister.html';
                e.preventDefault();
            }
        },

        //立即預定

        checkLogin(e) {
            if (this.isSessionValid == true) {
                if (this.selectedDate == "") {
                    alert('請選擇日期')
                    e.preventDefault();
                    return
                }

                // 從 localStorage 中獲取現有的資料
                const existingData = localStorage.getItem('shoppingList');
                let shoppingList = [];

                if (existingData) {
                    //如果localStorage已經有資料
                    shoppingList = JSON.parse(existingData)
                }


                //將資料組成物件
                const planObj = {
                    productId: this.productID,
                    total: this.total,
                    selectedDate: this.selectedDate,
                    title: this.title,
                    count: this.count,
                    banner: this.banner1,
                    user: this.user,
                    isSessionValid: this.isSessionValid
                }
                shoppingList.push(planObj)
                const updatedData = JSON.stringify(shoppingList);
                localStorage.setItem('shoppingList', updatedData);
                // console.log(shoppingList);



            } else {
                alert('請先進行登入')
                //跳轉網頁
                window.location.href = './loginRegister.html';
                e.preventDefault();
            }
        }

    },

    //檢查是否為登入狀態
    async mounted() {
        let a = await globalCheck.PageCheckSession();// 測試連線
        // console.log(a);
        this.isSessionValid = a.isSessionValid;
        this.user = a.user;
    },



})
app.mount(".all");






//右側方案詳情滑動-----------------------------------------------------------
let choose = document.querySelector(".choose");
let choose_inner = document.querySelector(".choose_inner");
let choose_inner2 = document.querySelector(".choose_inner2");

window.addEventListener("scroll", function (e) {
    if (choose.offsetTop > 2000) {
        choose.style.opacity = "1";
    } else {
        choose.style.opacity = "0";
    }
});


//輪播------------------------------------------------
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
    navigation: {
        nextEl: ".left_btn",
        prevEl: ".right_btn",
    },
});

var swiper = new Swiper(".myPhoneSwiper", {
    autoplay: {
        delay: 4000,
    },
    speed: 700,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".left_btn",
        prevEl: ".right_btn",
    },
});


//--------------照片庫輪播
var swiper = new Swiper(".lightbox_mySwiper", {
    spaceBetween: 10,
    slidesPerView: 8,
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper2 = new Swiper(".lightbox_mySwiper2", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".lightbox_left_btn",
        prevEl: ".light_right_btn",
    },
    thumbs: {
        swiper: swiper,
    },
});





//手機版評價按鈕

let review_btn = document.querySelector(".all_review_btn");
let phone_all_review = document.querySelector(".phone_all_review");
let lightbox = document.querySelector(".productpage_lightbox");
let del_btn = document.querySelector(".xmark");

review_btn.addEventListener("click", function (e) {
    phone_all_review.classList.add("add")
    lightbox.style.display = "block";
});
lightbox.addEventListener("click", function (e) {
    phone_all_review.classList.remove("add");
    lightbox.style.display = "none";
})

del_btn.addEventListener("click", function (e) {
    phone_all_review.classList.remove("add");
    lightbox.style.display = "none";
})



//評價的滑動
const slide_block = document.querySelector(".card_swiper_block1");
const right_btn = document.querySelector(".slide_right_btn");
const left_btn = document.querySelector(".slide_left_btn")

right_btn.addEventListener("click", function (e) {
    slide_block.scrollLeft += 892.5;
})

left_btn.addEventListener("click", function (e) {
    slide_block.scrollLeft -= 892.5;
});


//日期----------------------------------------------------------------

// const dateButton = document.getElementById('dateButton');
//桌機
// const clearBtn = document.querySelector(".clearBtn");
// const date = document.querySelector(".date");

// clearBtn.addEventListener("click", function (e) {
//     phone_dateButton.textContent = flatpickr.formatDate(new Date(), "Y-m-d");
//     dateButton.textContent = flatpickr.formatDate(new Date(), "Y-m-d");
//     date.textContent = flatpickr.formatDate(new Date(), "Y-m-d");
//     console.log(flatpickr.formatDate(new Date(), "Y-m-d"));
// })


//手機
// const phone_clearbtn = document.querySelector('.phone_clearbtn');
// const phone_dateButton = document.querySelector('.phone_dateButton');

// phone_clearbtn.addEventListener("click", function (e) {
//     phone_dateButton.textContent = flatpickr.formatDate(new Date(), "Y-m-d");
//     date.textContent = flatpickr.formatDate(new Date(), "Y-m-d");
//     dateButton.textContent = flatpickr.formatDate(new Date(), "Y-m-d");
//     console.log(flatpickr.formatDate(new Date(), "Y-m-d"));
// })









// flatpickr(dateButton, {
//     dateFormat: "Y-m-d",
//     defaultDate: "today",
//     minDate: "today", // 設定最小日期為當天
//     onClose: function (selectedDates, dateStr, instance) {
//         dateButton.textContent = dateStr; // 將日期顯示在按鈕上
//     }
// });

// 將初始按鈕內容設定為當天日期
// dateButton.textContent = flatpickr.formatDate(new Date(), "Y-m-d");


//照片庫開啟

let total_pic = document.querySelector(".total_pic");
let light_box = document.querySelector(".lightbox");
let des_lightbox = document.querySelector(".des_lightbox");
let lightbox_btn = document.querySelector(".ligntbox_btn");
total_pic.addEventListener("click", function (e) {
    light_box.style.display = "block";
    setTimeout(function () {
        light_box.style.opacity = 1;
    }, 0);

    des_lightbox.style.display = "block";
    setTimeout(function () {
        des_lightbox.style.opacity = 1;
    }, 0);

});
lightbox_btn.addEventListener("click", function (e) {
    light_box.style.display = "none";
    setTimeout(function () {
        light_box.style.opacity = 0;
    }, 0);


    des_lightbox.style.display = "none";
    setTimeout(function () {
        des_lightbox.style.opacity = 0;
    }, 0);
});



let des_filter_btn = document.querySelectorAll('.des_filter_btn');

for (let i = 0; i < des_filter_btn.length; i++) {

    des_filter_btn[i].addEventListener("click", function (e) {
        for (let i = 0; i < des_filter_btn.length; i++) {
            des_filter_btn[i].classList.remove('-active');
        }
        des_filter_btn[i].classList.add('-active');
    })
};




