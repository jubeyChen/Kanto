// const ham = document.getElementById("ham");
// const cross = document.getElementById("cross");
// const menulist = document.querySelector("nav-bar");
// let open = false;
// ham.addEventListener("click", () => {
//     // console.log("aaa");
// menulist.classList.toggle("-openlist");
// ham.classList.toggle("-close");
// // console.log(menulist);
// // console.log(ham);
// cross.classList.toggle("-open");
// });


// 選單收合=============
$(document).ready(function(){
    $("#ham").click(function(){
            $(".nav-bar").toggleClass("-openlist");
            $("#ham").toggleClass("-close");
            $("#cross").toggleClass("-open");
        });
        $("#cross").click(function(){
            $(".nav-bar").toggleClass("-openlist");
            $("#ham").removeClass("-close");
            $("#cross").removeClass("-open");
        })
    });