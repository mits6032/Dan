import {
  Platform,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Meteor, { Accounts } from 'react-native-meteor';
import I18n from '../i18n';
import { API_URL } from '../utils';

import {
  CARS_REQUEST,
  CARS_SUCCESS,
  CARS_FAILURE,
  CAR_BOOKING_REQUEST,
  CAR_BOOKING_SUCCESS,
  CAR_BOOKING_FAILURE,
  MY_BOOKING_CARS_REQUEST,
  MY_BOOKING_CARS_SUCCESS,
  MY_BOOKING_CARS_FAILURE
} from './actionTypes';


export function getCars(options = {}) {

  return (dispatch) => {

    dispatch({ type: CARS_REQUEST })

    return fetch( API_URL + 'cars', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(options),
     })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log('products', responseJson);
        dispatch({ type: CARS_SUCCESS, data: responseJson.data })
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: CARS_FAILURE })

      });


  }



}


export function bookCar(options) {

  return (dispatch) => {

    dispatch({ type: CAR_BOOKING_REQUEST })

    return fetch( API_URL + 'carBooking', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(options)
     })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log('getPropertyTypes', responseJson);
         if(responseJson.status == 'success'){
           dispatch({ type: CAR_BOOKING_SUCCESS });
           Actions.confirmation()
         } else {
           dispatch({ type: CAR_BOOKING_FAILURE });

           Alert.alert(
             I18n.t('error'),
             I18n.t('error_text'),
             [{ text:  I18n.t('ok') }]
           );

         }

      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: CAR_BOOKING_FAILURE })

      });


  }

}


export function getCarBookings(userId) {

  return (dispatch) => {

    dispatch({ type: MY_BOOKING_CARS_REQUEST })

    return fetch( API_URL + 'carBookings/' + userId)
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({ type: MY_BOOKING_CARS_SUCCESS, data: responseJson.data })
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: MY_BOOKING_CARS_FAILURE })
      });


  }

}
