const app = Vue.createApp({
    data() {
      return {
        isSessionValid: '',
        shoppingList: [],
        isTotal: 0, // Define isTotal as a data property and initialize it to 0
        isDisscount: '100',
        isSubTotal: '',
      };
    },
    created() {
      this.shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    //   console.log(this.shoppingList);
  
      this.calculateTotal();
      this.calculateSubTotal();
    },
  
    methods: {
      calculateTotal() {
        this.isTotal = this.shoppingList.reduce((total, shoppinglist) => {
          return total + Number(shoppinglist.total);
        }, 0);
  
        localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
      },
  
      calculateSubTotal() {
        this.isSubTotal = this.isTotal - this.isDisscount;
      },
    },
  
    async mounted() {
        let a  = await globalCheck.PageCheckSession();
        this.isSessionValid = a;

        console.log(this.isSessionValid);
        if (this.isSessionValid === false ){
            window.location.href= "../dist/loginRegister.html"
        }
        // await this.getProductInfo();        
    },
  });
  
  app.mount('#app');
  

// // Function to calculate the values
// function calculateTotal() {
//     // Get all the item prices
//     let itemPrices = document.querySelectorAll('.payment_item_price span');

//     // Calculate the total price
//     let totalPrice = 0;
//     for (let i = 0; i < itemPrices.length; i++) {
//         totalPrice += parseFloat(itemPrices[i].textContent.slice(1));
//     }

//     // Get the selected coupon option
//     let couponSelect = document.getElementById('payment_coupon');
//     let selectedCoupon = couponSelect.options[couponSelect.selectedIndex].value;

//     // Perform the calculation based on the selected coupon
//     let discountAmount = 0;
//     if (selectedCoupon === 'coupon1') {
//         discountAmount = 500;
//     } else if (selectedCoupon === 'coupon2') {
//         discountAmount = 1000;
//     } else if (selectedCoupon === 'coupon3') {
//         discountAmount = 1500;
//     }

//     // Calculate the total price after the discount
//     let totalPriceAfterDiscount = totalPrice - discountAmount;

//     // Update the display
//     document.getElementById('payment_total_amount').textContent = '$' + totalPrice;
//     document.getElementById('payment_discount_amount').textContent = '$' + discountAmount;
//     document.getElementById('payment_total_price').textContent = '$' + totalPriceAfterDiscount;
// }

// // Call the calculateTotal function to initially calculate the values
// calculateTotal();

// // Add event listener to the coupon select element
// document.getElementById('payment_coupon').addEventListener('change', calculateTotal);
