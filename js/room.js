// ===============地圖滑出===========================

// const spots = document.querySelectorAll(".ai-check-in");
// //map加上data- 讓spot可以個別對應到map
// for (let i = 0; i < spots.length; i++) {
//   spots[i].addEventListener("click", function () {
//     const mapId = this.dataset.map;
//     // console.log(this);
//     const map = document.getElementById(mapId);
//     map.classList.toggle("-open");
//   });
// };



// ===============照片切換===========================

const images = ["image/roomBlog/mid3.jpg", "image/roomBlog/mid4.jpg", "image/roomBlog/mid5.jpg", "image/roomBlog/mid6.jpg"];
//目前展示圖片索引值
let currentIndex = 0;

setInterval(switchImage, 2000);

function switchImage() {
  const currentImage = document.querySelector(".image.active");
  //將目前圖片隱藏
  currentImage.classList.remove("active");
  //更換目前展示圖片索引
  currentIndex = (currentIndex + 1) % images.length;
  //找到class是image並且有data-index屬性值為索引值的元素
  const nextImage = document.querySelector(`.image[data-index="${currentIndex}"]`);
  nextImage.classList.add("active");
};


var value = document.getElementById("region").getAttribute('value');
console.log(value)
//按鈕
// let btns = document.getElementsByClassName("btn-sec-l");
// // let currentbtn = 0;
// for (let i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function (e) {
//     e.preventDefault();
//     // console.log("aaa");
//     //先移除全部的這樣才能切換
//     for (let i = 0; i < btns.length; i++) {
//       btns[i].classList.remove("-active");
//     };
//     // console.log(this);
//     this.classList.toggle("-active");
//   })
// }


// ----------------------vue框架----------------------//

const app = Vue.createApp({
  data() {
    return {
      roomBlogs: [], // 全部的房間資料
      selectedRegion: '1', // 目前選擇的地區（預設為東京都）
      currentPage: 1, // 目前的分頁
      perPage: 6, // 每頁顯示的資料數量


    }
  },

  computed: {
    filteredRoomBlogs() {
      // 根據選擇的地區篩選資料
      if (this.selectedRegion === '1') {
        return this.roomBlogs.slice(0, 12);
      } else if (this.selectedRegion === '2') {
        return this.roomBlogs.slice(12, 24);
      }
      return [];
    },
    totalPages() {
      // 計算總分頁數
      return Math.ceil(this.filteredRoomBlogs.length / this.perPage);
    },
    paginatedRoomBlogs() {
      // 根據目前分頁數和每頁顯示的資料數量生成分頁資料
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.filteredRoomBlogs.slice(startIndex, endIndex);
    },
    selectedRegionName() {
      // 返回根據選擇的地區值對應的地名
      if (this.selectedRegion === '1') {
        return '東京都';
      } else if (this.selectedRegion === '2') {
        return '神奈川';
      }
      return '';
    },

  },

  methods: {

    toggleMap(mapId) {
      const map = document.getElementById(mapId);
      map.classList.toggle("-open");
    },

    handleClick(event) {
      this.selectedRegion = event.target.getAttribute('value');
      console.log(this.selectedRegion)
      this.currentPage = 1; // 在切換地區時重置分頁為第一頁
    },
    changePage(page) {
      this.currentPage = page;
    },

  },
  mounted() {

    axios.get('../php/roomBlog.php')
      .then(response => {
        console.log(response)
        if (response.data && response.data.roomblog) {
          if (Array.isArray(response.data.roomblog)) {
            this.roomBlogs = response.data.roomblog
            console.log(this.roomBlogs)
          }
        }

      })
      .catch((error) => {
        console.log(error);
      })





    let btns = document.getElementsByClassName("btn-sec-l");
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (e) {
        e.preventDefault();
        for (let j = 0; j < btns.length; j++) {
          btns[j].classList.remove("-active");
        }
        this.classList.toggle("-active");
      });
    }
  }

});
app.mount('#rbg');
