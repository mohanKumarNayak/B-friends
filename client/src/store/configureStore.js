import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import usersReducers from '../reducers/userReducers'
import clientReducers from '../reducers/clientReducers'
import allClientReducers from '../reducers/allClientReducers'

const configureStore = () => {
    const store = createStore(combineReducers({
        user : usersReducers,
        client : clientReducers,
        allClient : allClientReducers
        
    }),applyMiddleware(thunk))
    return store
}

export default configureStore