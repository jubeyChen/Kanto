// $(function(){
//     $.ajax({
//         url:"https://api.openweathermap.org/data/2.5/forecast?lat=35.68&lon=139.69&appid=6e5575f4cdda3fe4367a81edf66e2bf7",
//         type:"GET",
//         dataType:"json",

        


//     })
// })

//五天

Vue.createApp({
    data(){
        return{
            days:[
              
            ],
            // days:{
            //     "day1":{
            //         date:"5/22",
            //         icon:"",
            //         min_temp:20,
            //         max_temp:22
            //     },
            //     "day2":{
            //         date:"",
            //         icon:"",
            //         min_temp:"",
            //         max_temp:""
            //     },
            //     "day3":{
            //         date:"",
            //         icon:"",
            //         min_temp:"",
            //         max_temp:""
            //     },
            //     "day4":{
            //         date:"",
            //         icon:"",
            //         min_temp:"",
            //         max_temp:""
            //     },
            //     "day5":{
            //         date:"",
            //         icon:"",
            //         min_temp:"",
            //         max_temp:""
            //     }
            // }
        }
    },
    mounted: function(){
        const self = this
        // axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=35.68&lon=139.69&units=metric&cnt=40&appid=6e5575f4cdda3fe4367a81edf66e2bf7")
        .then(function(response){
            console.log(response);
            // console.log(data);

                    console.log(response.data.list[0]);

                    const all_weather = response.data.list
                    
                    for (let index = 0; index < 40; index++) {
                        if(index % 8 == 0){
                            const current = all_weather[index];
                            //把日期去除時間
                            const date_str = current.dt_txt
                            const onlyDate = new Date(date_str)
                            //使用toISOString()方法將日期物件轉換為ISO 8601格式的字串，並使用split('T')[0]獲取日期部分
                            const dateString = onlyDate.toISOString().split('T')[0];
                            // console.log(dateString);

                            // 把溫度變整數
                            const min_temp = Math.floor(current.main.temp_min)
                            const max_temp = Math.floor(current.main.temp_max)
                            // console.log(min_temp)
                            


                            self.days.push(
                                {
                                    date:dateString,
                                    icon:current.weather[0].icon,
                                    min_temp:min_temp,
                                    max_temp:max_temp
                                }
                            )
                        }
                  
                        
                    }

                    console.log(self.days);

                    
                    // self.days.day1.date = response.data.list[0].dt_txt;
                    // self.days.day1.icon = response.data.list[0].weather[0].icon;
                    // self.days.day1.min_temp = response.data.list[0].main.temp_min;
                    // self.days.day1.max_temp = response.data.list[0].main.temp_max;

                    
                    // console.log(response.data.list[0].main.temp_min)
                    // console.log(response.data.list[0].weather[0].icon);
         
        })
    }
}).mount("#weatherApp");