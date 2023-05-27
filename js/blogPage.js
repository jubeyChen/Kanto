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

axios.get('../php/blogPage.php')
.then(response => {
    let new_arr = [];
    let pageID = 11;

    for(i = 0; i < response.data.length; i++){
        // console.log(response.data[i]);
        if(response.data[i].blogID == pageID){
            new_arr.push(response.data[i]); 
        }
    }

    // console.log(new_arr)

    /* ========== 串接標題 ========== */
    document.querySelector('.content h2').innerHTML = new_arr[0].title;
    document.querySelector('.content h4').innerHTML = new_arr[0][2];

    /* ========== 串接 banner 照片 ========== */
    const bannerURL = `./image/blog/${new_arr[0].blogID}/${new_arr[0][3]}`;
    document.getElementById('banner1').style.backgroundImage = `url(${bannerURL})`;
    document.getElementById('banner1_m').style.backgroundImage = `url(${bannerURL})`;
    document.getElementById('img1').setAttribute('src', `./image/blog/` + `${new_arr[0].blogID}` + `/` + `${new_arr[0][4]}`);

    /* ========== 串接 content 照片 ========== */
    for (let m = 1; m <= 4; m++) {
        const imageURL = `./image/blog/${new_arr[0].blogID}/content${m}.jpg`;
        document.getElementById(`content${m}`).setAttribute('src', imageURL);
        document.getElementById(`content${m}_m`).setAttribute('src', imageURL);
    }

    /* ========== 串接時間和行程標題 ========== */
    for(j = 0; j < new_arr.length; j++){
        document.querySelectorAll('.aside_content')[j].firstElementChild.innerHTML = new_arr[j][8];
        document.querySelectorAll('.time > p')[j].innerHTML = new_arr[j][8];

        document.querySelectorAll('.aside_content')[j].lastElementChild.innerHTML = new_arr[j][9];
        document.querySelectorAll('.time')[j].nextElementSibling.innerHTML = new_arr[j][9];
    }

    /* ========== 串接內文 ========== */
    for(k = 0; k < 3; k++){
        document.querySelectorAll('.event_content .content p')[k].innerHTML = new_arr[k + 1][5];
        document.querySelectorAll('.event .content p')[k].innerHTML = new_arr[k + 1][5];
    }
    
})
.catch(error => {
    console.log(error);
});
