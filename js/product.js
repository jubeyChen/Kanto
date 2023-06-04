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

    // 選擇日期
    // calendarDays.addEventListener('click', (event) => {
    //     // 判斷點擊的是否為日期
    //     if (event.target.classList.contains('calendar-day')) {
    //         // datep(event, currentDate);
    //         // 獲取選中的日期
    //         let selectedDate = event.target.innerText;
    //         // 將選中的日期轉換為符合 OfferDate 格式的日期字串
    //         const year = currentDate.getFullYear();
    //         const month = currentDate.getMonth() + 1; // 月份從0開始，所以要加1
    //         const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`;

    //         console.log(formattedDate);
    //         console.log(selectedDate);
    //         // 設置選中的日期
    //         currentDate.setDate(selectedDate);
    //         // 重新顯示日曆
    //         showCalendar(currentDate.getFullYear(), currentDate.getMonth(), currentMonth, calendarDays);
    //         // RootComponent.methods.setSelectedDate(currentDate);
    //     }


    // });


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

            selectedDate: null,  // 新增的屬性用於保存使用者點擊的日期



        };
    },
    mounted() {

        axios.get('../php/product.php')
            .then((response) => {
                //被包裝成二維陣列
                console.log(response)
                // console.log(response.data)

                if (response.data && response.data.product && response.data.productdetail) {
                    if (Array.isArray(response.data.product)) {
                        this.productItems = response.data.product
                        this.displayItems = this.productItems
                        this.productCount = this.productItems.length
                    }
                    if (Array.isArray(response.data.productdetail)) {
                        this.productDetails = response.data.productdetail
                    }
                    if (Array.isArray(response.data.aaa)) {
                        this.AAA = response.data.aaa


                    }



                }
                this.setPages()

            })
            .catch((error) => {
                console.log(error);
            })

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

                console.log(formattedDate);
                console.log(selectedDate);
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
            console.log(this.selectedDate)
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

        // findIndex()
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