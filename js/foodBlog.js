  //按鈕
  let btns = document.getElementsByClassName("btn-sec-l");
  // let currentbtn = 0;
  for(let i =0; i<btns.length; i++){
    btns[i].addEventListener("click", function(e){
      e.preventDefault();
      // console.log("aaa");
      //先移除全部的這樣才能切換
      for(let i = 0;i<btns.length; i++){
      btns[i].classList.remove("-active");
      };
      // console.log(this);
      this.classList.toggle("-active");
    })
  }