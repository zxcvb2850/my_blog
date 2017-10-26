/**
 * Created by wang on 2017/10/25.
 */

import * as types from './mutation-types'

const mutations = {
  [types.SET_ARTICLE](state, article){
    state.article = article
  },
  [types.SET_PATHROUTER](state, router){
    state.pathRouter = router
  }
};

export default mutations;
