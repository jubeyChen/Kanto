function startAnimation() {
    if (document.getElementById(`result`)) {
      document.getElementById(`result`).classList.add('is-play');
      document.getElementById(`result`).style.transform = 'none';
    }
  }

 let prevCartTop;
 function stopAnimation() {
  if (document.getElementById(`result`)) {
    const num = Math.floor(Math.random() * 10);
    document.getElementById(`result`).classList.remove('is-play');
    document.getElementById(`result`).style.transform = `translateY(${-num * 10}%)`;
    document.getElementsByClassName('cont_principal')[num].style.display = 'block';
    document.getElementsByClassName('coupon')[num].style.display = 'block';
    
    if (prevCartTop) {
        prevCartTop.style.display = 'none';
      }
      prevCartTop = document.getElementsByClassName('cont_principal')[num];
      prevCartTop.style.display = 'block';
  }
  
}


window.onload = function () {
  document.querySelector('.cont_modal').className = "cont_modal";
}
  
let c = 0;
function open_close() {
  document.querySelector('.cont_modal').className =
    c % 2 == 0 ? "cont_modal cont_modal_active" : "cont_modal";
  c++;
}

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
