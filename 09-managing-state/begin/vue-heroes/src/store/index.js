import Vue from 'vue';
import Vuex from 'vuex';
import { dataService } from '../shared';
import {
  GET_HEROES_ACTION,
  ADD_HERO_ACTION,
  UPDATE_HERO_ACTION,
  DELETE_HERO_ACTION,
} from './action_types';
import {
  GET_HEROES,
  ADD_HERO,
  UPDATE_HERO,
  DELETE_HERO,
} from './mutation-types';

Vue.use(Vuex);

const state = {
  heroes: [],
};
const mutations = {
  [GET_HEROES](state, heroes) {
    state.heroes = heroes;
  },
  [ADD_HERO](state, hero) {
    state.heroes.push(hero);
  },
  [UPDATE_HERO](state, hero) {
    const index = state.heroes.findIndex(h => h.id === hero.id);
    state.heroes.splice(index, 1, hero);
  },
  [DELETE_HERO](state, heroId) {
    state.heroes = [...state.heroes.filter(h => h.id !== heroId)];
  },
};
const actions = {
  async [GET_HEROES_ACTION]({ commit }) {
    const heroes = await dataService.getHeroes();
    commit(GET_HEROES, heroes);
  },
  async [ADD_HERO_ACTION]({ commit }, hero) {
    const added = await dataService.addHero(hero);
    commit(ADD_HERO, added);
  },
  async [UPDATE_HERO_ACTION]({ commit }, hero) {
    const updated = await dataService.updateHero(hero);
    commit(UPDATE_HERO, updated);
  },
  async [DELETE_HERO_ACTION]({ commit }, hero) {
    const id = await dataService.deleteHero(hero);
    commit(DELETE_HERO, id);
  },
};
const getters = {
  getHeroById: state => id => state.heroes.find(h => h.id === id),
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
});
