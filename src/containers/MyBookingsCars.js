import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { getCarBookings } from '../actions/carsActions';
import { Spinner } from '../components/Spinner';

import { styles } from '../theme/styles';
import I18n from '../i18n';

class MyBookingsCars extends Component<{}> {


  componentWillMount(){

    const { rooms, priceMin, priceMax, adults, children, typeId, cityId, departureDate, arrivalDate } = this.props;

    const userId = this.props.user._id;
    this.props.getCarBookings(userId);

  }

  renderItem({ item, index}){

     return(
       <TouchableOpacity
         style={styles.booking}
         onPress={() => Actions.bookingCarDetails(item)}
       >
        <Image source={{ uri: item.car.image }}  style={styles.bookingImage}  />

        <View style={styles.bookingInfo}>
           { item.createdAt ? <Text style={styles.bookingDate}>{moment(item.createdAt).format('LL')}</Text> : null }
           <Text style={styles.bookingCarName}>{item.car.title}</Text>
           <Text style={styles.bookingPrice}>{I18n.t('riyals')} {item.total}</Text>
        </View>

       </TouchableOpacity>
     );
  }

  render() {

    if(this.props.loading){
       return <Spinner />
    }

    if(this.props.bookings.length == 0){
       return(
         <View style={[styles.center, styles.list]}>
              <Text style={styles.noResultsText}>{I18n.t('no_results')}</Text>
        </View>
       );
    }

    return (
      <View style={styles.container}>

        <FlatList
          data={this.props.bookings}
          keyExtractor={(item, index) => item._id }
          renderItem={({ item, index}) => this.renderItem({ item, index})}
        />

      </View>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    bookings: state.carBookings,
    loading: state.isFetchingBookingCars
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCarBookings } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingsCars);
