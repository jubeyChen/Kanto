Vue.createApp({
    data() {
        return {
            showReview: false,
            showService: false,
            start: false,
            current_tab: 'order'
        }
    },
    mounted() {
        setTimeout(() => {
            this.start = true;
        }, 200);


    },
    methods: {
        toggleReview() {
            if (this.showReview == true) {
                this.showReview = false;
            } else {
                this.showReview = true;
            }
        },


        tab_change(tab_name) {
            this.current_tab = tab_name
        }

    }
}).mount('.member')