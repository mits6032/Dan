import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  I18nManager,
  ScrollView
} from 'react-native';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import RNRestart from 'react-native-restart';
import { bookProperty } from '../actions/propertiesActions';
import { styles } from '../theme/styles';
import I18n from '../i18n';
import { Spinner } from '../components/Spinner';


const servicesA = [
  {
    title: I18n.t('reception_at_airport'),
    key: 'reception',
    image: require('../images/02.png'),
    amount: 100
  },
  {
    title: I18n.t('farewell_at_airport'),
    key: 'farewell',
    image: require('../images/03.png'),
    amount: 0
  }
];

type Props = {};
class BookingPropertyDetails extends Component<Props> {


  render() {

     const self = this;
     const { property, departureDate, arrivalDate, adults, children, status, total, createdAt, _id, services } = this.props;

     if(this.props.loading){
        return <Spinner />
     }


    return (
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.padding}>

        <View style={styles.bookingProperty}>

         <Image source={{ uri: property.image }}  style={styles.bookingPropertyImage}  />

         <View style={styles.bookingPropertyInfo}>
            <Text style={styles.bookingCarName}>{property.title}</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={property.rating}
              maxStars={5}
              starSize={20}
              emptyStarColor="gray"
              emptyStar={'star'}
              fullStarColor="gold"
              containerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-end', marginBottom: 10 }}
             />
             <Text style={styles.bookingPropertyPrice}>{I18n.t('riyals')} {property.price}</Text>
         </View>

        </View>


        <View style={styles.summaryRow}>

          <View style={styles.summaryColLeft}>
            <Text style={styles.summaryRowText}>{I18n.t('date')}</Text>
          </View>

          <View style={styles.summaryColRight}>
            <Text style={styles.summaryRowText}>{moment(createdAt).format('LLL')}</Text>
          </View>

        </View>

        <View style={styles.summaryRow}>

          <View style={styles.summaryColLeft}>
            <Text style={styles.summaryRowText}>{I18n.t('status')}</Text>
          </View>

          <View style={styles.summaryColRight}>
            <Text style={styles.summaryRowText}>{I18n.t(status)}</Text>
          </View>

        </View>

          <View style={styles.summaryRow}>

            <View style={styles.summaryColLeft}>
              <Text style={styles.summaryRowText}>{I18n.t('city')}</Text>
            </View>

            <View style={styles.summaryColRight}>
              <Text style={styles.summaryRowText}>{property.cityName}</Text>
            </View>

          </View>


          <View style={styles.summaryRow}>

            <View style={styles.summaryColLeft}>
              <Text style={styles.summaryRowText}>{I18n.t('residential_unit')}</Text>
            </View>

            <View style={styles.summaryColRight}>
              <Text style={styles.summaryRowText}>{property.typeName}</Text>
            </View>

          </View>


          <View style={styles.summaryRow}>

            <View style={styles.summaryColLeft}>
              <Text style={styles.summaryRowText}>{I18n.t('arrival_date')}</Text>
            </View>

            <View style={styles.summaryColRight}>
              <Text style={styles.summaryRowText}>{arrivalDate}</Text>
            </View>

          </View>

          <View style={styles.summaryRow}>

            <View style={styles.summaryColLeft}>
              <Text style={styles.summaryRowText}>{I18n.t('departure_date')}</Text>
            </View>

            <View style={styles.summaryColRight}>
              <Text style={styles.summaryRowText}>{departureDate}</Text>
            </View>

          </View>


          <View style={styles.summaryRow}>

            <View style={styles.summaryColLeft}>
              <Text style={styles.summaryRowText}>{I18n.t('guests')}</Text>
            </View>

            <View style={styles.summaryColRight}>
              <Text style={styles.summaryRowText}>{I18n.t('adults')}  {'('}{adults}{')'}  {I18n.t('children')}  {'('}{children}{')'}</Text>
            </View>

          </View>

      { services.length > 0 ? <View style={styles.services}>

          <Text style={styles.servicesTitle}>{I18n.t('services')}</Text>

        {servicesA.map(function(item,i){

            if(services.indexOf(item.key) != -1){

            return(<View style={styles.service}>
                  <View style={{ flex: 0.2}}>
                  <Image source={item.image} style={styles.serviceImage} />
                  </View>
                  <View style={{ flex: 0.8}}>
                  <Text style={styles.serviceName}>{item.title}</Text>
                  <Text style={styles.serviceAmount}>{I18n.t('riyals')} {item.amount}</Text>
                  </View>
              </View>)

          } else {
            return null
          }


        })}



        </View> : null }

        </ScrollView>

        <View style={styles.total}>

            <View style={{ flex:  0.5 }}>
              <Text style={styles.totalText}>{I18n.t('total')}</Text>
            </View>

            <View style={{ flex:  0.5, alignItems: 'flex-end' }}>
              <Text style={styles.totalValue}> {I18n.t('riyals')} {total}</Text>
            </View>

        </View>

        { status == 'confirmed' ? <View style={styles.footer}>
          <TouchableOpacity
          style={styles.bookButton}
          onPress={() => Actions.pay()}
          >
              <Text style={styles.bookButtonText}>{I18n.t('pay')}</Text>
          </TouchableOpacity>
        </View> : null}


      </View>
    );
  }


}



const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.isBookingProperty
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ bookProperty } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingPropertyDetails);
