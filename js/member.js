Vue.createApp({
    data() {
        return {
            showReview: false,
            showService: false
        }
    },
    methods: {
        toggleReview() {
            if (this.showReview == true) {
                this.showReview = false;
            } else {
                this.showReview = true;
            }
        }
    }
}).mount('.member')