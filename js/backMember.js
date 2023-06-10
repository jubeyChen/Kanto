import BackStageLogOutBtn from "./component/BackStageLogOutBtn.js";
Vue.createApp({
    data() {
        return {
            newStatus: "",  //0跟1狀態
            members: [],  //因為搜尋型態而變動的會員資料
            all_members: [],  //靜態的會員資料
            currentPage: 1,
            countOfPage: 10,    //一頁的量
            currentNum: 10,      //當前筆數

            disableNextbtn: false,  //先預設下一頁按鈕都可以按

            searchKeyword: "",
            searchType: "",
            searchResult: [],
        }
    },
    computed: {
        //監聽 currentPage 
        totalPages() {
            return Math.ceil(this.all_members.length / this.countOfPage);
        }
    },
    methods: {
        async GetMembers() {
            // 抓取會員資料
            await axios.get('../php/backmembers.php')
                .then(response => {
                    this.members = response.data;
                    this.all_members = response.data;
                    // console.log(this.members);
                    // console.log(response.data)
                })
        },
        // 按鈕切換狀態
        btnSwitch(item) {
            // 先確保item存在的 避免item undefined
            if (item && 'Status' in item) {
                item.Status = !item.Status;
                this.newStatus = item.Status ? 1 : 0;
                // console.log(item);
            };

            if (item && 'ID' in item) {
                const UpdateMember = {
                    itemStatus: this.newStatus,
                    itemId: item.ID
                };
                // console.log(UpdateMember);

                axios.post("../php/UpdateMember.php", UpdateMember)
                    .then(response => {
                        // console.log(response.data);
                        if (response.data === '關閉') {
                            alert("您已關閉會員" + item.ID + "狀態");
                        } else {
                            alert("您已啟用會員" + item.ID + "狀態");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            };

        },
        currentNumber() {
            // 當前數量會有兩個情況
            const allMembers = this.all_members.length
            // 當會員總數量<=10 或 最後一頁(當前頁面=總頁面)時 當前數量=總會員數
            if (allMembers <= 10 || this.currentPage === this.totalPages) {
                this.currentNum = this.members.length;
            } else {
                // 當員總數量>10  則當前數量=頁數*10(總筆數)
                this.currentNum = this.currentPage * 10;
            };
        },
        lastPageBtn() {
            if (this.currentPage > 1) {
                this.currentPage = this.currentPage - 1
                this.disableNextbtn = false;
                this.currentNumber();
            }
        },
        nextPageBtn() {
            if (this.currentPage <= this.totalPages && this.members.length > (this.currentPage * 10)) {
                this.currentPage = this.currentPage + 1;
                this.currentNumber();
            }
            else if (this.currentPage === this.totalPages) {
                this.disableNextbtn = true;
                this.currentNumber();
            };
        },
        reverseList() {
            // console.log("aaa")
            this.members = this.members.reverse();
        },
        dosearch() {
            // console.log(this.searchType);
            let keyword = this.searchKeyword;
            switch (this.searchType) {
                // case 'all':
                //     if(keyword == ""){
                //         this.members = this.all_members;
                //     }
                // break;
                case 'ID':
                    keyword = parseInt(keyword);
                    if (!isNaN(keyword)) {
                        this.members = this.all_members.filter(members => members.ID === keyword)
                        return this.currentNum = this.members.length
                    } else {
                        alert("請輸入正確關鍵字");
                    }
                    break;
                case 'FullName':
                    // console.log(this.members[0].FullName.toString());
                    // console.log(this.all_members)

                    this.members = this.all_members.filter(members => members.FullName && members.FullName.toString().includes(keyword));
                    this.currentNum = this.members.length
                    break;

                case 'AccountID':
                    this.members = this.all_members.filter(members => members.AccountID.toLowerCase().includes(keyword.toLowerCase()))
                    this.currentNum = this.members.length
                    break;

                default:
                    this.members = this.all_members;
                    this.currentNum = this.all_members.length
                    this.currentNumber();
                    break;
            }
        }
    },
    async mounted() {
        try {
            await this.GetMembers();
            this.btnSwitch();
            this.currentNumber();
            this.dosearch();
        }
        catch (error) {
            // 處理错误
            console.error(error);
        }
    }
}).component('backStageLogOutBtn', BackStageLogOutBtn)
.mount('#app');
