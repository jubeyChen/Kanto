export default{
    props: ['currentTab', 'currentTabName', 'orderQa', 'accountQa', 'paymentQa'],
    emits: ['accordion'],
    
    data(){
        return{}
    },

    computed: {
        current_tab_component(){
            return this.currentTab + "Qa"
        }
    },

    template: `
        <h4>{{ this.currentTabName }}</h4>
    
        <div class="accordion-item" v-for="(item, index) in this[current_tab_component]" :key="index">
            <p class="accordion-header" @click="$emit('accordion', $event)">{{ item.q }} <span class="v"></span><span class="h"></span></p>
            <div class="accordion-content">
                <p style="white-space: pre-line;">{{ item.a }}</p>
            </div>
        </div>

    `
}