import api from '../../api'
import * as types from '../mutation-types'
import router from '../../router'

// initial state
const state = {
  all: [],
  loaded: false,
  card: null,
  cardLoaded: false
}
 
// getters
const getters = {
  allCards: state => state.all,
  allCardsLoaded: state => state.loaded,
  card: state => state.card,
  cardLoaded: state => state.cardLoaded
}
 
 
// actions
const actions = {
  getAllCards ({ commit }) {
    api.getCards(cards => {
      commit(types.STORE_FETCHED_CARDS, { cards })
      commit(types.CARDS_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  },
  getCard({ commit }) {
    api.getCard(router.currentRoute.params.id, card => {
      commit(types.STORE_FETCHED_CARD, { card })
      commit(types.CARD_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  }
}
 
// mutations
const mutations = {
  [types.STORE_FETCHED_CARDS] (state, { cards }) {
    state.all = cards
  },
 
  [types.CARDS_LOADED] (state, val) {
    state.loaded = val
  },

  [types.STORE_FETCHED_CARD] (state, { card }) {
    state.card = card[0]
  },

  [types.CARD_LOADED] (state, val) {
    state.loaded = val
  }
}
 
export default {
  state,
  getters,
  actions,
  mutations
}