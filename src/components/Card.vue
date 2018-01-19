<template>
    <div class="card-full d-flex">
        <div class="card-full-content">
            <a href="#" class="card-close" @click="closeCard(card)"><i class="icon-close"></i></a>
            <h1 class="card-name" >{{card.title.rendered}}</h1>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import isotope from 'vueisotope'
import { EventBus } from '../event-bus.js'

export default {
    computed: {
        ...mapGetters({
        card: 'card',
        cardLoaded : 'cardLoaded',
        })
    },
    created(){
       this.$store.dispatch('getCard')
    },
    watch: {
        card: {
            handler(val){
                EventBus.$emit('cardLoaded')
            },
            deep: true
        }
    },
    methods: {
        closeCard() {
            EventBus.$emit('closingCard')

            setTimeout(function(){
                this.$router.push('/')
            }.bind(this), 500)

            setTimeout(function(){
                EventBus.$emit('cardClosed')
            }.bind(this), 1500)

        }
    }
}
</script>