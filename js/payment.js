const app = Vue.createApp({
  data() {
    return {
      //登入
      isSessionValid: '',
      user:'',
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

  //   async saveOfferDate() {
  //     const dateData = new FormData();
  //     dateData.append('ProductID', this.product.productID);
  //     dateData.append('OfferDate', JSON.stringify(this.selectedDates));

  //     await axios.post('../php/saveOfferDate.php', dateData)
  //         .then(response => {
  //             if (response.data === 'done') {
  //                 console.log('productSchedule已儲存!');
  //                 alert('儲存成功!');
  //                 window.location.href = './backProduct.html';

  //             } else {
  //                 alert('productSchedule儲存失敗');
  //             }

  //         })
  //         .catch(error => {
  //             console.log(error);
  //             alert('連線失敗，請稍後重試');
  //         });
  // },

  async saveData() {
    const orderData = new FormData();
    orderData.append('MemberID', this.memId);
    orderData.append('ShoppingList', JSON.stringify(this.shoppingList));
  
    console.log(this.memId);
  
    try {
      const response = await axios.post('../php/saveOrderDetail.php', orderData);
      if (response.data === 'done') {
        console.log('Order saved!');
        alert('Order saved successfully!');
        window.location.href = './done.html';
      } else {
        alert('Failed to save order');
      }
    } catch (error) {
      console.log(error);
      alert('Connection failed, please try again later');
    }
  }
  ,
  

  async getProductID(){
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
        // console.log(this.memId);
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
    this.isSessionValid = a.isSessionValid;
    this.user = a.user;
    console.log(this.isSessionValid);
    
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



// async doSave() {
//   // 获取会员ID和产品ID
//   // const memId = await this.getMemberId(); // 使用await等待异步获取会员ID
//   const productId = await this.getProductId(); // 使用await等待异步获取产品ID

//   // 创建包含会员ID和产品ID的对象
//   const productInfo = {
//     memId: this.memId,
//     productId: productId
//   };
//   console.log(productInfo);

//   // 发送数据到后端PHP
//   await this.sendDataToPHP(productInfo); // 使用await等待异步发送数据到后端
// },
// // async getMemberId() {
// //   // 获取会员ID的逻辑，例如从元素中获取值
// //   const memberIdElement = document.getElementById('paymentMemId');
// //   return memberIdElement.value;
// // },

// // async getProductId() {
// //   // 获取产品ID的逻辑，例如从元素中获取值
// //   const productIdElement = document.getElementById('paymentProductId');
// //   // console.log(productIdElement.innerHTML);
// //   return productIdElement.innerHTML;
// // },


    // async doSave() {
    //   // 获取会员ID和产品ID
    //   // const memId = await this.getMemberId(); // 使用await等待异步获取会员ID
    //   // const productId = await this.getProductId(); // 使用await等待异步获取产品ID

    //   // 创建包含会员ID和产品ID的对象
    //   const productInfo = {
    //     memId: this.memId,
    //     productId: productId
    //   };
    //   console.log(productInfo);

    //   // 发送数据到后端PHP
    //   await this.sendDataToPHP(productInfo); // 使用await等待异步发送数据到后端
    // },
    // async getMemberId() {
    //   // 获取会员ID的逻辑，例如从元素中获取值
    //   const memberIdElement = document.getElementById('paymentMemId');
    //   return memberIdElement.value;
    // },

    // async getProductId() {
    //   // 获取产品ID的逻辑，例如从元素中获取值
    //   const productIdElement = document.getElementById('paymentProductId');
    //   // console.log(productIdElement.innerHTML);
    //   return productIdElement.innerHTML;
    // },

    // async sendDataToPHP(data) {
    //   // 发送数据到后端PHP的URL
    //   const url = '../php/saveOrderDetail.php';
    //   // 发送POST请求
    //   try {
    //     const response = await axios.post(url, data); // 使用await等待异步POST请求的响应
    //     // 处理响应结果
    //     console.log(response.data);
    //   } catch (error) {
    //     // 处理错误
    //     console.error(error);
    //   }
    // },
    // getPID(){
    //   console.log(this.shoppingList);
      
    // },