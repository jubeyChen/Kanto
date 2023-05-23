Vue.createApp({
    data(){
        return{
            twd:1000,
            jpyRate:0  //是數字
        }
    },
    computed:{
        jpy:{
            //修改twd 回傳jpy
            get(){
                return Number.parseFloat(Number(this.twd)/Number(this.jpyRate)).toFixed(2);
            },
            //修改jpy 回傳twd
            set(val){
                this.twd = Number.parseFloat(Number(val)* Number(this.jpyRate)).toFixed(0);
            }
        }
    },
    mounted(){
        //發出請求
        const apikey = "9ae79f44f125054717ba39ea";
        // const url = `https://v6.exchangerate-api.com/v6/${apikey}/pair/JPY/TWD"`;
        axios.get(url)
        .then((response)=>{
            console.log(response);  
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
}).mount("#exchangeApp");