const accordion = document.getElementsByClassName("contentBx");

for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function () {
        this.classList.toggle("active")
    })
}

const labels = document.getElementsByClassName("label");

for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    const content = label.nextElementSibling;

    label.addEventListener("click", function () {
        content.classList.toggle("active");
    });
}

// 設置當前日期
let currentDate = new Date();

// 顯示日曆
function showCalendar(year, month) {
    const currentMonth = document.querySelector('.current-month');
    const calendarDays = document.querySelector('.calendar-days');
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

$(document).ready(function () {

    // 獲取元素
    const prevMonth = document.querySelector('.prev-month');
    const nextMonth = document.querySelector('.next-month');

    // 操控日期
    // 初始化日曆
    showCalendar(currentDate.getFullYear(), currentDate.getMonth());

    // 切換到上一個月
    prevMonth.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        showCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    // 切換到下一個月
    nextMonth.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        showCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });


    // 操控價錢搜尋的值

    const slider = document.getElementById("slider");
    const value = document.getElementById("value");

    value.innerHTML = slider.value;

    slider.oninput = function () {
        value.innerHTML = this.value;
    }

});


// ------------------------------------------- vue框架 ----------------------------------------//

const RootComponent = {
    data() {
        return {
            productItems: [],
            displayItems: [],
            productDetails: [],
            productCount: 0,

            // 限制的資料數量
            currentPage: 1,
            perPage: 5,
            totalPages: 0,

            // 關鍵字篩選
            searchInput: '',

            // 價錢篩選
            minPrice: 0,
            maxPrice: 3000,

            // 新增的屬性用於保存使用者點擊的日期
            selectedDate: null,
            // 星星平均值
            averageStar: [],
            // 愛心初始狀態為未按下
            isHearted: false,
            //接會員收藏的資料
            collections: [],

            //接會員基本資料的資料
            accountInfo: {
                ID: '',
                AccountID: '',
                Avatar: '',
                FullName: '',
                Gender: '',
                Phone: '',
            },


        };
    },
    async mounted() {


        axios.get('../php/product.php')
            .then((response) => {
                //被包裝成二維陣列
                // console.log(response)
                // console.log(response.data)

                if (response.data && response.data.product && response.data.productdetail) {
                    if (Array.isArray(response.data.product)) {
                        this.productItems = response.data.product
                        // console.log(this.productItems);
                        this.displayItems = this.productItems
                        this.productCount = this.productItems.length
                    }
                    if (Array.isArray(response.data.productdetail)) {
                        this.productDetails = response.data.productdetail
                    }
                    if (Array.isArray(response.data.aaa)) {
                        this.AAA = response.data.aaa
                    }

                    if (Array.isArray(response.data.collections)) {
                        this.collections = response.data.collections
                    }

                    if (Array.isArray(response.data.averageStar)) {
                        this.averageStar = response.data.averageStar
                    }

                    // console.log('collections:', this.collections);
                    // console.log('displayItems:', this.displayItems);

                }
                this.setPages()

            })
            .catch((error) => {
                console.log(error);
            })



        // 在 mounted 钩子函数中添加事件监听器
        const accordion = document.getElementsByClassName("contentBx");

        for (let i = 0; i < accordion.length; i++) {
            accordion[i].addEventListener("click", function () {
                // console.log("aaaaa");
                this.classList.toggle("active");
            });
        }

        const labels = document.getElementsByClassName("label");

        for (let i = 0; i < labels.length; i++) {
            const label = labels[i];
            const content = label.nextElementSibling;

            label.addEventListener("click", function () {
                content.classList.toggle("active");
            });
        }






        //檢查是否為登入狀態

        let a = await globalCheck.PageCheckSession();// 測試連線
        // console.log(a);
        this.isSessionValid = a.isSessionValid;
        this.user = a.user;

        this.checkMatchingItems();
        this.getAccountInfo();




        let vm = this;

        $("input[name='region'], input[name='typeName']").on("click", function () {
            vm.applyFilters();
        });

        //------------------ 抓出關鍵字的值---------------------

        var searchInput = document.getElementById("search");
        searchInput.addEventListener("input", function (event) {
            vm.searchInput = event.target.value;
            vm.applyFilters();
        });





        // 選擇日期
        document.querySelector('.calendar-days').addEventListener('click', (event) => {
            // 判斷點擊的是否為日期
            if (event.target.classList.contains('calendar-day')) {
                // datep(event, currentDate);
                // 獲取選中的日期
                let selectedDate = event.target.innerText;
                // 將選中的日期轉換為符合 OfferDate 格式的日期字串
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth() + 1; // 月份從0開始，所以要加1
                const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`;

                // console.log(formattedDate);
                // console.log(selectedDate);
                // 設置選中的日期
                currentDate.setDate(selectedDate);
                // 重新顯示日曆
                showCalendar(currentDate.getFullYear(), currentDate.getMonth());
                vm.selectedDate = currentDate;
                vm.applyFilters();
            }
        });

    },


    computed: {

        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.displayItems.slice(startIndex, endIndex);
        },






    },

    methods: {


        // 幫價錢每三位數增加一個","

        numberWithCommas(value) {
            if (!value) return '';
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },


        applyFilters() {
            let regions = $("input[name='region']:checked").map(function () {
                return $(this).val();
            }).get();

            let typeNames = $("input[name='typeName']:checked").map(function () {
                return $(this).val();
            }).get();

            // 價錢篩選
            this.displayItems = this.productItems.filter(item => {
                const price = parseFloat(item.Price);
                // console.log(item.OfferDate)
                return price >= parseFloat(this.minPrice) && price <= parseFloat(this.maxPrice);
            });

            // 地區篩選
            if (regions.length > 0) {
                this.displayItems = this.displayItems.filter(e =>
                    regions.indexOf(e.RegionID.toString()) !== -1
                );
            }

            // 類別篩選
            if (typeNames.length > 0) {
                this.displayItems = this.displayItems.filter(e =>
                    typeNames.indexOf(e.ProductTypeID.toString()) !== -1
                );
            }

            // 关键字搜索
            if (this.searchInput.trim() !== "") {
                this.displayItems = this.displayItems.filter(item =>
                    item.Name.includes(this.searchInput) ||
                    item.Content.includes(this.searchInput)
                );
            }

            // Date filtering
            // console.log(this.selectedDate)
            if (this.selectedDate) {
                this.displayItems = this.displayItems.filter(item => {
                    // Find the corresponding productdetail item by ID
                    const productDetailItem = this.productDetails.find(detail => {
                        // Convert selectedDate to the format used by the item's date
                        const itemDate = new Date(detail.OfferDate);
                        const selectedDate = new Date(this.selectedDate);

                        // Compare only the date portion (ignore time)
                        itemDate.setHours(0, 0, 0, 0);
                        selectedDate.setHours(0, 0, 0, 0);

                        return detail.ProductID === item.ID && itemDate.getTime() === selectedDate.getTime();
                    });
                    if (productDetailItem) return true;

                    return false; // Item not found in productdetail, exclude it
                });
            }

            this.productCount = this.displayItems.length;
            this.setPages();
        },


        //-------------------------渲染網頁已收藏愛心-------------------


        checkMatchingItems() {
            // console.log('collections:', this.collections);
            // console.log('displayItems:', this.displayItems);

            const matchedItems = this.displayItems.filter(item => {
                const matchingItem = this.collections.find(collection => collection.ProductID === item.ID || collection[1] === item.ID);
                return matchingItem !== undefined;
            });

            if (matchedItems.length > 0) {
                // console.log('匹配的項目：', matchedItems);
                this.displayItems.forEach(item => {
                    const matchingItem = matchedItems.find(matchedItem => matchedItem.ID === item.ID);
                    item.isHearted = matchingItem !== undefined;
                });
            } else {
                console.log('找不到匹配的項目');
                this.displayItems.forEach(item => {
                    item.isHearted = false;
                });
            }
        },


        //-------------------------取得會員資料-------------------

        async getAccountInfo() {
            await axios.post('../php/GetAccountInfo.php', { user: this.user })
                .then(response => {
                    this.accountInfo.ID = response.data[0].ID;
                    this.accountInfo.AccountID = response.data[0].AccountID;
                    this.accountInfo.Avatar = response.data[0].Avatar;
                    if (response.data[0].FullName === null || response.data[0].FullName === undefined) {
                        this.accountInfo.FullName = null;
                    }
                    this.accountInfo.FullName = response.data[0].FullName;
                    if (response.data[0].Gender === null || response.data[0].Gender === undefined) {
                        this.accountInfo.Gender = 'none';
                    } else {
                        this.accountInfo.Gender = response.data[0].Gender;
                    }

                    this.accountInfo.Phone = response.data[0].Phone;

                    // console.log(this.accountInfo)
                })
                .catch(error => {
                    console.log(error);
                    window.location.href = "loginRegister.html";
                });
        },


        //-------------------------新增、刪除收藏資料&切換愛心圖片-------------------
        toggleFavorite(item) {
            if (item.isHearted) {
                this.removeFromFavorites(item);
            } else {
                this.addToFavorites(item);
            }
        },

        //新增收藏
        addToFavorites(item) {
            const productID = item.ID;
            // console.log(productID)
            const memberID = this.accountInfo.ID;
            // console.log(memberID)


            axios.
                post('../php/addCollection.php', { productID, memberID })
                .then(response => {
                    if (response.data === 'done') {
                        // console.log(response.data)
                        item.isHearted = true; // 更新項目的 isHearted 屬性
                    } else {
                        alert('新增收藏失敗');
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert('新增收藏失敗，請重試。');
                });
        },

        //移除收藏
        removeFromFavorites(item) {
            // console.log(item)
            const productID = item.ID;
            // console.log(productID)
            const memberID = this.accountInfo.ID;
            // console.log(memberID)


            axios
                .post('../php/RemoveCollection.php', { productID, memberID })
                .then(response => {
                    if (response.data === 'done') {
                        item.isHearted = false; // 更新項目的 isHearted 屬性
                    } else {
                        alert('刪除收藏失敗');
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert('刪除收藏失敗，請重試。');
                });
        },





        // -------------------------控制分頁-------------------

        setPages() {
            if (this.displayItems.length == 0) {
                this.totalPages = 0;
                this.currentPage = 1;
            } else {
                this.totalPages = Math.ceil(this.displayItems.length / this.perPage);
                this.currentPage = 1;
            }
        },

        goToPage(page) {
            this.currentPage = page;
        },



    }

};
Vue.createApp(RootComponent).mount("#pdt");