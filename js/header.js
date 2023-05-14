// const ham = document.getElementById("ham");
// const cross = document.getElementById("cross");
// const menulist = document.querySelector("nav-bar");


// ham.addEventListener("click", () => {
// menulist.classList.toggle('-openlist');
// ham.classList.toggle("-close");
// console.log(menulist);
// // console.log(ham);
// cross.classList.toggle("-open");
// });

$(document).ready(function(){
    let open = false;
    $("#ham").click(function(){
        // console.log("aaa");
        $(".nav-bar").toggleClass("-openlist");
        $("#ham").toggleClass("-close");
        $("#cross").toggleClass("-open");
        // console.log(open);
        open = !open;
    });
});