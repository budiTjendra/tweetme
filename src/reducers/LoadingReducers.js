import { LOADING } from '../actions/types';

const INITIAL_STATE = { isLoading: false, type: null };

console.log('check LOADING: ' + LOADING);
export default (state = INITIAL_STATE, action ) => {
  switch(action.type){
    case LOADING:
        return { ...state, isLoading:payload };
    default:
        return state;
  }
};
