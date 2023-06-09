export default{    
    data(){
        return{}
    },

    methods: {
        logOut(){
            let logOut = confirm('確定登出？')
            if(logOut == true){
                // console.log('aaa'); 
                window.location = '../php/BackStageLogOut.php'
            }
        }

    },

    template: `
        <li><a @click.prevent="logOut" href="" class="btn-pri-l">登出</a></li>
    `
}
