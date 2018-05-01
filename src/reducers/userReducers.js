import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_OUT,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE
 } from '../actions/actionTypes';


 
export function user(state = {} , action) {

  switch (action.type) {

     case SIGN_IN_SUCCESS:
        return action.data;
     case UPDATE_ACCOUNT_SUCCESS:
      return action.data;
      case SIGN_OUT:
        return {};
      default:
        return state
    }

}

export function signedIn(state = false, action) {

  switch (action.type){
    case SIGN_IN_SUCCESS:
      return true;
    case SIGN_OUT:
      return false;
    default:
      return state;
   }

}


export function signingUp(state = false, action) {

  switch (action.type){
    case SIGN_UP_REQUEST:
      return true;
    case SIGN_UP_SUCCESS:
      return false;
    case SIGN_UP_FAILURE:
      return false;
    default:
      return state;
  }

}


export function signingIn(state = false, action) {

  switch (action.type){
    case SIGN_IN_REQUEST:
      return true;
    case SIGN_IN_SUCCESS:
      return false;
    case SIGN_IN_FAILURE:
      return false;
    default:
      return state;
  }

}

export function isUpdatingAcount(state = false, action) {
  switch (action.type){
    case UPDATE_ACCOUNT_REQUEST:
      return true;
    case UPDATE_ACCOUNT_FAILURE:
      return false;
    case UPDATE_ACCOUNT_SUCCESS:
      return false;
    default:
      return state;
  }
}
