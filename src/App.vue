<template>
  <div id="my-app" class="page-wrapper">
    <transition
      name="loader-animation"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
      <div class="progress loader" v-if="showLoader">
        <div class="progress-bar" role="progressbar" :style="loaderStyle" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </transition>

    
    <div class="page-content-wrapper d-flex" :class="{cardLoading: cardLoading ,closingCard : closingCard }">
        <app-sidebar></app-sidebar>
        <b-col class="main-content d-flex">
            <router-view></router-view>
        </b-col>
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Sidebar from './components/partials/Sidebar'

import { EventBus } from './event-bus.js'

export default {
  data() {
    return {
      showLoader: true,
      cardLoading: false,
      closingCard : false
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      loadingProgress: 'loadingProgress'
    }),

    loaderStyle() {
      return `width: ${this.loadingProgress}%;`
    }
  },  

  mounted () {
      EventBus.$on('cardLoading', function () {
          this.cardLoading = true
      }.bind(this))
      EventBus.$on('cardLoaded', function () {
          this.cardLoading = false
      }.bind(this))

      EventBus.$on('closingCard', function () {
          this.closingCard = true
      }.bind(this))

      EventBus.$on('cardClosed', function () {
          this.closingCard = false
      }.bind(this))

  },

  components: {
    appSidebar: Sidebar,
  },

  watch: {
    // watch the value of isLoading and once it's false hide the loader
    isLoading(val) {
      if (val == false) {
        let self = this
        setTimeout(function(){
          self.showLoader = false
        }, 750)
      }
    }
  }
}
</script>
<style lang="scss">
  @import './styles/app.scss';
</style>
