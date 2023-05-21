// const accordion = document.getElementsByClassName("contentBx");

// for(i = 0; i < accordion.length; i++){
//     accordion[i].addEventListener("click", function(){
//         this.classList.toggle("active")
//     })
// }

const labels = document.getElementsByClassName("label");

for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    const content = label.nextElementSibling;

    label.addEventListener("click", function() {
        content.classList.toggle("active");
    });
}



$(document).ready(function() {
    

    // 操控日期

    // 獲取元素
    const currentMonth = document.querySelector('.current-month');
    const prevMonth = document.querySelector('.prev-month');
    const nextMonth = document.querySelector('.next-month');
    const calendarDays = document.querySelector('.calendar-days');

    // 設置當前日期
    let currentDate = new Date();

    // 顯示日曆
    function showCalendar(year, month) {
    // 設置月份標題
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    currentMonth.innerHTML = `${year} 年 ${months[month]}`;

    // 設置日期
    let firstDay = new Date(year, month, 1).getDay(); // 獲取當月第一天是星期幾
    let lastDate = new Date(year, month + 1, 0).getDate(); // 獲取當月最後一天的日期

    let daysHTML = '';

    // 添加前面的空白
    for (let i = 0; i < firstDay; i++) {
        daysHTML += '<div class="calendar-day"></div>';
    }

    // 添加日期
    for (let i = 1; i <= lastDate; i++) {
        // 判斷當前日期是否為當前選中日期，如果是，則添加 .selected 類名
        let className = '';
        if (currentDate.getFullYear() === year && currentDate.getMonth() === month && currentDate.getDate() === i) {
        className = 'selected';
        }
        daysHTML += `<div class="calendar-day ${className}">${i}</div>`;
    }

    calendarDays.innerHTML = daysHTML;
    }

    // 初始化日曆
    showCalendar(currentDate.getFullYear(), currentDate.getMonth());

    // 切換到上一個月
    prevMonth.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    showCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    // 切換到下一個月
    nextMonth.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    showCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    // 選擇日期
    calendarDays.addEventListener('click', function(event) {
    // 判斷點擊的是否為日期
    if (event.target.classList.contains('calendar-day')) {
        // 獲取選中的日期
        let selectedDate = event.target.innerText;
        // 設置選中的日期
        currentDate.setDate(selectedDate);
        // 重新顯示日曆
        showCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }
    });



        // 操控價錢搜尋的值

        const slider = document.getElementById("slider");
        const value = document.getElementById("value");

        value.innerHTML = slider.value;

        slider.oninput = function() {
        value.innerHTML = this.value;
        }


        // //控制sidebar Scrollable 效果

        // let sidebar = document.getElementsByClassName("sidebar")[0];
        // let sidebar_content = document.getElementsByClassName("content-wrapper")[0];

        // window.onscroll = () => {
        //     let scrollTop = window.scrollY;
        //     let viewportHeigh = window.innerHeight;
        //     let contentHeight = sidebar_content.getBoundingClientRect().height;
        //     let sidebarTop = sidebar.getBoundingClientRect().top + window.pageYOffset;

        //     if(scrollTop >= contentHeight - viewportHeigh + sidebarTop){
        //         sidebar_content.style.transform = `translateY(-${contentHeight - viewportHeigh + sidebarTop}px)`;
        //         sidebar_content.style.position = "fixed";
        //     }
        //     else{
        //         sidebar_content.style.transform = "";
        //         sidebar_content.style.position = "";
        //     }
        // }


        // // 獲取要固定高度的元素
        // var asideEl = document.querySelector('.left');

        // // 設置元素的上限高度
        // var asideTop = 100;

        // // 監聽窗口滾動事件
        // window.addEventListener('scroll', function() {
        // // 如果窗口滾動的距離超過了元素的上限高度
        // if (window.scrollY >= asideTop) {
        //     // 設置元素固定的樣式
        //     asideEl.style.position = 'fixed';
        //     asideEl.style.top = '0';
        // } else {
        //     // 移除元素固定的樣式
        //     asideEl.style.position = '';
        //     asideEl.style.top = '';
        // }
        // });


});

        // let sidebar = document.getElementsByClassName("out")[0];
        // let sidebar_content = document.getElementsByClassName("left")[0];

        // window.onscroll = () => {
        //     let scrollTop = window.scrollY;
        //     let viewportHeigh = window.innerHeight;
        //     let contentHeight = sidebar_content.getBoundingClientRect().height;
        //     let sidebarTop = sidebar.getBoundingClientRect().top + window.pageYOffset;

        //     if(scrollTop >= contentHeight - viewportHeigh + sidebarTop){
        //         sidebar_content.style.transform = `translateY(-${contentHeight - viewportHeigh + sidebarTop}px)`;
        //         sidebar_content.style.position = "fixed";
        //     }else{
        //         sidebar_content.style.transform = "";
        //         sidebar_content.style.position = "";
        //     }
        // }


        // // 獲取要固定高度的元素
        // var asideEl = document.querySelector('.left');
    
        // // 計算元素距離文檔頂部的距離
        // var asideTop = asideEl.offsetTop;
        // // console.log(asideTop);
    
        // // 監聽窗口滾動事件
        // window.addEventListener('scroll', function() {
        // // 如果窗口滾動的距離超過了元素距離頂部的距離
        // if (window.scrollY >= asideTop) {
        //     // 設置元素固定的樣式
        //     asideEl.style.position = 'fixed';
        //     asideEl.style.top = '0';
        // } else {
        //     // 移除元素固定的樣式
        //     asideEl.style.position = '';
        //     asideEl.style.top = '';
        // }
        // });
    
    

