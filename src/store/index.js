import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import firebaseSaga from 'sagas/firebaseSaga';

const initializeSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, storeEnhancers(
  applyMiddleware(initializeSagaMiddleware)
));

initializeSagaMiddleware.run(firebaseSaga);

export default store;
