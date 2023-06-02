
const app = Vue.createApp({
  data() {
    return {
      isSessionValid: '',
      shoppingList: [],
      isTotal: 0, // Define isTotal as a data property and initialize it to 0
      isDiscount: '',
      isSubTotal: [],
      isAccountInfo: '',
      user: '',
      accountInfo: {
        ID: '',
        AccountID: '',
        Phone: '',
        FullName: '',
      },
      isCouponInfo: '',
    };
  },
  created() {
    // print info for LS once the page is created
    this.shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    //   console.log(this.shoppingList);

    this.calculateTotal();
    this.calculateSubTotal();
  },

  methods: {

    async getAccountInfo() {
      await axios.post('../php/getAccPayment.php')
        .then(response => {
          this.isAccountInfo = response.data;
          console.log(this.isAccountInfo);
        })

    },

    // async getAccountInfo() {
    //   await axios.post('../php/GetAccountInfo.php', { user: this.user })
    //       .then(response => {
    //           this.accountInfo.ID = response.data[0].ID;
    //           this.accountInfo.AccountID = response.data[0].AccountID;
    //           this.accountInfo.Phone = response.data[0].Phone;
    //           this.accountInfo.Phone = response.data[0].FullName;
    //           console.log(this.user);
    //       })
    // .catch(error => {
    //     console.log(error);
    //     window.location.href = "loginRegister.html";
    // });
    // },

    // async getCouponInfo() {
    //   await axios.post('../php/getCouponForPayment.php.php')
    //   .then(response => {
    //     this.isCouponInfo = response.data;
    //     console.log(this.isCouponInfo);
    //   })
    // },

    calculateTotal() {
      this.isTotal = this.shoppingList.reduce((total, shoppinglist) => {
        return total + Number(shoppinglist.total);
      }, 0);

      console.log(this.isTotal); // Changed: Added this line to log the value of isTotal

      localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
    },

    calculateSubTotal() {
      this.isSubTotal = this.isTotal - this.isDiscount;
    },
  },

  async mounted() {
    let a = await globalCheck.PageCheckSession();
    this.isSessionValid = a;
    console.log(this.isSessionValid);

    // if (this.isSessionValid === false ){
    //     window.location.href= "../dist/loginRegister.html"
    // }
    await this.getAccountInfo();
    // await this.getCouponInfo();
    
  },
});

app.mount('#app');

