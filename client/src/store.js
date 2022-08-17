import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './redux/reducers/rootReducer'

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (e) {
    console.log(e)
  }
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    console.log(e)
    return undefined
  }
}

const middlewares = [thunk]

const persistedState = loadFromLocalStorage()

export const store = createStore(
  rootReducer,
  persistedState,
  compose(applyMiddleware(...middlewares))
)

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
