const app = Vue.createApp({
    data() {
        return {
            //showReview: false,
            showService: false,
            start: false,
            current_tab: 'account',
            avatar: '',
            orderList: [],
            orderIMGUrl: 'image/member/',
            cancelOrder: false,
            writeReview: false,
            currentOrderNumber: '', // for聯絡客服連結的
            contactID: '',
            contactEmail: '',
            contactPhone: '',
            contactText: '',
            isValidEmail: true,
            isSessionValid: false,
            user: '',
            accountInfo: {
                AccountID: '',
                Avatar: '',
                FullName: '',
                Gender: '',
                Phone: ''
            },
            pwChange: {
                newPW: '',
                newPWCheck: '',
                isPasswordMatch: true
            }
        }
    },
    computed: {
        isValidPwLength() {
            return this.pwChange.newPW.length >= 4;
        }
    },
    created() {
        fetch('image/order.json')
            .then(response => response.json())
            .then(data => {
                this.orderList = data.map(item => ({
                    ...item,
                    showReview: false
                }));
            });

    },
    async mounted() {
        await this.checkSession();
        await this.getAccountInfo();
        setTimeout(() => {
            this.start = true;
        }, 200);
    },
    methods: {
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
        toggleReview(list) {
            list.showReview = !list.showReview;
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
            this.avatar = e.target.result;
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
                SecureToken: "d8f8fcac-762b-4858-956c-cc3abc40e0cc",
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

        updateGender(e) {
            this.accountInfo.Gender = e.target.value;
        },

        doAccountSave() {
            const accountData = {
                AccountID: this.accountInfo.AccountID,
                FullName: this.accountInfo.FullName,
                Gender: this.accountInfo.Gender,
                Phone: this.accountInfo.Phone
            }
            if (this.accountInfo.Gender !== 'none') {
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
                alert('請選擇性別');
            }
        },

        async getAccountInfo() {
            await axios.post('../php/GetAccountInfo.php', { user: this.user })
                .then(response => {
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


    },
    watch: {
        contactEmail() {
            // 監聽email變化，並在每次變化時檢查其有效性
            this.checkEmailValidity();
        },

        newPWCheck() {
            this.pwChange.isPasswordMatch = (this.pwChange.newPWCheck === this.pwChange.newPW);
        }

    },
});
app.mount('#app');

