const app = Vue.createApp({
    data() {
        return {
            couponInfo: [],
            user: '',
            // AccountID: userObject.AccountID,
            // FullName: userObject.FullName,
            // Phone: userObject.Phone
          
        };
    },

    methods: {
        async getCouponInfo() {
            await axios.post('../php/GetMemberCoupon.php')
                .then(response => {
                    this.couponInfo = response.data;
                    console.log(this.couponInfo[0]);
                })
                .catch(error => {
                    console.error('Error retrieving coupon info:', error);
                  });
        },
        async getAccountInfo() {
            await axios.post('../php/GetAccountInfo.php', { user: this.user })
                .then(response => {
                    this.accountInfo.ID = response.data[0].ID;
                    this.accountInfo.AccountID = response.data[0].AccountID;
                    if (response.data[0].FullName === null || response.data[0].FullName === undefined) {
                        this.accountInfo.FullName = null;
                    }
                    this.accountInfo.FullName = response.data[0].FullName;
                    if (response.data[0].Gender === null || response.data[0].Gender === undefined) {
                        this.accountInfo.Gender = 'none';
                    } else {
                        this.accountInfo.Gender = response.data[0].Gender;
                    }
                    this.accountInfo.Phone = response.data[0].Phone;
                })
                .catch(error => {
                    console.log(error);
                    window.location.href = "loginRegister.html";
                });
        },


    },

    async mounted() {
        await this.getCouponInfo();
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
