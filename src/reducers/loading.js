import { LOADING_BEGIN, LOADING_END } from '../actions/actionTypes';

export function loading(state = false, action) {

  switch (action.type) {
    case LOADING_BEGIN:
      return true;
    case LOADING_END:
      return false;        
    default:
      return state
  }

}