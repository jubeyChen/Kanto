function startAnimation() {
    if (document.getElementById(`result`)) {
      document.getElementById(`result`).classList.add('is-play');
      document.getElementById(`result`).style.transform = 'none';
      
      gameWrapper.classList.remove('on');
      
    }
    
    if (prevCartTop){
      prevCartTop.style.display = 'none';
      coupon.classList.remove('down2');
    }
    if(coupon){
      coupon.style.display = 'none';
      coupon.classList.remove('down');
    }
    // prevCartTop = document.getElementsByClassName('cont_principal')[num];
    // prevCartTop.style.display = 'block';

    
  }

 let prevCartTop;
 let coupon;
//  let result = document.getElementById('result');
 const gameWrapper = document.querySelector('#game_wapper');

 function stopAnimation() {
  if (document.getElementById(`result`)) {
    const num = Math.floor(Math.random() * 4);
    result.classList.remove('is-play');
    gameWrapper.classList.add('on');
    result.style.transform = `translateY(${-num * 25}%)`;
    document.getElementsByClassName('cont_principal')[num].style.display = 'block';
    document.getElementsByClassName('coupon')[0].style.display = 'block';
    

    if (prevCartTop) {
        prevCartTop.style.display = 'none';
      }
    if (coupon) {
      coupon.style.display = 'none';
      
    }
      prevCartTop = document.getElementsByClassName('cont_principal')[num];
      prevCartTop.style.display = 'block';
      prevCartTop.classList.add('down2');
      coupon = document.getElementsByClassName('coupon')[0];
      coupon.style.display = 'block';
      coupon.classList.add('down');

  }


//  function stopAnimation() {
//   if (document.getElementById(`result`)) {
//     const num = Math.floor(Math.random() * 10);
//     document.getElementById(`result`).classList.remove('is-play');
//     document.getElementById(`result`).style.transform = `translateY(${-num * 10}%)`;
//     document.getElementsByClassName('cont_principal')[num].style.display = 'block';
//     document.getElementsByClassName('coupon')[num].style.display = 'block';
    
//     if (prevCartTop) {
//         prevCartTop.style.display = 'none';
//       }
//       prevCartTop = document.getElementsByClassName('cont_principal')[num];
//       prevCartTop.style.display = 'block';
//       coupon = document.getElementsByClassName('coupon')[num];
//       coupon.style.display = 'block';
//     // if (prevCartTop1) {
//     //   prevCartTop1.style.display = 'none';
//     // }
//     // prevCartTop1 = document.getElementsByClassName('coupon')[num];
//     // prevCartTop1.style.display = 'block';
//   }
  
  
  
}

// ----------
// window.onload = function () {
//   document.querySelector('.cont_modal').className = "cont_modal";
// }
  
// let c = 0;
// function open_close() {
//   document.querySelector('.cont_modal').className =
//     c % 2 == 0 ? "cont_modal cont_modal_active" : "cont_modal";
//   c++;
// }
// ---------

window.onload = function () {
  const elements = document.getElementsByClassName('cont_modal');

  for (let i = 0; i < elements.length; i++) {
    elements[i].className = "cont_modal";
  }
}

let c = 0;

function open_close() {
  const elements = document.getElementsByClassName('cont_modal');

  for (let i = 0; i < elements.length; i++) {
    elements[i].className = c % 2 === 0 ? "cont_modal cont_modal_active" : "cont_modal";
  }

  c++;
}


// ------
const select = (DOM) => document.querySelector(DOM);

select('#coupon_btn').addEventListener('click', (e) => {
  // 建立 Range 物件
  const range = document.createRange();
  const texts = select('#text');
  range.selectNode(texts);
  // 取得 Selection 物件
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  selection.removeAllRanges();
})
