import {createStore,applyMiddleware} from 'redux'
import reducre from './reducre'
import thunk from 'redux-thunk'
export default createStore(reducre,applyMiddleware(thunk))