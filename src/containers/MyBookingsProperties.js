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
import { getPropertyBookings } from '../actions/propertiesActions';
import { Spinner } from '../components/Spinner';

import { styles } from '../theme/styles';
import I18n from '../i18n';

class MyBookingsProperties extends Component<{}> {


  componentWillMount(){

    const { rooms, priceMin, priceMax, adults, children, typeId, cityId, departureDate, arrivalDate } = this.props;

    const userId = this.props.user._id;
    this.props.getPropertyBookings(userId);

  }

  renderItem({ item, index}){

     return(
       <TouchableOpacity
         style={styles.booking}
         onPress={() => Actions.bookingPropertyDetails(item)}
       >

        <Image source={{ uri: item.property.image }}  style={styles.bookingImage}  />

        <View style={styles.bookingInfo}>
           { item.createdAt ? <Text style={styles.bookingDate}>{moment(item.createdAt).format('LL')}</Text> : null }
           <Text style={styles.bookingCarName}>{item.property.title}</Text>
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
    bookings: state.propertyBookings,
    loading: state.isFetchingBookingProperties
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPropertyBookings } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingsProperties);
