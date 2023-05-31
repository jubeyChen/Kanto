const app = Vue.createApp({
    data() {
        return {
            showService: false,
            showReviewDetail: false,
            start: false,
            current_tab: 'account',
            // orderList: [],
            orderIMGUrl: 'image/productPage/',
            cancelOrder: false,
            writeReview: false,
            currentOrderNumber: '', // for聯絡客服連結的
            contactID: '',
            contactEmail: '',
            contactPhone: '',
            contactText: '',
            isValidEmail: true,
            isValidPhone: true,
            isSessionValid: false,
            preview: false,
            user: '',
            avatarURL: 'image/member/',
            collectProductURL: 'image/productPage/',
            accountInfo: {
                ID: '',
                AccountID: '',
                Avatar: '',
                FullName: '',
                Gender: '',
                Phone: '',
            },
            pwChange: {
                currentPW: '',
                newPW: '',
                newPWCheck: ''
            },
            isPasswordMatch: true,
            couponExist: false,
            couponNum: '',
            memberCoupon: [],
            collectionExist: false,
            orderExist: false,
            myCollection: [],
            myOrder: [],
            review: {
                star: 0,
                reviewText: '',
            },
            selectedImages: [],
            previewImagesList: [],
            myReview: [],
            openReviewIndex: null
        }
    },
    computed: {
        isValidPwLength() {
            return this.pwChange.newPW.length >= 4;
        },
        reviewDetail() {
            return this.myReview.filter(
                (item) => item.OrderDetailID === this.currentOrderNumber
            );
        }
    },
    created() {
        // fetch('image/order.json')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.orderList = data.map(item => ({
        //             ...item,
        //             showReview: false
        //         }));
        //     });

    },
    async mounted() {
        await this.checkSession();
        await this.getAccountInfo();
        await this.getAccountOrder();
        await this.getReview();
        await this.getCollection();
        await this.getMemberCoupon();
        setTimeout(() => {
            this.start = true;
        }, 200);
    },
    methods: {
        closeReviewDetail(orderDetailID) {
            this.showReviewDetail = false;
            this.openReviewIndex = null;
            
            this.$nextTick(() => {
            const reviewButton = document.getElementById(`${orderDetailID}`);
                if (reviewButton) {
                    const scrollPosition = reviewButton.getBoundingClientRect().top + window.pageYOffset - 230;
                    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
                }
            });
        },

        async checkSession() {
            await axios.post('../php/CheckSession.php')
                .then(response => {
                    if (response.data.isSessionValid) {
                        this.isSessionValid = response.data.isSessionValid;
                        this.user = response.data.user;
                    } else {
                        window.location.href = "loginRegister.html";
                    }
                })
                .catch(error => {
                    console.log(error);
                    window.location.href = "loginRegister.html";
                });
        },

        toggleReview(order) {
            order.showReview = !order.showReview;
            this.openReviewIndex = order.OrderNumber;
        },

        async getReview() {
            await axios.post('../php/GetReview.php', { MemberID: this.accountInfo.ID })
                .then(response => {
                    this.myReview = response.data;
                })
                .catch(error => {
                    console.log(error);
                    alert('取得失敗，請您稍後再試');
                });
        },

        toggleReviewDetail(order) {
            order.showReviewDetail = !order.showReviewDetail;
            this.showReviewDetail = !this.showReviewDetail;

            this.currentOrderNumber = order.OrderNumber;   
            console.log(this.currentOrderNumber);
            window.scrollTo({
                top: 100,
                behavior: "smooth",
            });
        },

        //點選tab鍵，右欄換相關內容
        tab_change(tab_name) {
            this.current_tab = tab_name
        },

        //上傳&預覽大頭貼
        uploadAvatar(e) {
            const file = e.target.files.item(0);
            const reader = new FileReader();
            reader.addEventListener('load', this.avatarLoaded);
            reader.readAsDataURL(file);
        },

        avatarLoaded(e) {
            this.accountInfo.Avatar = e.target.result;
            this.preview = true;
        },

        departureStatus(date) {
            const currentDate = new Date();
            const departureDate = new Date(date);
            if (departureDate < currentDate || departureDate === currentDate) {
                return "已出發";
            } else {
                return "即將出發";
            }
        },

        submitForm() {
            // 如果電子郵件地址無效，則顯示錯誤消息
            if (!this.isValidEmail) {
                return;
            }
        },

        checkEmailValidity() {
            // 使用正則表達式檢查email地址的有效性
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.isValidEmail = regex.test(this.contactEmail);
        },

        sendEmail() {
            let orderNumber = this.currentOrderNumber;
            let contactID = this.contactID;
            let contactEmail = this.contactEmail;
            let contactPhone = this.contactPhone;
            let contactText = this.contactText;

            Email.send({
                SecureToken: "adf84833-cc46-45a2-850a-092ac2f86858",
                To: contactEmail,
                From: "kantoasuka1@gmail.com",
                Subject: '訂單詢問-訂單編號:' + orderNumber,
                Body: `全名: ${contactID} <br><br>
                電子信箱: ${contactEmail} <br><br>
                連絡電話: ${contactPhone} <br><br>
                訊息: ${contactText}`
            })
                .then(function () {
                    alert('Kanto已收到您的來信');
                });
        },

        deleteContactInfo() {
            this.contactID = '';
            this.contactEmail = '';
            this.contactPhone = '';
            this.contactText = '';
        },

        async saveAvatar() {
            const avatarData = new FormData();
            avatarData.append('Avatar', document.getElementById('upload').files[0]);
            avatarData.append('ID', this.accountInfo.ID);

            await axios.post('../php/Avatar.php', avatarData)
                .then(response => {
                    if (response.data === 'done') {
                        alert('已儲存您的大頭照');
                    } else {
                        alert('您輸入的資料有誤，請您重試。')
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert('儲存失敗，請重試。');
                });
        },

        updateFullName(e) {
            this.accountInfo.FullName = e.target.value;
        },

        updateGender(e) {
            this.accountInfo.Gender = e.target.value;
        },

        updatePhone(e) {
            this.accountInfo.Phone = e.target.value;
            const regexPhone = /^09\d{8}$/;
            this.isValidPhone = regexPhone.test(e.target.value);
        },

        doAccountSave() {
            const accountData = {
                AccountID: this.accountInfo.AccountID,
                FullName: this.accountInfo.FullName,
                Gender: this.accountInfo.Gender,
                Phone: this.accountInfo.Phone
            }
            if (this.accountInfo.Gender !== 'none') {
                if (this.isValidPhone || this.accountInfo.Phone ==='') {
                    axios.post('../php/UpdateAccountInfo.php', accountData)
                        .then(response => {
                            if (response.data === 'done') {
                                alert('已更新帳戶資料');
                            } else {
                                alert('您輸入的資料有誤，請您重試。')
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            alert('儲存失敗，請重試。');
                        });
                } else {
                alert('請輸入正確的手機號碼')
                }
            } else {
                alert('請選擇性別');
            }
        },

        async getAccountInfo() {
            await axios.post('../php/GetAccountInfo.php', { user: this.user })
                .then(response => {
                    this.accountInfo.ID = response.data[0].ID;
                    this.accountInfo.AccountID = response.data[0].AccountID;
                    this.accountInfo.Avatar = response.data[0].Avatar;
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

        async getAccountOrder() {
            await axios.post('../php/GetOrder.php', { user: this.user })
                .then(response => {
                    if (response.data !== 'no order') {
                        this.myOrder = response.data.map(item => ({
                            ...item,
                            showReview: false,
                            showReviewDetail: false
                        }));
                        this.orderExist = true;
                    } else {
                        this.orderExist = false;
                        console.log('no order');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async getMemberCoupon() {
            await axios.post('../php/GetMemberCoupon.php', { memberID: this.accountInfo.ID })
                .then(response => {
                    if (response.data !== '沒有coupon') {
                        
                        this.memberCoupon = response.data;
                        this.couponExist = true;
                    } else {
                        console.log('no coupon');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async getCollection() {
            await axios.post('../php/GetCollection.php', { memberID: this.accountInfo.ID })
                .then(response => {
                    if (response.data !== '沒有收藏') {
                        this.myCollection = response.data;
                        this.collectionExist = true;
                    } else {
                        this.collectionExist = false;
                        console.log('no collection');
                    }
                    
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async removeCollect(ProductID) {
            const collectionData = {
                memberID: this.accountInfo.ID,
                productID: ProductID,
            }
                
            await axios.post('../php/RemoveCollection.php', collectionData)
                .then(response => {
                    if (response.data === 'done') {
                        this.getCollection();
                    } else {
                        alert('請稍後再試');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        newPWCheck() {
            this.isPasswordMatch = (this.pwChange.newPWCheck === this.pwChange.newPW);
        },

        changePW() {
            const PWData = {
                AccountID: this.accountInfo.AccountID,
                currentPW: this.pwChange.currentPW,
                newPW: this.pwChange.newPW,
            }
            if (this.pwChange.currentPW !== '' && this.isPasswordMatch && this.isValidPwLength) {
                axios.post('../php/PWChange.php', PWData)
                    .then(response => {
                        if (response.data === 'done') {
                            alert('已變更您的密碼，請您重新登入');
                            window.location.href = "../php/Logout.php";
                        } else {
                            alert('您輸入的密碼有誤，請您重試。')
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert('變更失敗，請稍後重試。');
                    });
            } else {
                alert('請輸入完整密碼資訊');
            }
        },

        doCoupon() {
            const couponData = {
                memberID: this.accountInfo.ID,
                couponNum: this.couponNum
            }

            axios.post('../php/SearchCoupon.php', couponData)
                .then(response => {
                    if (response.data === 'alreadyhad') {
                        alert('您已領過此優惠券');
                        this.couponNum = '';
                    } else if (response.data === 'add') {
                        alert('兌換優惠券成功，請於結帳時選擇優惠券即可使用');
                        this.getMemberCoupon();
                        this.couponNum = '';
                    } else if (response.data === 'NONO'){
                        alert('查無此優惠券，請您重新輸入');
                        this.couponNum = '';
                    } else {
                        alert('兌換失敗，請您稍後重試');
                        this.couponNum = '';
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert('兌換失敗，請您稍後重試');
                });
        },

        async doCancel(orderDetailID) {
            confirm('確定要取消訂單嗎?');
            if (confirm) {
                const cancelData = {
                    orderDetailID: orderDetailID
                }

                await axios.post('../php/CancelOrder.php', cancelData)
                    .then(response => {
                        if (response.data === 'done') {
                            alert('已取消該筆訂單');
                            this.getAccountOrder();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert('取消訂單失敗，請稍後再試');
                    });
            }
        },

        reviewStar(stars) {
            this.review.star = stars;
        },

        async doReview(order) {
            if (this.review.star == 0) {
                alert('請評分商品');
            } if (this.review.reviewText == '') {
                alert('請您撰寫評論');
            } else {
                const reviewData = new FormData();

                this.selectedImages.forEach((image) => {
                    reviewData.append('IMG[]', image, image.name);
                });

                // 將其他資訊附加到FormData中
                reviewData.append('ProductID', order.ProductID);
                reviewData.append('MemberID', this.accountInfo.ID);
                reviewData.append('OrderDetailID', order.OrderNumber);
                reviewData.append('Star', this.review.star);
                reviewData.append('Text', this.review.reviewText);

                await axios.post('../php/SaveReview.php', reviewData)
                    .then(response => {
                        console.log(response.data);
                        if (response.data === 'done') {
                            alert('已送出評論');
                            this.getAccountOrder();
                            this.getReview();
                            this.review.star = 0;
                            this.review.reviewText = '';
                            this.previewImagesList = [];
                            this.selectedImages = [];
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert('儲存失敗，請您稍後再試');
                    });
            }
        },

        previewImages(e) {
            this.selectedImages = Array.from(e.target.files); // 将选中的文件转换为数组

            if (this.selectedImages.length > 6) {
                alert('圖片只能選取6張');
            } else {
                this.selectedImages.splice(6);
                this.selectedImages.forEach((image, index) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        this.previewImagesList.push({
                            id: index,
                            name: image.name,
                            previewUrl: reader.result,
                        });
                    };
                    reader.readAsDataURL(image);
                });
            }
            

        }


    },
    watch: {
        contactEmail() {
            // 監聽email變化，並在每次變化時檢查其有效性
            this.checkEmailValidity();
        }
    },
});
app.mount('#app');

