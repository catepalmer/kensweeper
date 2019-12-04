import { applyMiddleware, createStore, Reducer } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { reducer } from '../reducers/index';
import checkForBlankEpic from '../epics/checkForBlank';

const epicMiddleware = createEpicMiddleware();

const configureStore = () => {
  const store = createStore(
    reducer as Reducer,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(checkForBlankEpic);

  return store;
}

export default configureStore;
