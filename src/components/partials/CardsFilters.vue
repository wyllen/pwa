<template>
    <b-list-group class="filters">
            <b-list-group-item v-for="category in allCardCategories" :key="category.id" href="#" @click="filter(category.slug)" :class="[filterCategory===category.slug ? 'is-checked' : '']+' d-flex justify-content-between align-items-center'">
                <i :class="'filter-icon fa '+category.acf.icon"></i>
                {{category.name}}
                <b-badge variant="primary" class="ml-auto" pill>{{category.count}}</b-badge>
            </b-list-group-item>
    </b-list-group>
</template>


<script>
import { mapGetters } from 'vuex'
import { EventBus } from '../../event-bus.js';

export default {
    data: function(){
        return{
            filterCategory: ""
        }
    },
    computed: {
        ...mapGetters({
        allCardCategories: 'allCardCategories',
        allCardCategoriesLoaded: 'allCardCategoriesLoaded'
        })
    },  
	methods: {
		filter(category) {
            if(this.filterCategory == category){
                this.filterCategory = ''
            }else{
                this.filterCategory = category
            }
            EventBus.$emit('filter', category)
		}
	}
}
</script>