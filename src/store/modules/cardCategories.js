import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  loaded: false
}

// getters
const getters = {
  // Returns an array all cardCategories
  allCardCategories: state => state.all,
  allCardCategoriesLoaded: state => state.loaded
}

// actions
const actions = {
  getAllCardCategories ({ commit }) {
    api.getCardCategories(cardCategories => {
      commit(types.STORE_FETCHED_CARD_CATEGORIES, { cardCategories })
      commit(types.CARD_CATEGORIES_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  }
}

// mutations
const mutations = {
  [types.STORE_FETCHED_CARD_CATEGORIES] (state, { cardCategories }) {
    state.all = cardCategories
  },

  [types.CARD_CATEGORIES_LOADED] (state, bool) {
    state.loaded = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
