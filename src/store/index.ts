import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';


const configureStore = (preloadedState: any) =>
  createStore(rootReducer, preloadedState, composeWithDevTools(
    applyMiddleware(logger, thunk)
  ));

export { configureStore };
