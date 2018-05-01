import { SET_LANGUAGE } from '../actions/actionTypes';

export function language(state = 'en', action) {

  if(action.type == SET_LANGUAGE){
     return action.locale
  }

  return state

}
