import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

import { reducer } from '../reducers/index'

type Reducer = typeof reducer;

const configureStore = () => {
  return createStore(reducer, devToolsEnhancer())
}

export default configureStore;