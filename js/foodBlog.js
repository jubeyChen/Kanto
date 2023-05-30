


  Vue.createApp({
    data(){
      return{
        intro:[],
        selectCity:"東京都",
        img:"image/foodBlog/"
      }
    },
    methods:{

    },
    computed:{
      filterCity(){
        if(this.selectCity === '東京都'){
          return this.intro.filter(
            (city) => city.title === '東京都'
          );
        }else{
          return this.intro.filter(
            (city) => city.title === '神奈川縣'
          );
        }
      }
    },
    mounted(){
      fetch("../image/foodBlog.json")
      .then(response => response.json())
      .then(data1 => {
        this.intro = data1;
        console.log(this.intro);

      })
    }
  }).mount("#app");