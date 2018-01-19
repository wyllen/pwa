<template>
    <isotope v-if="allCardsLoaded" id="root_isotope" class="isoDefault cards-grid d-flex" :options='getOptions()' :list="allCards">
            <div v-for="card in allCards" :key="card.id" :class="{ expanded:isActive(card) }"  @click="loadCard(card)">
                <b-card>
                    <div slot="header" class="card-thumbnail" v-bind:style="{backgroundImage : 'url('+ card.thumbnail +')' }">
                    </div>
                    <h2 class="card-name">{{card.title.rendered}}</h2>
                    <div class="card-category" ><i :class="'fa '+card.card_category.icon"></i></div>
                    <div class="card-excerpt" v-html="card.excerpt.rendered"></div>
                </b-card>
            </div>
    </isotope>  
</template>

<script>
import { mapGetters } from 'vuex'

import isotope from 'vueisotope'
import { EventBus } from '../event-bus.js'

export default {
    computed: {
        ...mapGetters({
        allCards: 'allCards',
        allCardsLoaded: 'allCardsLoaded'
        })
    },    
    components: {
        isotope,
    },
    data: function(){
        return{
            selected: null,
            filterCategory: ""
        }
    },    
    mounted () {
        EventBus.$on('filter', function (category) {
            this.filter('filterByCategory', category)
        }.bind(this))
    },
	methods: {
		getOptions() {
			var _this = this
			return {
				layoutMode: 'masonry',
                percentPosition: true,
	          	masonry: {
	            	gutter: 0
	          	},
				getSortData: {
	        		id: "id",
	        		title: function(itemElem){
	        			return itemElem.title.rendered     
	        		}
	        	},
	      		getFilterData:{
	      			filterByCategory: function(itemElem){
	        			return itemElem.card_category.slug == _this.filterCategory
	        		}
	      		}
	      	}
		},        
		filter : function (key, value){
            console.log(key)
            if(value == this.filterCategory){
                this.$children[0].unfilter()
                this.filterCategory = ""
            }else{
			    this.$children[0].filter(key)
                this.filterCategory = value
            }
		},
        loadCard: function(card){
            this.selected = card

            setTimeout(function(){
                EventBus.$emit('cardLoading')
            }.bind(this), 750)

            setTimeout(function(){
                this.$router.push('/card/'+card.slug)
            }.bind(this), 1050)
        },
        isActive: function(card){
            if(this.selected == card){
                return true
            }else{
                return false
            }
        }
	},
    created(){
       this.$store.dispatch('getAllCards')
    }
}
</script>

<style lang="scss">
    .jumbotron {
        margin-top: 5%;
    }
</style>