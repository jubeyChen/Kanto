
const app = Vue.createApp({
  data() {
    return {
      isSessionValid: '',
      shoppingList: [],

      couponID: '',
      selectedCoupon: '',
      isCoupon: [],// 初始化為空陣列

      isTotal: 0, // Define isTotal as a data property and initialize it to 0
      couponName: '',
      isSubTotal: '',

      accountInfo: '',
      accountID:'',
      fullName:'',
      phone:'',

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
      await axios.post('../php/getCouponNameForPayment.php')
        .then(response => {
          this.isCoupon = response.data;
          console.log(this.isCoupon);
        })
        .catch(error => {
          console.error(error);
        });
    },

    getCouponName(couponID) {
      const selectedCoupon = this.isCoupon.find(coupon => coupon.CouponID === couponID);
      if (selectedCoupon) {
        return selectedCoupon.CouponName;
      }
      return '';
    },
  

    getDiscountAmount(couponID) {
      const selectedCoupon = this.isCoupon.find(coupon => coupon.CouponID === couponID);
      if (selectedCoupon) {
        return selectedCoupon.Discount;
      }
      return 0;
    },
  
    
    calculateTotal() {
      this.isTotal = this.shoppingList.reduce((total, shoppinglist) => {
        return total + Number(shoppinglist.total.replace(',', ''));
      }, 0);

      console.log(this.isTotal); // Changed: Added this line to log the value of isTotal

      localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
    },

    calculateSubTotal() {
      const discountAmount = this.getDiscountAmount(this.selectedCoupon);
      if (discountAmount !== 0) {
        this.isSubTotal = this.isTotal * ( discountAmount);
        console.log(this.isTotal);
        console.log(discountAmount);
      } else {
        this.isSubTotal = this.isTotal;
      }
    }
    
  },

  watch: {
    selectedCoupon: {
      handler: 'calculateSubTotal',
      immediate: true
    }
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
    
  },
});

app.mount('#app');

