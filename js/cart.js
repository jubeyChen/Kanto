
const app = Vue.createApp({
    data() {
        return {
            isSessionValid: '',
            isProductInfo: [],
            shoppingList: [],
            isTotal: 0,
            // selectAll: false, // Add selectAll property
        };
    },
    created(){
        this.shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
        // console.log(this.shoppingList);
        this.calculateTotal(); // Call the method to calculate the initial total
    },

    methods: {

        remove(index) {
            // Remove the item at the specified index from the shoppingList array
            this.shoppingList.splice(index, 1);
            // Recalculate the total
            this.calculateTotal();
          },

          calculateTotal() {
            this.isTotal = this.shoppingList.reduce((total, shoppinglist) => {
              return total + Number(shoppinglist.total.replace(',', ''));
            }, 0);
          
            // Update the total in local storage
            localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
          },
          
        async getProductInfo() {
            await axios.post('../php/getProductInfo.php')
                .then(response => {
                   this.isProductInfo = response.data;
                    // console.log(this.isProductInfo[0]);
                })
        },

        // clearData() {
        //     localStorage.removeItem('shoppingList');
        // },
    },
    async mounted(){
        let a  = await globalCheck.PageCheckSession();
        // console.log(a);
        this.isSessionValid = a;
        console. log (this.isSessionValid);

        if (this.isSessionValid === false) {
            window.location.href = "../dist/loginRegister.html";
        }          
        await this.getProductInfo();        
    },

});

app.mount('#app');
