import {
  PROPERTIES_REQUEST,
  PROPERTIES_FAILURE,
  PROPERTIES_SUCCESS,
  CITIES_REQUEST,
  CITIES_SUCCESS,
  CITIES_FAILURE,
  PROPERTY_TYPES_REQUEST,
  PROPERTY_TYPES_SUCCESS,
  PROPERTY_TYPES_FAILURE,
  PROPERTY_BOOKING_REQUEST,
  PROPERTY_BOOKING_SUCCESS,
  PROPERTY_BOOKING_FAILURE,
  MY_BOOKING_PROPERTIES_FAILURE,
  MY_BOOKING_PROPERTIES_REQUEST,
  MY_BOOKING_PROPERTIES_SUCCESS
 } from '../actions/actionTypes';


 
export function properties(state = [] , action) {
    if(action.type == PROPERTIES_SUCCESS){
      return action.data;
    }
    return state;
 }

 export function cities(state = [] , action) {
     if(action.type == CITIES_SUCCESS){
       return action.data;
     }
     return state;
}

export function propertyTypes(state = [] , action) {
    if(action.type == PROPERTY_TYPES_SUCCESS){
      return action.data;
    }
    return state;
}


export function isFetchingProperties(state = false, action) {

  switch (action.type){
    case PROPERTIES_REQUEST:
      return true;
    case PROPERTIES_FAILURE:
      return false;
    case PROPERTIES_SUCCESS:
      return false;
    default:
      return state;
  }

}


export function isBookingProperty(state = false, action) {

  switch (action.type){
    case PROPERTY_BOOKING_REQUEST:
      return true;
    case PROPERTY_BOOKING_FAILURE:
      return false;
    case PROPERTY_BOOKING_SUCCESS:
      return false;
    default:
      return state;
  }

}

export function propertyBookings(state = [] , action) {
    if(action.type == MY_BOOKING_PROPERTIES_SUCCESS){
      return action.data;
    }
    return state;
 }

 export function isFetchingBookingProperties(state = false, action) {

   switch (action.type){
     case MY_BOOKING_PROPERTIES_REQUEST:
       return true;
     case MY_BOOKING_PROPERTIES_FAILURE:
       return false;
     case MY_BOOKING_PROPERTIES_SUCCESS:
       return false;
     default:
       return state;
   }

 }
