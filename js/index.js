// =================行程資料=================
let indexContent = Vue.createApp({
    data() {
        return {
            products: [],
            roomPics: {},
            articles: {}

        }
    },
    methods: {
        getContent() {
            axios.get("../php/indexContent.php")
                .then(response => {
                    // console.log(response.data.data01);
                    this.products = response.data.data01;
                    this.roomPics = response.data.data02;
                    // console.log(response.data.data02[0].Image)
                    this.articles = response.data.data03;
                    // console.log(response.data);

                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getContent();
    }
}); indexContent.mount("#indexVueContent")



// =================地圖=================
let mapApp = Vue.createApp({
    data() {
        return {
            current_show: 'tokyo',
            all_area: {
                //物件中的屬性就是area
                'gunma': {
                    img: [
                        'image/index/index23.jpg',
                        'image/index/index25.jpg',
                        'image/index/index24.jpg'
                    ],
                    title: '群馬',
                    content: '大自然樂園，擁有健行步道、滑雪場以及溫泉，讓身心獲得療癒舒緩。'

                },
                'ibaraki': {
                    img: [
                        'image/index/index26.jpg',
                        'image/index/index27.jpg',
                        'image/index/index28.jpg'
                    ],
                    title: '茨城',
                    content: '大自然樂園，擁有健行步道、滑雪場以及溫泉，讓身心獲得療癒舒緩。'

                },
                'saitama': {
                    img: [
                        'image/index/index29.jpg',
                        'image/index/index30.jpg',
                        'image/index/index31.jpg'
                    ],
                    title: '埼玉',
                    content: '擁有江戶時代的歷史風貌，各種獨特的戶外探險活動等你來一探究竟!'
                },
                'tochigi': {
                    img: [
                        'image/index/index32.jpg',
                        'image/index/index33.jpg',
                        'image/index/index34.jpg'
                    ],
                    title: '栃木',
                    content: '壯觀的神社與佛寺景色如畫，同時享受泡湯與河川之旅。'
                },
                'chiba': {
                    img: [
                        'image/index/index35.jpg',
                        'image/index/index36.jpg',
                        'image/index/index37.jpg'
                    ],
                    title: '千葉',
                    content: ' 海灘活動到山間步行的古村，還有主題樂園及特惠商城，一應俱全。'
                },
                'tokyo': {
                    img: [
                        'image/index/index38.jpg',
                        'image/index/index39.jpg',
                        'image/index/index40.jpg'
                    ],
                    title: '東京',
                    content: '融合了未來主義與歷史氣息的城市，擁有多元的風貌並充滿可能性。'
                },
                'kanagawa': {
                    img: [
                        'image/index/index41.jpg',
                        'image/index/index42.jpg',
                        'image/index/index43.jpg'
                    ],
                    title: '神奈川',
                    content: '海灣風景、國際港市、禪寺、自然美景...擁有國際化的魅力。'
                },
            },
        }
    },
    methods: {
        show(area) {
            this.current_show = area
        }
    }

}); mapApp.mount("#mapApp");

// =================天氣=================
let weatherapp = Vue.createApp({
    data() {
        return {
            days: [

            ]
        }
    },
    mounted: function(){
        //在這裡先設定this的變數 才會是vue中的this
        const self = this
        //發送請求 次數有限記得註解
        axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=35.68&lon=139.69&units=metric&cnt=40&appid=6e5575f4cdda3fe4367a81edf66e2bf7")
        .then(function(response){
            // console.log(response);
                    // console.log(response.data.list[0]);
                    const all_weather = response.data.list

                    for (let i = 0; i < 40; i++) {
                        if(i % 8 == 0){
                            const current = all_weather[i];

                            // 只要保留日期 用slice(5, 10) 從索引 5 到 10 之間截取字串去除年份和時間 長度依樣才能用
                            const date_str = current.dt_txt
                            const dateOnly = date_str.slice(6,10);
                            const monthDay = dateOnly.replace("-", "/");

                            // 把溫度變整數 四捨五入
                            const min_temp = Math.round(current.main.temp_min)
                            const max_temp = Math.round(current.main.temp_max)
                            // console.log(min_temp)


                            // icon要跑迴圈=======================
                            for(let j = 0; j < current.weather.length; j++){
                            let iconId = current.weather[j].icon;
                            // console.log(iconId);
                            let icon =  "https://openweathermap.org/img/wn/" + iconId + "@2x.png";

                                // 把這串資料push進days的空陣列
                                self.days.push(
                                    {
                                        date:monthDay,
                                        icon:icon,
                                        min_temp:min_temp,
                                        max_temp:max_temp
                                    }
                                )
                            }
                        }
                    }
                    console.log(self.days);
        })
    }
}); weatherapp.mount("#weatherApp");


// // =================匯率=================

let exchangeapp = Vue.createApp({
    data() {
        return {
            twd: 1000,
            jpyRate: 0  //是數字
        }
    },
    computed: {
        jpy: {
            //修改twd 回傳jpy
            get() {
                return Number.parseFloat(Number(this.twd) / Number(this.jpyRate)).toFixed(2);
            },
            //修改jpy 回傳twd
            set(val) {
                this.twd = Number.parseFloat(Number(val) * Number(this.jpyRate)).toFixed(0);
            }
        }
    },
    mounted(){
        // 發出請求
        axios.get("https://v6.exchangerate-api.com/v6/9ae79f44f125054717ba39ea/pair/JPY/TWD")
        .then((response)=>{
            //console.log(response);  
            //匯率的字串轉成浮點數 0.2228
            this.jpyRate = Number.parseFloat(response.data.conversion_rate);
            //因為jpyRate在mounted定義 computed無法讀取 因此需要再定義
            //this.$set(設定屬性的對象, 屬性名稱, 屬性值)
            this.$set(this, "jpyRate" , Number.parseFloat(response.data.conversion_rate));
        })
        .catch(err =>{
            console.log(err.response);
        })
    }
}); exchangeapp.mount("#exchangeApp");