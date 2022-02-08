import { createStore, combineReducers, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer } from "./reducers/userReducer";

import thunk from "redux-thunk";

const reducer = combineReducers({
  userLogin: userLoginReducer,
});

const initialState = {};

const middleware = [thunk];

//creating a redux store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
