const app = Vue.createApp({
    data(){
        return{
            backBlog: [],
            currentNum: 10,
            sortedBlog:[],
            startNum: 0,
            slicedBlog:[],
            searchType: '',
            searchText: ''
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
        checkDetail(e){
            let id = e.target.getAttribute('data-id')
            location.href= 'backBlogDetail.html?id=' + id
        },
        createNew(){
            location.href='makeNewBlog.html'
        },
        doSlice(){
            this.slicedBlog = this.sortedBlog.slice(this.startNum, this.startNum + 10);
        },
        checkCurrentNum(){
            if(this.sortedBlog.length < 10 || this.startNum + 10 > this.sortedBlog.length){
                this.currentNum = this.sortedBlog.length;

            }            
            else if(this.sortedBlog.length > 10 && this.startNum + 10 < this.sortedBlog.length){
                this.currentNum = this.startNum + 10;

            }
        },
        addStartNum(){
            if(this.startNum + 10 < this.sortedBlog.length){
                this.startNum += 10;
                this.doSlice();
                this.checkCurrentNum();

            }
        },
        backStartNum(){
            if(this.startNum >= 10){
                this.startNum -= 10;
                this.doSlice();
                this.checkCurrentNum();
            }
        },
        doSearch(){
            this.startNum = 0;
            this.currentNum = 10;
            // console.log(this.backBlog);
            this.sortedBlog = this.backBlog.filter(e => e[this.searchType].toString().includes(this.searchText));
            // this.sortedBlog = this.backBlog.filter(e => console.log(e[this.searchType]));
            
            this.doSlice();
            this.checkCurrentNum();
        }
    },
    mounted(){
        this.getBlog();
    }

});

app.mount('#app');