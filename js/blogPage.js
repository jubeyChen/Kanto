window.addEventListener('scroll', function (e) {
    // console.log(this.window.innerWidth)

    /* ========== 飛機 ========== */

    if(this.window.innerWidth >= 1280){
        const path = document.querySelector('path');
        const length = path.getTotalLength();
    
        const scrollArea = document.getElementById('scrollArea');
        let top = scrollArea.getBoundingClientRect().top;
    
        const windowH = window.innerHeight * 0.5;
        let rangeY = Math.abs(top - windowH);
    
        let progress = rangeY / 1585;
        // console.log(progress)
    
        let myPoint = path.getPointAtLength(progress * length);
        let prePoint = path.getPointAtLength(progress * length - 1);
        let pathX = myPoint.x - 23;
        let pathY = myPoint.y - 32;
        let x = myPoint.x - prePoint.x;
        let y = Math.abs(myPoint.y - prePoint.y);
        let rotateDeg = Math.atan(y / x) * (180 / Math.PI);
    
        if (rotateDeg < 0) {
            rotateDeg += 180;
        }
    
        const airplane = document.getElementById('airplane');
    
        if (top < windowH && progress <= 1) {
            airplane.setAttribute('style', `opacity: 1; transform: translate(${pathX}px, ${pathY}px) rotate(${rotateDeg}deg)`);
            scrollArea.setAttribute('style', `opacity: 1; height: ${pathY + 32}px`);
        }
    
    }

    //側邊 線跟點點
    let circle = document.querySelectorAll('.circle');
    let aside_content = document.querySelectorAll('.aside_content');
    let circle_line = document.querySelectorAll('.line');


    if (window.pageYOffset > 1000) {
        circle[0].style.transform = 'scale(1)';
        circle[0].style.opacity = 1;

        setTimeout(function () {
            aside_content[0].style.opacity = 1;
            circle_line[0].style.height = 100 + '%';
        }, 500)
    }
    if (window.pageYOffset > 1500) {
        circle[1].style.transform = 'scale(1)';
        circle[1].style.opacity = 1;
        setTimeout(function () {
            aside_content[1].style.opacity = 1;
            circle_line[1].style.height = 100 + '%';
        }, 500)
    }
    if (window.pageYOffset > 2000) {
        circle[2].style.transform = 'scale(1)';
        circle[2].style.opacity = 1;
        setTimeout(function () {
            aside_content[2].style.opacity = 1;
            circle_line[2].style.height = 100 + '%';
        }, 500)
    }
    if (window.pageYOffset > 2500) {
        circle[3].style.transform = 'scale(1)';
        circle[3].style.opacity = 1;
        setTimeout(function () {
            aside_content[3].style.opacity = 1;
            circle_line[3].style.height = 100 + '%';
        }, 500)
    }
    if (window.pageYOffset > 3000) {
        circle[4].style.transform = 'scale(1)';
        circle[4].style.opacity = 1;
        setTimeout(function(){
            aside_content[4].style.opacity = 1;
        },500)

    }
});

/* ========== 前後端串接 ========== */

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
var blogId = getParameterByName('id');

// 現在你可以使用 productId 變數來進一步處理和使用該值
// console.log(blogId); // 印出 id 參數的值

axios.get('../php/blogPage.php?id=' + blogId)
.then(response => {

    //console.log(response.data);

    /* ========== 串接標題 ========== */
    document.querySelector('.content h2').innerHTML = response.data[0].title;
    document.querySelector('.content h4').innerHTML = response.data[0][2];

    /* ========== 串接 banner 照片 ========== */
    const bannerURL = `./image/blog/${response.data[0].blogID}/${response.data[0][3]}`;
    document.getElementById('banner1').style.backgroundImage = `url(${bannerURL})`;
    document.getElementById('banner1_m').style.backgroundImage = `url(${bannerURL})`;
    document.getElementById('img1').setAttribute('src', `./image/blog/` + `${response.data[0].blogID}` + `/` + `${response.data[0][4]}`);

    /* ========== 串接 content 照片 ========== */
    for (let m = 1; m <= 4; m++) {
        const imageURL = `./image/blog/${response.data[0].blogID}/content${m}.jpg`;
        document.getElementById(`content${m}`).setAttribute('src', imageURL);
        document.getElementById(`content${m}_m`).setAttribute('src', imageURL);
    }

    /* ========== 串接時間和行程標題 ========== */
    for(j = 0; j < response.data.length; j++){
        document.querySelectorAll('.aside_content')[j].firstElementChild.innerHTML = response.data[j][8];
        document.querySelectorAll('.time > p')[j].innerHTML = response.data[j][8];

        document.querySelectorAll('.aside_content')[j].lastElementChild.innerHTML = response.data[j][9];
        document.querySelectorAll('.time')[j].nextElementSibling.innerHTML = response.data[j][9];
    }

    /* ========== 串接內文 ========== */
    for(k = 0; k < 3; k++){
        document.querySelectorAll('.event_content .content p')[k].innerHTML = response.data[k + 1][5];
        document.querySelectorAll('.event .content p')[k].innerHTML = response.data[k + 1][5];
    }
    
})
.catch(error => {
    console.log(error);
});
