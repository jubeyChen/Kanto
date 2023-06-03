const vm = Vue.createApp({
    data() {
        return {
            product: {
                name: '',
                content: '',
                price: '',
                Banner1: '',
                Banner2: '',
                Banner3: '',
                productType: '',
                region: '',
                image1: '',
                image2: '',
                image3: '',
                image4: '',

            },
            productIntroduction: {
                content1: '',
                content2: '',
                content3: ''
            },
            productDetail: {
                offerDate: []
            }
        }
    },
    methods: {
        back() {
            window.location.href = './backProduct.html';
        },
    },
    mounted() { 
    }
}).mount('#app');