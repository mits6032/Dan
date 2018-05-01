import {
  Platform,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Meteor, { Accounts } from 'react-native-meteor';
import I18n from '../i18n';
import { API_URL } from '../utils';

import {
  PROPERTIES_REQUEST,
  PROPERTIES_SUCCESS,
  PROPERTIES_FAILURE,
  CITIES_REQUEST,
  CITIES_SUCCESS,
  CITIES_FAILURE,
  PROPERTY_TYPES_REQUEST,
  PROPERTY_TYPES_SUCCESS,
  PROPERTY_TYPES_FAILURE,
  PROPERTY_BOOKING_REQUEST,
  PROPERTY_BOOKING_SUCCESS,
  PROPERTY_BOOKING_FAILURE,
  MY_BOOKING_PROPERTIES_REQUEST,
  MY_BOOKING_PROPERTIES_SUCCESS,
  MY_BOOKING_PROPERTIES_FAILURE
} from './actionTypes';


export function getProperties(options) {

  return (dispatch) => {

    dispatch({ type: PROPERTIES_REQUEST })

    return fetch( API_URL + 'properties', {
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
        dispatch({ type: PROPERTIES_SUCCESS, data: responseJson.data })
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: PROPERTIES_FAILURE })

      });


  }



}


export function getCities() {

  return (dispatch) => {

    dispatch({ type: CITIES_REQUEST })

    return fetch( API_URL + 'cities', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
     })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log('products', responseJson);
        dispatch({ type: CITIES_SUCCESS, data: responseJson.data })
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: CITIES_FAILURE })

      });


  }

}


export function getPropertyTypes() {

  return (dispatch) => {

    dispatch({ type: PROPERTY_TYPES_REQUEST })

    return fetch( API_URL + 'properties/types', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
     })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log('getPropertyTypes', responseJson);
        dispatch({ type: PROPERTY_TYPES_SUCCESS, data: responseJson.data })
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: PROPERTY_TYPES_FAILURE })

      });


  }

}



export function bookProperty(options) {

  return (dispatch) => {

    dispatch({ type: PROPERTY_BOOKING_REQUEST })

    return fetch( API_URL + 'propertyBooking', {
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
           dispatch({ type: PROPERTY_BOOKING_SUCCESS });
           Actions.confirmation()
         } else {
           dispatch({ type: PROPERTY_BOOKING_FAILURE });

           Alert.alert(
             I18n.t('error'),
             I18n.t('error_text'),
             [{ text:  I18n.t('ok') }]
           );

         }

      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: PROPERTY_BOOKING_FAILURE })

      });


  }

}


export function getPropertyBookings(userId) {

  return (dispatch) => {

    dispatch({ type: MY_BOOKING_PROPERTIES_REQUEST })

    return fetch( API_URL + 'propertyBookings/' + userId)
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({ type: MY_BOOKING_PROPERTIES_SUCCESS, data: responseJson.data })
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: MY_BOOKING_PROPERTIES_FAILURE })

      });


  }



}
