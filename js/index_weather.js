Vue.createApp({
    data(){
        return{
            days:[
              
            ],
        }
    },
    mounted: function(){
        //在這裡先設定this的變數 才會是vue中的this
        const self = this
        //發送請求 次數有限記得註解
        // axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=35.68&lon=139.69&units=metric&cnt=40&appid=6e5575f4cdda3fe4367a81edf66e2bf7")
        .then(function(response){
            console.log(response);
            // console.log(data);
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
}).mount("#weatherApp");