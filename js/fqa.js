import QAComponent from "./component/QAComponent.js";

const app = Vue.createApp({
    data(){
        return{
            currentTab: 'order',
            tabs: [
                {
                    id: "order",
                    name: "訂單相關"
                },
                {
                    id: "account",
                    name: "帳號相關"
                },
                {
                    id: "payment",
                    name: "付款相關"
                }
                ]
        }
    }

});

app.component('qaComponent', QAComponent);
app.mount('#app');

$(function(){
    $('.accordion-header').click(function(){
        if($(this).next().is(':visible')){
            $(this).next().slideUp();
            $(this).find('.v').css('transform', 'rotate(0deg)');
        }else{
            $(this).next().slideDown();
            $(this).find('.v').css('transform', 'rotate(90deg)');
        }
    })
    $('.accordion-header').first().click();
});
