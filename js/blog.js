const blog_btn = document.querySelectorAll('.blog_btn');

for(let i = 0;i < blog_btn.length; i++){
    blog_btn[i].addEventListener("click",function(e){
        for(let i = 0;i < blog_btn.length; i++){
            blog_btn[i].classList.remove("-active");
        }
        blog_btn[i].classList.add("-active");
    })
}