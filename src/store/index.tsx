import { createStore, Reducer } from 'redux'

import { reducer } from '../reducers/index'

const configureStore = () => {
  return createStore(reducer as Reducer)
}

export default configureStore;
