import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import { Router, Drawer, Stack, Scene, Actions } from 'react-native-router-flux';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor';
import SplashScreen from 'react-native-splash-screen';

import { styles } from '../theme/styles';
import I18n from '../i18n';
import { NAV_BAR_BUTTON_COLOR, PRIMARY_COLOR } from '../theme/colors';

import DrawerContent from './DrawerContent';
import Sections from './Sections';
import About from './About';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import Languages from './Languages';
import TermsAndConditions from './TermsAndConditions';
import Properties from './Properties';
import PropertiesFilter from './PropertiesFilter';
import PropertyDetails from './PropertyDetails';
import Booking from './Booking';
import Confirmation from './Confirmation';
import MyBookings from './MyBookings';
import BookingPropertyDetails from './BookingPropertyDetails';
import Pay from './Pay';
import CarsFilter from './CarsFilter';
import Cars from './Cars';
import CarBooking from './CarBooking';
import BookingCarDetails from './BookingCarDetails';
import Account from './Account';


Meteor.connect('ws://ec2-54-88-77-231.compute-1.amazonaws.com/websocket');
//Meteor.connect('ws://localhost:3000/websocket');


type Props = {};
class App extends Component<Props> {

  constructor(props){
    super(props);
    StatusBar.setBarStyle('light-content');
  }

  componentDidMount() {
      //SplashScreen.hide();
  }

  onEnter(){
    if(this.props.signedIn == true){
      Actions.sections();
    }
  }

  render() {
    return (
      <Router
        navigationBarStyle={styles.navigationBarStyle}
        sceneStyle={styles.sceneStyle}
        navBarButtonColor={NAV_BAR_BUTTON_COLOR}
      >

        <Stack key={'root'} hideNavBar>

        <Drawer key="drawer" contentComponent={DrawerContent} navBarButtonColor={'white'}>
          <Scene key="sections" component={Sections} title={I18n.t('sections')}/>

          <Stack key="myBookings" back>
            <Scene key="_myBookings" component={MyBookings} title={I18n.t('my_bookings')}/>
            <Scene key="bookingPropertyDetails" component={BookingPropertyDetails}  title={I18n.t('booking_details')} back />
            <Scene key="bookingCarDetails" component={BookingCarDetails}  title={I18n.t('booking_details')} back />
            <Scene key="pay" component={Pay}  title={I18n.t('pay')} back />
          </Stack>
          <Scene key="account" component={Account} title={I18n.t('my_account')} back  />
          <Scene key="about" component={About} title={I18n.t('about')} back  />
        </Drawer>


        <Stack key="propertiesFilter" back>
          <Scene key="_propertiesFilter" component={PropertiesFilter} title={I18n.t('tourist_housing')} back />
          <Scene key="properties" component={Properties} title={I18n.t('tourist_housing')} />
          <Scene key="propertyDetails" component={PropertyDetails} back />
          <Scene key="booking" component={Booking}  title={I18n.t('booking')} back />
        </Stack>

        <Stack key="carsFilter" back>
          <Scene key="_carsFilter" component={CarsFilter} title={I18n.t('car_rental')} back />
          <Scene key="cars" component={Cars} title={I18n.t('car_rental')} />
          <Scene key="carBooking" component={CarBooking} title={I18n.t('car_rental')} />
        </Stack>


          <Stack
            key="signIn"
             initial
             navigationBarStyle={{ elevation: 0 }}
             navTransparent
             navBarButtonColor={PRIMARY_COLOR}
          >

            <Scene
              key="_signIn"
              component={SignIn}
              rightTitle={I18n.t('languages')}
              onRight={() => Actions.languages()}
              panHandlers={null}
              onEnter={() => this.onEnter()}
             />

            <Scene
              key="signUp"
              component={SignUp}
              panHandlers={null}
              back
            />

            <Scene key="termsAndConditions" component={TermsAndConditions} title={I18n.t('terms_and_conditions')} navTransparent={false} back  />
            <Scene key="forgotPassword" component={ForgotPassword} panHandlers={null} back />

          </Stack>

          <Stack
            key="languages"
            navigationBarStyle={{ elevation: 0 }}
            navBarButtonColor={'white'}
            back
          >
           <Scene key="languages" component={Languages} panHandlers={null} navTransparent  />
          </Stack>

          <Stack key="confirmation" hideNavBar >
           <Scene key="_confirmation" component={Confirmation} panHandlers={null}  />
          </Stack>

        </Stack>
      </Router>
    );
  }


}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    signedIn: state.signedIn
  }
}

export default connect(mapStateToProps)(App);
