$(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:20,
        // nav:true,
        autoplay:true,
        autoplayTimeout:2000,
        responsive:{
        0:{
            items:1
        },
        500:{
            items:2
        },
        800:{
            items:3
        },
        1000:{
            items:3
        },
        1200:{
            items:4
        }

    }
})
});


let mapApp = Vue.createApp({
    data(){
        return{
            current_show:'tokyo',
            all_area:{
                //物件中的屬性就是area
                'gunma':{
                    img:[
                        'image/index/index23.jpg',
                        'image/index/index25.jpg',
                        'image/index/index24.jpg'
                    ],
                    title:'群馬',
                    content:'大自然樂園，擁有健行步道、滑雪場以及溫泉，讓身心獲得療癒舒緩。'

                },
                'ibaraki':{
                    img:[
                        'image/index/index26.jpg',
                        'image/index/index27.jpg',
                        'image/index/index28.jpg'
                    ],
                    title:'茨城',
                    content:'大自然樂園，擁有健行步道、滑雪場以及溫泉，讓身心獲得療癒舒緩。'

                },
                'saitama':{
                    img:[
                        'image/index/index29.jpg',
                        'image/index/index30.jpg',
                        'image/index/index31.jpg'
                    ],
                    title:'埼玉',
                    content:'擁有江戶時代的歷史風貌，各種獨特的戶外探險活動等你來一探究竟!'
                },
                'tochigi':{
                    img:[
                        'image/index/index32.jpg',
                        'image/index/index33.jpg',
                        'image/index/index34.jpg'
                    ],
                    title:'栃木',
                    content:'壯觀的神社與佛寺景色如畫，同時享受泡湯與河川之旅。'
                },
                'chiba':{
                    img:[
                        'image/index/index35.jpg',
                        'image/index/index36.jpg',
                        'image/index/index37.jpg'
                    ],
                    title:'千葉',
                    content:' 海灘活動到山間步行的古村，還有主題樂園及特惠商城，一應俱全。'
                },
                'tokyo':{
                    img:[
                        'image/index/index38.jpg',
                        'image/index/index39.jpg',
                        'image/index/index40.jpg'
                    ],
                    title:'東京',
                    content:'融合了未來主義與歷史氣息的城市，擁有多元的風貌並充滿可能性。'
                },
                'kanagawa':{
                    img:[
                        'image/index/index41.jpg',
                        'image/index/index42.jpg',
                        'image/index/index43.jpg'
                    ],
                    title:'神奈川',
                    content:'海灣風景、國際港市、禪寺、自然美景...擁有國際化的魅力。'
                },
            },
        }
    },
    methods:{
        show(area){
            this.current_show = area
        }
    }

}); mapApp.mount("#mapApp");
