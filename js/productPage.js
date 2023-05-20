//寫看看vue

const app = Vue.createApp({
    data() {
        return {
            count: 1,
            price: 2200,
            total: "",
            date: flatpickr.formatDate(new Date(), "Y-m-d"),
            selectedDate: flatpickr.formatDate(new Date(), "Y-m-d"),
        }
    },
    created() {
        this.total = this.price;
        this.total = this.total.toLocaleString();
    },
    methods: {
        //+按鈕
        countAdd() {
            if (this.count < 9) {
                this.count += 1;
                this.total = this.price * this.count;
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
    des_lightbox.style.display = "block";
});
lightbox_btn.addEventListener("click", function (e) {
    light_box.style.display = "none";
    des_lightbox.style.display = "none";
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




