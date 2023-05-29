
const app = Vue.createApp({
    data(){
        return{
            members: [
                // {
                //     id: "TW00001",
                //     account: "redredred@gmail.com",
                //     fullName: "關東誒",
                //     gender: "女",
                //     phone: "0983-082-094",
                //     statusId: "1"
                // },
                // {
                //     id: "TW00001",
                //     account: "redredred@gmail.com",
                //     fullName: "關東誒",
                //     gender: "女",
                //     phone: "0983-082-094",
                //     statusId: "1"
                // },
                // {
                //     id: "TW00001",
                //     account: "redredred@gmail.com",
                //     fullName: "關東誒",
                //     gender: "女",
                //     phone: "0983-082-094",
                //     statusId: "1"
                // },
                // {
                //     id: "TW00001",
                //     account: "redredred@gmail.com",
                //     fullName: "關東誒",
                //     gender: "女",
                //     phone: "0983-082-094",
                //     statusId: "1"
                // },
                // {
                //     id: "TW00001",
                //     account: "redredred@gmail.com",
                //     fullName: "關東誒",
                //     gender: "女",
                //     phone: "0983-082-094",
                //     statusId: "1"
                // },
                // {
                //     id: "TW00001",
                //     account: "redredred@gmail.com",
                //     fullName: "關東誒",
                //     gender: "女",
                //     phone: "0983-082-094",
                //     statusId: "1"
                // },
                // {
                //     id: "TW00001",
                //     account: "redredred@gmail.com",
                //     fullName: "關東誒",
                //     gender: "女",
                //     phone: "0983-082-094",
                //     statusId: "1"
                // },
                // {
                //     id: "TW00001",
                //     account: "redredred@gmail.com",
                //     fullName: "關東誒",
                //     gender: "女",
                //     phone: "0983-082-094",
                //     statusId: "1"
                // },
                // {
                //     id: "TW00001",
                //     account: "redredred@gmail.com",
                //     fullName: "關東誒",
                //     gender: "女",
                //     phone: "0983-082-094",
                //     statusId: "1"
                // },
                // {
                //     id: "TW00001",
                //     account: "redredred@gmail.com",
                //     fullName: "關東誒",
                //     gender: "女",
                //     phone: "0983-082-094",
                //     statusId: "1"
                // }

            ]
        }
    },
    methods: {
        switchBtn(e){
            $(e.target).closest('tr').find('.switch-track').toggleClass('-off');
        },
        dosearch(str){}
    },

    mounted() {
        const self = this;
        axios.get("../php/backmembers.php")
          .then(function(response) {
            // console.log(response);
            
            const membersData = response.data;
            // console.log(membersData);
            // if(Count(data))

            for (let i = 0; i < membersData.length; i++) {
              const member = membersData[i];
            //   console.log(member);

              self.members.push({
                id: member.ID,
                fullName: member.FullName,
                gender:member.Gender,
                account: member.AccountID,
                phone: member.Phone,
              });
            }
          })

        .catch(function(error){
            alert("錯誤:" + error.status)

        });

        console.log(self.members);    
    }
}); app.mount('#app');


// ====搜尋欄===============
// $.ajax({
//     method:"GET",
//     url
// })
