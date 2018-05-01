import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage' ;
import { reducer as form } from 'redux-form';

import { language } from './languageReducers';
import { user, signedIn, signingUp, signingIn, isUpdatingAcount } from './userReducers';
import { properties, isFetchingProperties, cities, propertyTypes, isBookingProperty, propertyBookings, isFetchingBookingProperties } from './propertiesReducers';
import { cars, isFetchingCars, isBookingCar, carBookings, isFetchingBookingCars } from './carReducers';

const config = {
  key: 'root',
  storage,
  blacklist: [ 'form', 'signingUp', 'signingIn', 'isFetchingProperties', 'isBookingProperty', 'isFetchingBookingProperties', 'isFetchingCars', 'isBookingCar', 'isFetchingBookingCars', 'isUpdatingAcount', 'properties', 'cars']
}

export const reducers = persistCombineReducers(config, {
     user,
     signedIn,
     signingUp,
     signingIn,
     form,
     language,
     isFetchingProperties,
     properties,
     cities,
     propertyTypes,
     isBookingProperty,
     propertyBookings,
     isFetchingBookingProperties,
     isFetchingCars,
     cars,
     isBookingCar,
     carBookings,
     isFetchingBookingCars,
     isUpdatingAcount
   });
