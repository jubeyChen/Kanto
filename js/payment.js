const app = Vue.createApp({
  data() {
    return {
      //登入
      isSessionValid: '',
      //取值
      accountInfo: '',
      accountID: '',
      fullName: '',
      phone: '',
      //local storage
      shoppingList: [],
      //計算
      couponID: '',
      selectedCoupon: '',
      isCoupon: [],
      isTotal: 0,
      couponName: '',
      isSubTotal: '',

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
    //信用卡填寫錯誤運算
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

      if (!this.creditCardError && !this.expiryDateError && !this.cvcError && !this.emailError) {
        window.location.href = 'done.html';
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
      }
    },
    //取的優惠碼
    async getMemberCoupon() {
      try {
        const response = await axios.post('../php/getCouponNameForPayment.php');
        this.isCoupon = response.data;
        console.log(this.isCoupon);
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
   //信用卡運算

    calculateTotal() {
      this.isTotal = this.shoppingList.reduce((total, shoppinglist) => {
        return total + Number(shoppinglist.total.replace(',', ''));
      }, 0);

      console.log(this.isTotal);
      localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
    },
    calculateSubTotal() {
      const discountAmount = this.getDiscountAmount(this.selectedCoupon);
      this.isSubTotal = discountAmount !== 0 ? this.isTotal * discountAmount : this.isTotal;
      console.log(this.isTotal);
      console.log(discountAmount);
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
    let a = await globalCheck.PageCheckSession();
    this.isSessionValid = a;
    console.log(this.isSessionValid);
    await this.getAccountInfo();
    await this.getMemberCoupon();
  }
});

app.mount('#app');
