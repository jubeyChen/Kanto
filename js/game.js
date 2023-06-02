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


// //  function stopAnimation() {
// //   if (document.getElementById(`result`)) {
// //     const num = Math.floor(Math.random() * 10);
// //     document.getElementById(`result`).classList.remove('is-play');
// //     document.getElementById(`result`).style.transform = `translateY(${-num * 10}%)`;
// //     document.getElementsByClassName('cont_principal')[num].style.display = 'block';
// //     document.getElementsByClassName('coupon')[num].style.display = 'block';

// //     if (prevCartTop) {
// //         prevCartTop.style.display = 'none';
// //       }
// //       prevCartTop = document.getElementsByClassName('cont_principal')[num];
// //       prevCartTop.style.display = 'block';
// //       coupon = document.getElementsByClassName('coupon')[num];
// //       coupon.style.display = 'block';
// //     // if (prevCartTop1) {
// //     //   prevCartTop1.style.display = 'none';
// //     // }
// //     // prevCartTop1 = document.getElementsByClassName('coupon')[num];
// //     // prevCartTop1.style.display = 'block';
// //   }



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
      prevCartTopVisible: false,
      couponVisible: false,
      prevCartTopRef: null,
      couponRef: null,
      c: 0,
      openSlider: false
    }
  },
  methods: {
    openTheSlider() {
      this.openSlider = true;
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
      this.gameWrapperVisible = false;
      this.prevCartTopVisible = false;
      this.couponVisible = false;
    },
    stopAnimation() {
      const num = Math.floor(Math.random() * 4);
      this.resultVisible = false;
      this.gameWrapperVisible = true;
      this.resultTransform = `translateY(${-num * 25}%)`;
      this.$refs.prevCartTop[num].style.display = "block";
      this.$refs.coupon[0].style.display = "block";

      if (this.prevCartTopRef) {
        this.prevCartTopRef.style.display = "none";
      }
      this.prevCartTopRef = this.$refs.prevCartTop[num];
      this.prevCartTopRef.style.display = "block";
      this.prevCartTopRef.classList.add("down2");
      this.couponRef = this.$refs.coupon[0];
      this.couponRef.style.display = "block";
      this.couponRef.classList.add("down");
    },
    funv() { },
    openClose() {
      const elements = this.$refs.prevCartTop;

      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = this.c % 2 === 0 ? "none" : "block";
      }

      this.c++;
    },
    copyText() {
      const range = document.createRange();
      const texts = this.$refs.text;
      range.selectNode(texts);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
    }

  },
  mounted() {
    const elements = this.$refs.prevCartTop;

    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
    }

  },
  computed: {

  },
  async mounted() {
    await this.getGame();
  }
}).mount("#app");