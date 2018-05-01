import {
  Platform,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Meteor, { Accounts } from 'react-native-meteor';
import I18n from '../i18n';
import { API_URL } from '../utils';

import {
  LOADING_BEGIN,
  LOADING_END,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_OUT,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE
} from './actionTypes';


export function signIn(user,password) {



  return (dispatch) => {

    dispatch({ type: SIGN_IN_REQUEST });

     Meteor.loginWithPassword(user, password,  function(error){

         if(error){
           dispatch({ type: SIGN_IN_FAILURE });

           Alert.alert(
             I18n.t('error'),
             error.reason,
             [{ text:  I18n.t('ok') }]
           );

         } else {

           dispatch({
             type: SIGN_IN_SUCCESS,
             data: Meteor.user()
           });

           Actions.sections();

         }

     });


  }

}



export function signUp(options) {

  return (dispatch) => {

    dispatch({ type: SIGN_UP_REQUEST });

     Accounts.createUser(options, function(error){

         if(error){

           dispatch({ type: SIGN_UP_FAILURE });

           Alert.alert(
             I18n.t('error'),
             error.reason,
             [{ text:  I18n.t('ok') }]
           );

         } else {

           dispatch({ type: SIGN_UP_SUCCESS });
           setTimeout(() => Actions.signIn() , 100);

         }

     });


  }

}

export function signOut() {

  return (dispatch) => {
    dispatch({ type: SIGN_OUT });
    setTimeout(() => Actions.signIn() , 100);
  }

}



export function updateAccount(options) {

  return (dispatch) => {

    dispatch({ type: UPDATE_ACCOUNT_REQUEST })

    return fetch( API_URL + 'user/update',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.status == 'success'){
          dispatch({ type: UPDATE_ACCOUNT_SUCCESS, data: {
            emails: [{ address:  options.email}],
            profile: {
              mobile: options.mobile,
              fullName: options.fullName
            }
          } });

          Actions.pop();
        } else {
          dispatch({ type: UPDATE_ACCOUNT_FAILURE })
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: UPDATE_ACCOUNT_FAILURE })
      });


  }

}
