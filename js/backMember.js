Vue.createApp({
    data(){
        return{
            newStatus:"",
            members:[],
            
            // totalPages:0,
            currentPage:1,
            //一頁的量
            countOfPage:10
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

        // 頁碼
        // 上一頁(現在項目-10 ) 一頁10筆資料/總人數 下一頁(現在項目+10)
        lastPageBtn(){
            if(this.currentPage > 0 ){
                this.currentPage = this.currentPage - 1
            }
        },
        nextPageBtn(){
            if(this.members.length >=  10) //|| this.members.length <= (currentPage*10))
            {
                this.currentPage = this.currentPage + 1
            }
        },

        //設定當前的頁數
        // setPage:function(pages){
        //     if(pages <= 0 || pages >= this.totalPages ){
        //         return;
        //     }
        //     this.currentPage = pages;
        // } 
    },

    computed:{
        //監聽 currentPage 
        totalPages(){
            return Math.ceil(this.members.length / this.countOfPage);
        },
        pageStart: function(){
            return (this.currentPage - 1) * this.countOfPage;
        }
    },

    async mounted(){
        await this.GetMembers();
        await this.btnSwitch();
        await this.sendStatus();

    }
}).mount('#app');
