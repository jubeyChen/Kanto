


Vue.createApp({
  data() {
    return {
      intro: [],
      selectCity: "東京都",
      img: "image/foodBlog/",
      foodBlog: [],
      Region: ['東京', '神奈川', '埼玉', '茨城', '千葉', '群馬', '栃木'],
      activeIndex: null,

      city: {},
      //分頁寫法
      currentPage: 1, //當前頁數
      itemsPerPage: 6 //每頁顯示的資料量

    }
  },
  methods: {
    async getFoodBlog(index) {
      await axios.post('../php/foodBlog.php')
        .then(response => {
          for (let index = 0; index < response.data.length; index++) {
            // const element = response.data[index];
            response.data[index].show_map = false
          }
          this.foodBlog = response.data;
          console.log(this.foodBlog);

          if (this.activeIndex !== null) {
            this.foodBlog = this.foodBlog.filter((item) => {
              //console.log(this.intro);
              return item.RegionName
                == this.Region[index];
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert('取得失敗，請您稍後再試');
        });
    },
    //按鈕active
    handleClick(index) {
      //這裡的activeIndex 是數字
      this.activeIndex = index;
      console.log(this.Region[index]);

      console.log(this.intro);
      this.city = this.intro[index];


      this.getFoodBlog(index);
      this.currentPage = 1; // 重置當前頁數

    },
    goToPage(page) {
      this.currentPage = page;
    }
  },
  computed: {
    // filterCity() {
    //   if (this.selectCity === '東京都') {
    //     return this.intro.filter(
    //       (city) => city.title === '東京都'
    //     );
    //   } else {
    //     return this.intro.filter(
    //       (city) => city.title === '神奈川縣'
    //     );
    //   }
    // },
    //html迴圈的部分 原先是跑data現在要跑這個函式
    paginatedActivities() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      //data.slice() 是 JavaScript 中陣列的方法，用於從原陣列中取出指定範圍的元素，並返回一個新的陣列。
      return this.foodBlog.slice(startIndex, endIndex);
    },
    //計算會有幾個分頁按鈕會被渲染出來
    totalPages() {
      return Math.ceil(this.foodBlog.length / this.itemsPerPage);
    }
  },
  async mounted() {
    await this.getFoodBlog();
    fetch("../image/foodBlog.json")
      .then(response => response.json())
      .then(data1 => {
        this.intro = data1;
        //console.log(this.intro);
        this.city = data1[0];
      })

  },
  async created() {
    await this.getFoodBlog();
    await this.handleClick(0);
  }
}).mount("#app");