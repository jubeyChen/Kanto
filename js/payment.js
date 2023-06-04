
const app = Vue.createApp({
  data() {
    return {
      isSessionValid: '',
      shoppingList: [],
      isTotal: 0, // Define isTotal as a data property and initialize it to 0
      isDiscount: '',
      isSubTotal: [],
      accountInfo: '',
      accountID:'',
      fullName:'',
      phone:'',
      couponID: '',
      selectedCoupon: '',
      isCoupon: [],// 初始化為空陣列
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
  
          // 读取二维数组的值
          if (Array.isArray(this.isAccountInfo) && this.isAccountInfo.length > 0) {
            const accountInfo = this.isAccountInfo[0];
            this.accountId = accountInfo.AccountID;
            this.fullName = accountInfo.FullName;
            this.phone = accountInfo.Phone;  
          }
        });
    },

    async getMemberCoupon() {
      await axios.post('../php/getCouponForPayment.php')
        .then(response => {
          this.isCoupon = response.data;
          console.log(this.isCoupon);
        })
        .catch(error => {
          console.error(error);
        });
    }    
    ,
    
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
    await this.getMemberCoupon();
    // await this.getCouponInfo();
    
  },
});

app.mount('#app');

