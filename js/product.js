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



$(document).ready(function () {


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
    calendarDays.addEventListener('click', function (event) {
        // 判斷點擊的是否為日期
        if (event.target.classList.contains('calendar-day')) {
            // 獲取選中的日期
            let selectedDate = event.target.innerText;
            // 設置選中的日期
            currentDate.setDate(selectedDate);
            // 重新顯示日曆
            showCalendar(currentDate.getFullYear(), currentDate.getMonth());
            // 更新Vue中的selectedDate資料
            this.selectedDate = currentDate.toISOString().substring(0, 10);
        }
    }.bind(this)); // 使用bind(this)將事件處理函式綁定到Vue實例


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

            //地區table資料
            region: [],
            productInRegion: [],

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

                    if (Array.isArray(response.data.region)) {
                        this.region = response.data.region

                        // console.log(this.region)
                    }

                    if (Array.isArray(response.data.productInRegion)) {
                        this.productInRegion = response.data.productInRegion

                        // console.log(this.productInRegion)
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

        var searchInput = document.getElementById("search");
        searchInput.addEventListener("input", function (event) {
            vm.searchInput = event.target.value;
            vm.applyFilters();
        });


        //------------------ 抓出關鍵字的值---------------------


        var searchInput = document.getElementById("search");
        let mv = this;
        searchInput.addEventListener("input", function (event) {
            mv.searchInput = event.target.value;
            // mv.keywordSearch();
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
            if (this.selectedDate) {
                this.displayItems = this.displayItems.filter(item => {
                    // Convert selectedDate to the format used by the item's date
                    const itemDate = new Date(item.Date);
                    const selectedDate = new Date(this.selectedDate);

                    // Compare only the date portion (ignore time)
                    itemDate.setHours(0, 0, 0, 0);
                    selectedDate.setHours(0, 0, 0, 0);

                    return itemDate.getTime() === selectedDate.getTime();
                });
            }

            this.productCount = this.displayItems.length;
            this.setPages();
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