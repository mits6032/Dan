import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
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


const services = [
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
class Booking extends Component<Props> {


  constructor(props){
     super(props);
     this.inputRefs = {};
     this.state = {
       services: [],
       total: 0
     }
  }

  componentWillMount(){
    const price = this.props.property.price;
    this.setState({ total: price });
  }


  addService(value){
    let services = this.state.services;
    let total = parseInt(this.state.total);

    let index = services.indexOf(value);
    if(index == -1){
      services.push(value);
      if(value == 'reception'){
         total = total + 100
      }
    } else {
      services.splice(index, 1);
      if(value == 'reception'){
         total = total - 100
      }
    }
    this.setState({ services: services, total: total });
  }


   book(){

     const { property, rooms, priceMin, priceMax, adults, children, typeId, cityId, departureDate, arrivalDate, user } = this.props;
     const { total, services } = this.state;

     this.props.bookProperty({
          userId: user._id,
          property: property,
          propertyId: property._id,
          adults: adults,
          children: children,
          departureDate: departureDate,
          arrivalDate: arrivalDate,
          price: property.price,
          total: total,
          services: services,
          createdAt: moment(),
          status: 'pending'
     });
   }

  render() {

     const self = this;
     const { property, departureDate, arrivalDate, adults, children } = this.props;

     if(this.props.loading){
        return <Spinner />
     }


    return (
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.padding}>

        <View style={styles.bookingProperty}>

         <Image source={{ uri: property.image }}  style={styles.bookingPropertyImage}  />

         <View style={styles.bookingPropertyInfo}>
            <Text style={styles.bookingPropertyName}>{property.title}</Text>
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
              <Text style={styles.summaryRowText}>{I18n.t('city')}</Text>
            </View>

            <View style={styles.summaryColRight}>
              <Text style={styles.summaryRowText}>{property.cityName}</Text>
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


          <Text style={styles.yourDetailsTitle}>{I18n.t('your_details')}</Text>

          <View style={styles.yourDetailsRow}>
            <Text style={styles.yourDetailsText}>{this.props.user.profile.fullName}</Text>
          </View>

          <View style={styles.yourDetailsRow}>
            <Text style={styles.yourDetailsText}>{this.props.user.emails[0].address}</Text>
          </View>

          <View style={styles.yourDetailsRow}>
            <Text style={styles.yourDetailsText}>{this.props.user.profile.mobile}</Text>
          </View>


          <Text style={styles.servicesTitle}>{I18n.t('add_service')}</Text>

        {services.map(function(item,i){

            return(<TouchableWithoutFeedback onPress={() => self.addService(item.key)} >
                <View style={styles.service}>
                  <View style={{ flex: 0.2}}>
                  <Image source={item.image} style={styles.serviceImage} />
                  </View>
                  <View style={{ flex: 0.6}}>
                  <Text style={styles.serviceName}>{item.title}</Text>
                  <Text style={styles.serviceAmount}>{I18n.t('riyals')} {item.amount}</Text>
                  </View>
                  <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'flex-end'}}>
                   { self.state.services.indexOf(item.key) != -1 && <Icon name="check-circle" style={styles.check}  /> }
                  </View>
                </View>  
              </TouchableWithoutFeedback>)

        })}




        </ScrollView>



        <View style={styles.total}>

            <View style={{ flex:  0.5 }}>
              <Text style={styles.totalText}>{I18n.t('total')}</Text>
            </View>

            <View style={{ flex:  0.5, alignItems: 'flex-end' }}>
              <Text style={styles.totalValue}>{this.state.total} {I18n.t('riyals')}</Text>
            </View>

        </View>


        <View style={styles.footer}>
          <TouchableOpacity
          style={styles.bookButton}
          onPress={() => this.book()}
          >
              <Text style={styles.bookButtonText}>{I18n.t('book_confirmation')}</Text>
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
