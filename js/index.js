$(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:20,
        // nav:true,
        autoplay:true,
        autoplayTimeout:2000,
        responsive:{
        0:{
            item:2
        },
        800:{
            item:3
        },
        2000:{
            item:5
        }
    }
})
})