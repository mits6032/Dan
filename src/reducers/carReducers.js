import {
  CARS_REQUEST,
  CARS_FAILURE,
  CARS_SUCCESS,
  CAR_BOOKING_REQUEST,
  CAR_BOOKING_SUCCESS,
  CAR_BOOKING_FAILURE,
  MY_BOOKING_CARS_REQUEST,
  MY_BOOKING_CARS_SUCCESS,
  MY_BOOKING_CARS_FAILURE
 } from '../actions/actionTypes';


 
export function cars(state = [] , action) {
    if(action.type == CARS_SUCCESS){
      return action.data;
    }
    return state;
 }


export function isFetchingCars(state = false, action) {

  switch (action.type){
    case CARS_REQUEST:
      return true;
    case CARS_FAILURE:
      return false;
    case CARS_SUCCESS:
      return false;
    default:
      return state;
  }

}


export function isBookingCar(state = false, action) {

  switch (action.type){
    case CAR_BOOKING_REQUEST:
      return true;
    case CAR_BOOKING_FAILURE:
      return false;
    case CAR_BOOKING_SUCCESS:
      return false;
    default:
      return state;
  }

}


export function carBookings(state = [] , action) {
    if(action.type == MY_BOOKING_CARS_SUCCESS){
      return action.data;
    }
    return state;
 }

 export function isFetchingBookingCars(state = false, action) {

   switch (action.type){
     case MY_BOOKING_CARS_REQUEST:
       return true;
     case MY_BOOKING_CARS_FAILURE:
       return false;
     case MY_BOOKING_CARS_SUCCESS:
       return false;
     default:
       return state;
   }

 }
