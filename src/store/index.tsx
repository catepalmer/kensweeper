import { applyMiddleware, createStore, Reducer } from 'redux';
import { reducer } from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
import clickSurroundingSquaresSaga from '../sagas/clickSurroundingSquares';

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
    const store = createStore(
        reducer as Reducer,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(clickSurroundingSquaresSaga);

    return store;
};

export default configureStore;
