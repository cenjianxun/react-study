import { compose, legacy_createStore as createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import { rootSaga } from './root-saga'
import { rootReducer } from './root-reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

//root-reducer

const persistConfig = {
    key: 'root', // 开始的入口层
    storage,
    whitelist: ['cart'] //可能产生冲突
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

// 如果想用自己建的中间件就import middleware，用[loggerMiddleware]
// 调节当生产的时候才打印中间的log
const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware,
].filter(Boolean)

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))
export const store  = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)