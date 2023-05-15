
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




//輪播
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

