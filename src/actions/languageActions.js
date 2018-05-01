import {
  Platform,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import {
  SET_LANGUAGE,
} from './actionTypes';


export function setLanguage(locale) {

  return (dispatch) => {

    dispatch({
      type: SET_LANGUAGE,
      locale: locale
     })

  }

}
