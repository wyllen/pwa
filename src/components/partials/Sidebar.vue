<template>
    <div class="sidebar">
        <div class="sidebar__top">
            <img v-bind:src=" assetsPath + 'images/logo_text_white.svg' " alt="" class="text-logo">
            <router-link to="/" class="city-thumbnail"  v-bind:style="{backgroundImage : 'url('+assetsPath + 'images/rabat-thumbnail.png)' }">
                <span>Rabat</span>
            </router-link>
        </div>
        <div class="sidebar__nav">
            <cards-filters></cards-filters>
        </div>
    </div>
</template>

<script>
import CardsFilters from './CardsFilters'

export default {
  components: {
    cardsFilters: CardsFilters,
  },
  created(){
    this.$store.dispatch('getAllCardCategories')
  }
}
</script>