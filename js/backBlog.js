const app = Vue.createApp({
    data() {
        return {
            backBlog: [],
            currentNum: 10,
            sortedBlog: [],
            startNum: 0,
            slicedBlog: [],
            searchType: '',
            searchText: '',
            Checked: []
           
        }
    },
    methods: {
        async getBlog() {
            await axios.post('../php/backBlog.php')
                .then(response => {
                    this.backBlog = response.data;
                    console.log(this.backBlog);

                    this.sortedBlog = this.backBlog;
                    this.doSlice();
                    this.checkCurrentNum();
                })
                .catch(error => {
                    console.log(error);
                    alert('取得失敗，請您稍後再試');
                });
        },
        checkDetail(e) {
            let id = e.target.getAttribute('data-id')
            location.href = 'backBlogDetail.html?id=' + id
        },
        createNew() {
            location.href = 'makeNewBlog.html'
        },
        doSlice() {
            this.slicedBlog = this.sortedBlog.slice(this.startNum, this.startNum + 10);
        },
        checkCurrentNum() {
            if (this.sortedBlog.length < 10 || this.startNum + 10 > this.sortedBlog.length) {
                this.currentNum = this.sortedBlog.length;

            }
            else if (this.sortedBlog.length > 10 && this.startNum + 10 < this.sortedBlog.length) {
                this.currentNum = this.startNum + 10;

            }
        },
        addStartNum() {
            if (this.startNum + 10 < this.sortedBlog.length) {
                this.startNum += 10;
                this.doSlice();
                this.checkCurrentNum();

            }
        },
        backStartNum() {
            if (this.startNum >= 10) {
                this.startNum -= 10;
                this.doSlice();
                this.checkCurrentNum();
            }
        },
        doSearch() {
            this.startNum = 0;
            this.currentNum = 10;
            // console.log(this.backBlog);
            this.sortedBlog = this.backBlog.filter(e => e[this.searchType].toString().includes(this.searchText));
            // this.sortedBlog = this.backBlog.filter(e => console.log(e[this.searchType]));

            this.doSlice();
            this.checkCurrentNum();
        },
        //刪除資料表
        deleteBlog() {
            // console.log(this.slicedBlog[0].ID)
            // let checkbox = document.querySelectorAll('.slice:checked');
            // console.log(checkbox);

            // console.log(this.delete_array);
            // for (let i = 0; i < checkbox.length; i++) {
            //     this.Checked.push(checkbox[i].value);
            //     // console.log(checkbox[i].value);
            // }
            console.log(this.Checked);
            let checkedData = new FormData();
            checkedData.append('data', JSON.stringify(this.Checked));
            console.log(checkedData);


            let checkDelete = confirm('確定執行刪除?')
            if (checkDelete) {
                axios.post('../php/deleteBlog.php', checkedData)
                    .then(response => {
                        console.log(response.data);
                        if(response.data === 'done'){
                            alert('刪除成功');
                            window.location.href = './backBlog.html';
                        }else{
                            alert('刪除失敗');
                        }
                        
                        
                    })
                    .catch(error => {
                        console.log(error);
                        // alert('連線失敗，請稍後重試');
                    });
            }

        }

    },
    mounted() {
        this.getBlog();
    }

});

import BackStageLogOutBtn from "./component/BackStageLogOutBtn.js";
app.component('backStageLogOutBtn', BackStageLogOutBtn);

app.mount('#app');