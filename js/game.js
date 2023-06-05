// function startAnimation() {
//     if (document.getElementById(`result`)) {
//       document.getElementById(`result`).classList.add('is-play');
//       document.getElementById(`result`).style.transform = 'none';

//       gameWrapper.classList.remove('on');

//     }

//     if (prevCartTop){
//       prevCartTop.style.display = 'none';
//       coupon.classList.remove('down2');
//     }
//     if(coupon){
//       coupon.style.display = 'none';
//       coupon.classList.remove('down');
//     }
//     // prevCartTop = document.getElementsByClassName('cont_principal')[num];
//     // prevCartTop.style.display = 'block';


//   }

//  let prevCartTop;
//  let coupon;
// //  let result = document.getElementById('result');
//  const gameWrapper = document.querySelector('#game_wapper');

//  function stopAnimation() {
//   if (document.getElementById(`result`)) {
//     const num = Math.floor(Math.random() * 4);
//     result.classList.remove('is-play');
//     gameWrapper.classList.add('on');
//     result.style.transform = `translateY(${-num * 25}%)`;
//     document.getElementsByClassName('cont_principal')[num].style.display = 'block';
//     document.getElementsByClassName('coupon')[0].style.display = 'block';


//     if (prevCartTop) {
//         prevCartTop.style.display = 'none';
//       }
//     if (coupon) {
//       coupon.style.display = 'none';

//     }
//       prevCartTop = document.getElementsByClassName('cont_principal')[num];
//       prevCartTop.style.display = 'block';
//       prevCartTop.classList.add('down2');
//       coupon = document.getElementsByClassName('coupon')[0];
//       coupon.style.display = 'block';
//       coupon.classList.add('down');

//   }



// }

// // ----------
// // window.onload = function () {
// //   document.querySelector('.cont_modal').className = "cont_modal";
// // }

// // let c = 0;
// // function open_close() {
// //   document.querySelector('.cont_modal').className =
// //     c % 2 == 0 ? "cont_modal cont_modal_active" : "cont_modal";
// //   c++;
// // }
// // ---------

// window.onload = function () {
//   const elements = document.getElementsByClassName('cont_modal');

//   for (let i = 0; i < elements.length; i++) {
//     elements[i].className = "cont_modal cont_modal_active";
//   }
// }

// let c = 0;

// function open_close() {
//   const elements = document.getElementsByClassName('cont_modal');

//   for (let i = 0; i < elements.length; i++) {
//     elements[i].className = c % 2 === 0 ? "cont_modal " : "cont_modal cont_modal_active";
//   }

//   c++;
// }


// // ------
// const select = (DOM) => document.querySelector(DOM);

// select('#coupon_btn').addEventListener('click', (e) => {
//   // 建立 Range 物件
//   const range = document.createRange();
//   const texts = select('#text');
//   range.selectNode(texts);
//   // 取得 Selection 物件
//   const selection = window.getSelection();
//   selection.removeAllRanges();
//   selection.addRange(range);
//   document.execCommand("copy");
//   selection.removeAllRanges();
// })

Vue.createApp({
  data() {
    return {
      game: [],
      resultVisible: false,
      resultId: "result",
      resultTransform: "none",
      gameWrapperVisible: false,
      c: 0,
      openSlider: false,
      img: "image/productPage/",
      prevCartTop: null,
      coupon: null,
      gameWrapper: null,
      num: null,
      showModal: false,

    }
  },
  methods: {

    openTheSlider() {
      this.openSlider = true;
      if(window.innerWidth > 414 ){
        $('html,body').animate({ scrollTop: '250px' }, 1000);
      }
      
      // return false;
      
    },
    closeSlider() {
      this.openSlider = false;
    },
    async getGame() {
      await axios.post('../php/game.php')
        .then(response => {
          this.game = response.data;
          console.log(this.game)
        })
        .catch(error => {
          console.log(error);
          alert('取得失敗，請您稍後再試');
        });
    },
    startAnimation() {
      this.resultVisible = true;
      this.resultTransform = "none";
      this.gameWrapperVisible = false; // 將 gameWrapperVisible 設置為 true
      // this.couponRef= false;
      if(this.$refs.prevCartTop[this.num]&&this.$refs.coupon[this.num]){
        this.$refs.prevCartTop[this.num].style.display = "none";
        this.$refs.coupon[this.num].style.display = "none";
      }
      if(window.innerWidth > 414 ){
        $('html,body').animate({ scrollTop: '250px' }, 1000);
      }
      
      return false;
    
    },
    stopAnimation() {
      // console.log("dddd");
      this.num = Math.floor(Math.random() * 10);
      this.resultVisible = false;
      this.gameWrapperVisible = true;
      this.resultTransform = `translateY(${-this.num * 10}%)`;
      this.$refs.prevCartTop[this.num].style.display = "block";
      this.$refs.coupon[this.num].style.display = "block";
      if (this.prevCartTopRef&&this.couponRef) {
        this.prevCartTopRef.style.display = "none";
        this.couponRef.style.display = "none";
      }
      this.prevCartTopRef = this.$refs.prevCartTop[this.num];
      this.prevCartTopRef.style.display = "block";
      this.prevCartTopRef.classList.add("down2");
      this.couponRef = this.$refs.coupon[this.num];
      this.couponRef.style.display = "block";
      this.couponRef.classList.add("down");
      if(window.innerWidth > 414 ){
        $('html,body').animate({ scrollTop: '460px' }, 1000);
      }
      
      return false;



    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    // openClose() {
    //   const elements = this.$refs.prevCartTop;

    //   for (let i = 0; i < elements.length; i++) {
    //     elements[i].style.display = this.c % 2 === 0 ? "cont_modal cont_modal_active" : "cont_modal";
    //   }

    //   this.c++;
    //   console.log('aaa');
    //   // this.contModal = this.$refs.cont_modal;
    // },
    copyText(code) {
    

      navigator.clipboard.writeText(code)
        .then(() => {
          console.log('文字已複製到剪貼簿');
        })
        .catch((error) => {
          console.error('複製失敗:', error);
        });
    }

  },
  computed: {
    modalClasses() {
      return {
        'cont_modal': true,
        'cont_modal_active': !this.showModal
      };
    }
  },
  async mounted() {
    await this.getGame();
    this.prevCartTop = document.getElementsByClassName('cont_principal')[0];
    this.coupon = document.getElementsByClassName('coupon')[0];
    this.gameWrapper = document.querySelector('#game_wapper');
  }
}).mount("#app");