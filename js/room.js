// ===============地圖滑出===========================

const spots = document.querySelectorAll(".ai-check-in");
//map加上data- 讓spot可以個別對應到map
for(let i = 0; i<spots.length; i++){
  spots[i].addEventListener("click", function(){
    const mapId = this.dataset.map;
    // console.log(this);
    const map = document.getElementById(mapId);
    map.classList.toggle("-open");
    });
  };



// ===============照片切換===========================

  const images = ["image/roomBlog/mid3.jpg", "image/roomBlog/mid4.jpg","image/roomBlog/mid5.jpg","image/roomBlog/mid6.jpg"];
  //目前展示圖片索引值
  let currentIndex = 0;
  
  setInterval(switchImage, 2000);

  function switchImage(){
    const currentImage = document.querySelector(".image.active");
    //將目前圖片隱藏
    currentImage.classList.remove("active");
    //更換目前展示圖片索引
    currentIndex = (currentIndex + 1) % images.length;
    //找到class是image並且有data-index屬性值為索引值的元素
    const nextImage = document.querySelector(`.image[data-index="${currentIndex}"]`);
    nextImage.classList.add("active");
  };




