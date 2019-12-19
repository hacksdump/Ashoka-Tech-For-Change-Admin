import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import firebaseSaga from 'sagas/firebaseSaga';


const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage
};



const persistedReducer = persistReducer(persistConfig, rootReducer);

const initializeSagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, storeEnhancers(
  applyMiddleware(initializeSagaMiddleware)
));

initializeSagaMiddleware.run(firebaseSaga);

export const persistor = persistStore(store);

export default store;
