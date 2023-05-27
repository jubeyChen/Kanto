//寫看看vue

const app = Vue.createApp({
    data() {
        return {
            count: 1,
            price: "",
            total: "",
            date: flatpickr.formatDate(new Date(), "Y-m-d"),
            selectedDate: flatpickr.formatDate(new Date(), "Y-m-d"),

            //axios的部分
            title: '',
            banner1: '',
            banner2: '',
            banner3: '',
            phone_banner1: '',
            phone_banner2: '',
            phone_banner3: '',
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
        }
    },
    created() {


        //傳遞id的值到php

        // 這段程式碼定義了一個名為 getParameterByName 的函式，用於從 URL 中獲取指定名稱的參數值。

        // 程式碼中的 getParameterByName 函式使用正則表達式來解析 URL，並通過指定的參數名稱返回相應的參數值。
        
        // 使用方法如下：
        
        // 呼叫 getParameterByName 函式並傳入參數名稱，例如 'id'。
        // 如果沒有指定第二個參數 url，則預設使用 window.location.href 獲取當前頁面的 URL。
        // getParameterByName 函式會使用正則表達式解析 URL，找到名稱為參數名稱的參數並返回其值。
        // 如果找不到指定名稱的參數，則返回 null。
        // 如果找到指定名稱的參數但值為空，則返回空字串 ""。
        // 如果找到指定名稱的參數並存在值，則返回解碼後的參數值。
        // 在提供的程式碼中，我們使用 getParameterByName 函式來獲取 URL 中的 id 參數值，並將其存儲在 productId 變數中。
        // 然後你可以根據需要使用 productId 變數進行後續處理和使用，例如將其印出到控制台。
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
        console.log(productId); // 印出 id 參數的值



        //撈取資料 丟到data
        axios.get('../php/productPage.php?id=' + productId)
            .then((response) => {
                //被包裝成二維陣列
                console.log(response.data.data1);

                this.title = response.data.data1[0]['Name'];
                this.banner1 = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data1[0]['Banner1']}`;
                this.banner2 = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data1[0]['Banner2']}`;
                this.banner3 = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data1[0]['Banner3']}`;
                this.phone_banner1 = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data1[0]['Banner1_m']}`;
                this.phone_banner2 = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data1[0]['Banner2_m']}`;
                this.phone_banner3 = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data1[0]['Banner3_m']}`;
                this.eventContent = response.data.data1[0]['Content'];
                this.event_pic1 = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data1[0]['Image1']}`;
                this.event_pic2 = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data1[0]['Image2']}`;
                this.event_pic3 = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data1[0]['Image3']}`;
                this.event_pic4 = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data1[0]['Image4']}`;
                this.Introduction1 = response.data.data1[0]['Content1'];
                this.Introduction2 = response.data.data1[0]['Content2'];
                this.Introduction3 = response.data.data1[0]['Content3'];
                this.total = response.data.data1[0]['Price'];
                this.price = response.data.data1[0]['Price'];


                //data2 是方案詳情
                console.log(response.data.data2);
                this.detail1_Time = response.data.data2[0]['Times'];
                this.detail1_ScheduleTitle = response.data.data2[0]['ScheduleTitle'];
                this.detail1_Pic = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data2[0]['Image']}`;
                this.detail1_Content = response.data.data2[0]['Content'];

                this.detail2_Time = response.data.data2[1]['Times'];
                this.detail2_ScheduleTitle = response.data.data2[1]['ScheduleTitle'];
                this.detail2_Pic = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data2[1]['Image']}`;
                this.detail2_Content = response.data.data2[1]['Content'];
                this.detail2_ContentTitle = response.data.data2[1]['ContentTitle'];

                this.detail3_Time = response.data.data2[2]['Times'];
                this.detail3_ScheduleTitle = response.data.data2[2]['ScheduleTitle'];
                this.detail3_Pic = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data2[2]['Image']}`;
                this.detail3_Content = response.data.data2[2]['Content'];
                this.detail3_ContentTitle = response.data.data2[2]['ContentTitle'];

                this.detail4_Time = response.data.data2[3]['Times'];
                this.detail4_ScheduleTitle = response.data.data2[3]['ScheduleTitle'];
                this.detail4_Pic = `./image/productPage/${response.data.data1[0]['ProductID']}/${response.data.data2[3]['Image']}`;
                this.detail4_Content = response.data.data2[3]['Content'];
                this.detail4_ContentTitle = response.data.data2[3]['ContentTitle'];

                this.detail5_Time = response.data.data2[4]['Times'];
                this.detail5_ScheduleTitle = response.data.data2[4]['ScheduleTitle'];
            })
            .catch((error) => {
                console.log(error);
            })

        this.total = this.price;
        this.total = this.total.toLocaleString();
    },
    methods: {
        //+按鈕
        countAdd() {
            if (this.count < 9) {
                this.count += 1;
                this.total = this.price * this.count;
                //轉成千分味
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
            this.content = "查看可預訂的日期";
        },

        //左右滑動按鈕
        scrollBtn() {
            window.scrollTo({ top: 5250, behavior: 'smooth' })
        },

        //日曆
        initializeFlatpickr() {
            flatpickr(this.$refs.dateButton, {
                dateFormat: "Y-m-d",
                defaultDate: "today",
                minDate: "today",
                disableMobile: true,
                onClose: (selectedDates, dateStr, instance) => {
                    console.log(dateStr);
                    this.selectedDate = dateStr; // 更新selectedDate的值
                    this.$refs.dateButton.textContent = dateStr; // 更新按钮上的显示日期
                }
            });
            flatpickr(this.$refs.phone_dateButton, {
                dateFormat: "Y-m-d",
                defaultDate: "today",
                minDate: "today",
                disableMobile: true,
                onClose: (selectedDates, dateStr, instance) => {
                    console.log(dateStr);
                    this.selectedDate = dateStr; // 更新selectedDate的值
                    this.$refs.dateButton.textContent = dateStr; // 更新按钮上的显示日期
                }
            });
        }
    },
    //日曆 掛載時先執行一次 初始化用
    mounted() {
        this.initializeFlatpickr();
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
const clearBtn = document.querySelector(".clearBtn");
const date = document.querySelector(".date");

clearBtn.addEventListener("click", function (e) {
    phone_dateButton.textContent = flatpickr.formatDate(new Date(), "Y-m-d");
    dateButton.textContent = flatpickr.formatDate(new Date(), "Y-m-d");
    date.textContent = flatpickr.formatDate(new Date(), "Y-m-d");
    console.log(flatpickr.formatDate(new Date(), "Y-m-d"));
})


//手機
const phone_clearbtn = document.querySelector('.phone_clearbtn');
const phone_dateButton = document.querySelector('.phone_dateButton');

phone_clearbtn.addEventListener("click", function (e) {
    phone_dateButton.textContent = flatpickr.formatDate(new Date(), "Y-m-d");
    date.textContent = flatpickr.formatDate(new Date(), "Y-m-d");
    dateButton.textContent = flatpickr.formatDate(new Date(), "Y-m-d");
    console.log(flatpickr.formatDate(new Date(), "Y-m-d"));
})









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




