const app = Vue.createApp({
  data() {
    return {
      //登入
      isSessionValid: '',
      user: '',
      //取account值
      accountInfo: '',
      accountID: '',
      fullName: '',
      phone: '',
      memId: '',
      //local storage
      shoppingList: [],
      //計算
      couponID: '',
      selectedCoupon: '',
      isCoupon: [],
      isTotal: 0,
      couponName: '',
      isSubTotal: '',
      isDiscount:'',
      //已選者的coupon
      selectedCouponId:'',
      //信用卡
      creditCardNumber: '',
      expiryDate: '',
      cvc: '',
      creditCardError: '',
      expiryDateError: '',
      cvcError: '',
      //email
      email: '',
      emailError: ''
    };
  },
  created() {
    this.shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    
    //localstorage
    this.calculateTotal();
    this.calculateSubTotal();

  },
  computed: {
    //信用卡填寫錯誤運算
    hasErrors() {
      return (
        this.creditCardError !== '' ||
        this.expiryDateError !== '' ||
        this.cvcError !== '' ||
        this.emailError !== ''
      );
    },
    isAnyInputEmpty() {
      return (
        this.creditCardNumber === '' ||
        this.expiryDate === '' ||
        this.cvc === '' ||
        this.email === ''
      );
    }
  },
  methods: {

    updateCoupon(e) {
      // this.isCoupon.couponID = e.target.value;
      this.selectedCouponId = e.target.selectedOptions[0].getAttribute("data-id");
      console.log(this.selectedCouponId);
      console.log(this.isDiscount);
      // console.log(e.target.selectedOptions[0].getAttribute("data-id"));
      console.log(e.target.value);
      this.isSubTotal=e.target.value*this.isTotal;

    },

    async saveData() {
      const orderData = new FormData();
      orderData.append('memId', this.memId); // Changed 'MemberID' to 'memId' to match the key in the PHP code
      orderData.append('ShoppingList', JSON.stringify(this.shoppingList));
      orderData.append('couponId', this.selectedCouponId);
      // console.log(this.memId);
      // console.log(this.shoppingList[0].productDetailId);
      // console.log(this.isCoupon[0].CouponID);

      // 將 JSON 字串轉換回普通 JavaScript 對象或陣列
      const parsedShoppingList = JSON.parse(orderData.get('ShoppingList'));
      // 更新 Vue 的資料屬性
      this.shoppingList = parsedShoppingList;

      await axios.post('../php/saveOrderDetail.php', orderData) // Changed 'data' to 'orderData'
        .then(response => {
          console.log(response.data);
          if (response.data) {
            // console.log('response.data');
            // alert('已成功購買');
            // this.productID = response.data;
            localStorage.removeItem('shoppingList');
            window.location.href = './done.html';
          }
        })
        .catch(error => {
          console.log(error);
          alert('連線失敗，請稍後重試');
        });
    },

    async getProductID() {
      for (let i = 0; i < this.shoppingList.length; i++) {
        console.log(this.shoppingList[i].productID);
      }
    },

    //--------------  信用卡邏輯運算
    validateCreditCardNumber(creditCardNumber) {
      const creditCardNumberRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
      return creditCardNumberRegex.test(creditCardNumber) ? '' : '信用卡卡號有誤';
    },
    validateExpiryDate(expiryDate) {
      const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      return expiryDateRegex.test(expiryDate) ? '' : '過期日有誤';
    },
    validateCVC(cvc) {
      const cvcRegex = /^[0-9]{3,4}$/;
      return cvcRegex.test(cvc) ? '' : '安全碼有誤';
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) ? '' : '電子信箱有誤';
    },
    validateCreditCard() {
      this.creditCardError = this.validateCreditCardNumber(this.creditCardNumber);
      this.expiryDateError = this.validateExpiryDate(this.expiryDate);
      this.cvcError = this.validateCVC(this.cvc);
      this.emailError = this.validateEmail(this.email);

      if (
        !this.creditCardError &&
        !this.expiryDateError &&
        !this.cvcError &&
        !this.emailError
      ) {
        this.saveData();
      }
    },

    //database 取得帳戶
    async getAccountInfo() {
      const response = await axios.post('../php/getAccPayment.php');
      this.isAccountInfo = response.data;
      console.log(this.isAccountInfo);

      if (Array.isArray(this.isAccountInfo) && this.isAccountInfo.length > 0) {
        const accountInfo = this.isAccountInfo[0];
        this.accountId = accountInfo.AccountID;
        this.fullName = accountInfo.FullName;
        this.phone = accountInfo.Phone;
        this.memId = accountInfo.ID;
      }
    },
    //取的優惠碼
    async getMemberCoupon() {
      try {
        const response =
          await axios.post('../php/getCouponNameForPayment.php')
        this.isCoupon = response.data;
        console.log(this.isCoupon[0].Discount);
      } catch (error) {
        console.error(error);
      }
    },
    getCouponName(couponID) {
      const selectedCoupon = this.isCoupon.find(coupon => coupon.CouponID === couponID);
      return selectedCoupon ? selectedCoupon.CouponName : '';
    },
    getDiscountAmount(couponID) {
      const selectedCoupon = this.isCoupon.find(coupon => coupon.CouponID === couponID);
      return selectedCoupon ? selectedCoupon.Discount : 0;
    },

    //--------------------信用卡運算--------------
    calculateTotal() {
      this.isTotal = this.shoppingList.reduce((total, shoppinglist) => {
        return total + Number(shoppinglist.total.replace(',', ''));
      }, 0);

      console.log(this.isTotal);
      localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
    },
    calculateSubTotal() {
      const discountAmount = this.getDiscountAmount(this.selectedCoupon);
      this.isSubTotal = discountAmount !== 0 ? this.isTotal * isDiscount : this.isTotal;
      // console.log(this.isTotal);
      // console.log(discountAmount);
    }
  },
  watch: {
    selectedCoupon: {
      handler: 'calculateSubTotal',
      immediate: true
    },
    creditCardNumber(newValue) {
      this.creditCardError = this.validateCreditCardNumber(newValue);
    },
    expiryDate(newValue) {
      this.expiryDateError = this.validateExpiryDate(newValue);
    },
    cvc(newValue) {
      this.cvcError = this.validateCVC(newValue);
    },
    email(newValue) {
      this.emailError = this.validateEmail(newValue);
    }
  },
  async mounted() {
    // let a = await globalCheck.PageCheckSession();
    // this.isSessionValid = a.isSessionValid;
    // this.user = a.user;
    // console.log(this.isSessionValid);

    // Check if the page is accessed directly
    if (window.location.href === "https://tibamef2e.com/thd101/g7/Kanto/dist/payment.html") {
      // Redirect to loginRegister.html
      document.write("網頁不存在");
    }

    this.getAccountInfo()
      .then(() => {
        return this.getMemberCoupon();
      })
      .then(() => {
        return this.getProductID();
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

app.mount('#app');


