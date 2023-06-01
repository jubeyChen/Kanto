const app = Vue.createApp({
    data() {
        return {
            isSessionValid: '',
            isProductInfo: [],
            shoppingList: [],
        };
    },
    created(){
        this.shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
        console.log(this.shoppingList);
    },
    methods: {

        // click_view_detail_btn(btn) {
        //     // console.log(btn);
        //     // Get data from the button
        //     let pic_src = 'pictures'
        //     let place_string = 'place'
        //     let date_string = 'date'
        //     let price_string = 'price'

        //     let item_clicked = {
        //       src: pic_src,
        //       place: place_string,
        //       date: date_string,
        //       price: price_string,
        //     };
      
        //     // // Update the shopping list data in local storage
        //     localStorage.setItem('shoppingList', JSON.stringify(item_clicked));

        //   },
        
        async getProductInfo() {
            await axios.post('../php/getProductInfo.php')
                .then(response => {
                   this.isProductInfo = response.data;
                    console.log(this.isProductInfo[0]);

                })
                .catch(error => {
                    console.log(error);
                    window.location.href = "loginRegister.html";
                });
        },
        // clearData() {
        //     // Remove data from local storage
        //     localStorage.removeItem('shoppingList');
        // },
    },
    async mounted(){
        let a  = await globalCheck.PageCheckSession();
        this.isSessionValid = a;

        // console.log(this.isSessionValid);
        // if (this.isSessionValid === false ){
        //     window.location.href= "../dist/loginRegister.html"
        // }
        await this.getProductInfo();        

    },
    // 輸入直到 local storage

 
});
app.mount('#app');


        // function refresh() {
        //     // 1. read LS
        //     let LS = null;
        //     try {
        //         var LS = localStorage.getItem('shoppingList');
        //         LS = JSON.parse(LS);
        //         if (LS == null)
        //             LS = [];
        //     } catch {
        //         LS = [];
        //     }
        //     // 2. clear the item list
        //     let cart_item_list = document.getElementById('cart-item-list'); // get the DOM
        //     cart_item_list.innerHTML = '';

        //     // 3. paste all items from LS on item list
        //     console.log(LS);
        //     LS.forEach(element => {
        //         // cart-item-list{ <li><div> <text>Taipei</text> </div></li>  }
        //         var li = document.createElement('li');
        //         li.setAttribute('class', 'cart_item_li');

        //         var div = document.createElement('div');
        //         var name = document.createElement('text');
        //         name.innerHTML = element['place'] + ' ' + element['price'] + ' ' + element['src'];
                
        //         div.appendChild(name);
        //         li.appendChild(div);

        //         var panel = document.getElementById('cart-item-list');
        //         panel.appendChild(li);
        //     });
        // }

        // function click_view_detail_btn(btn) {
        //     console.log(btn);
        //     // localstorage 裡面是一個陣列 [item1, item2, item3, ...]
        //     // 'shopping_list'

        //     // url of picture
        //     var pic_src = btn.parentElement.children[0].children[0].src;
        //     var place_string = btn.parentElement.children[1].innerHTML;
        //     var price_string = btn.parentElement.children[2].innerHTML;
        //     var item_clicked = { 'src': pic_src, 'place': place_string, 'price': price_string }; //當按下按鈕的時候，Json object
        //     // read LS first 如果他是
        //     var ls = null;
        //     try {
        //         ls = localStorage.getItem('shoppingList');
        //         ls = JSON.parse(ls); // 字串轉成結構（陣列）
        //         if (ls == null)
        //             ls = [];
        //     } catch {
        //         ls = [];
        //     }

        //     // add item into ls
        //     ls.push(item_clicked); //資料往上推
        //     localStorage.setItem('shoppingList', JSON.stringify(ls)); //資料字串化

        //     // test reading
        //     // refresh();
        // }