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
    computed: {
        
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
        }

    }
}).mount('.member');