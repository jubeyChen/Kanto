Vue.createApp({
    data(){
        return{
            newStatus:"",
            members:[],
            
            // totalPages:0,
            currentPage:1,
            //一頁的量
            countOfPage:10,
            currentNum:10
        }
    },
    computed:{
        //監聽 currentPage 
        totalPages(){
            return Math.ceil(this.members.length / this.countOfPage);
        },
        currentNumber(){
            // 當前數量會有兩個情況
            // 該頁面數量/總數量       10/16

            // 每頁數量*頁數 /總數量    16/16
            // 當總數量<10(每頁數量) 或 最後一頁(當前頁面=總頁面)時 當前數量=總會員數
            
            const allMembers = this.members.length

            if(allMembers <= 10 || this.currentPage === this.totalPages){
                return this.currentNum = allMembers;
            }else if(allMembers > 10){
                return this.currentNum = this.currentPage * 10;
            };

            // const allmembers = this.members.length //member + s
            // if(allmembers <= this.countOfPage || this.currentPage === this.totalPages){
            //     this.currentNum = allmembers
            // }else if(allmembers > 10 || allmembers % this.countOfPage !== 0){ // || what for?
            //     this.currentNum = this.currentNum + (allmembers % this.countOfPage)
            // };

            //20筆的狀況呢？

            // 當總數量大於10 且總數量除每頁數量會有餘數時(不等於0)  當前數量就 = 頁數*每頁數量 
            // else if(this.members.length > this.countOfPage && this.currentPage === this.totalPages)
            //     {
            //     this.currentNum = this.currentNum + (this.members.length%this.countOfPage)
            // };
        }
    },

    methods:{
        async GetMembers(){
            // 抓取會員資料
            await axios.get('../php/backmembers.php')
            .then(response => {
                this.members = response.data;
                // console.log(this.members);
            })
        },    
        // 按鈕切換狀態
        btnSwitch(item){
            item.Status = !item.Status;

            if(item.Status === false){
                this.newStatus = 0
            }else{
                this.newStatus = 1
            }

            const UpdateMember = {
                itemStatus: this.newStatus,
                itemId:item.ID
            }
            // console.log(UpdateMember);

            axios.post("../php/UpdateMember.php", UpdateMember)
            .then(response => {
                // console.log(response.data);
                if(response.data === '關閉'){
                    alert("您已關閉會員" + item.ID + "狀態");
                }else{
                    alert("您已啟用會員" + item.ID + "狀態");
                }
            })
            .catch(error => {
                console.log(error);
            });
        },

        // 上一頁(現在頁數>1時才能按 ) 一頁10筆資料/總人數 下一頁(現在項目<總頁數[全部項目數量/每頁有幾項])
        lastPageBtn(){
            if(this.currentPage > 1 ){
                this.currentPage = this.currentPage - 1
            }
            this.currentNumber();
        },
        nextPageBtn(){
            if(this.currentPage <  this.totalPages) //|| this.members.length <= (currentPage*10))
            {
                this.currentPage = this.currentPage + 1
            }
            this.currentNumber();
        }
    },
    async mounted(){
        await this.GetMembers();
        await this.btnSwitch();
        await this.sendStatus();
        await this.currentNumber();
    }
}).mount('#app');
