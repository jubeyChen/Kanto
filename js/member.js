Vue.createApp({
    data() {
        return {
            showReview: false,
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
        }
    },
    created() {
        fetch('image/order.json')
                .then(response => response.json())
                .then(data => {
                    this.orderList = data;
                });
    },
    mounted() {
        setTimeout(() => {
            this.start = true;
        }, 200);
    },
    methods: {
        toggleReview() {
            if (this.showReview === true) {
                this.showReview = false;
            } else {
                this.showReview = true;
            }
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
        }

    },
    watch: {
        contactEmail() {
            // 監聽email變化，並在每次變化時檢查其有效性
            this.checkEmailValidity();
        }

    },
}).mount('.member');