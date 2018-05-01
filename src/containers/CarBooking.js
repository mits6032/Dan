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
import { bookCar } from '../actions/carsActions';
import { styles } from '../theme/styles';
import I18n from '../i18n';
import { Spinner } from '../components/Spinner';




type Props = {};
class CarBooking extends Component<Props> {


  constructor(props){
     super(props);
     this.inputRefs = {};
     this.state = {
       services: [],
       total: 0
     }
  }

  componentWillMount(){
    const total = this.props.total;
    this.setState({ total: total });
  }


  addService(value, amount){
    let services = this.state.services;
    let total = parseInt(this.state.total);

    let index = services.indexOf(value);
    if(index == -1){
      services.push(value);
        total = total + amount;
    } else {
      services.splice(index, 1);
        total = total - amount;
    }
    this.setState({ services: services, total: total });
  }


   book(){

     const { car , dropOffDate, pickingUpDate, user, droppingOff, pickingUp, droppingOffLocation, pickingUpLocation, days } = this.props;

     this.props.bookCar({
        userId: user._id,
        car: car,
        carId: car._id,
        total: this.state.total,
        days: days,
        droppingOff: droppingOff,
        pickingUp: pickingUp,
        dropOffDate: dropOffDate,
        pickingUpDate: pickingUpDate,
        createdAt: moment(),
        status: 'pending',
        services: this.state.services
     });
   }

   getLocationName(id){

     const result = this.props.cities.filter(word => word.length > 6);

   }

  render() {

     const self = this;
     const { car, price, total, pickingUp, pickingUpDate, droppingOff, dropOffDate, size, pickingUpLocation, droppingOffLocation} = this.props;


     const services = [
       {
         title: I18n.t('gps'),
         key: 'gps',
         image: require('../images/02.png'),
         amount: 20
       },
       {
         title: I18n.t('driver'),
         key: 'driver',
         image: require('../images/03.png'),
         amount: 10
       },
       {
         title: I18n.t('seat'),
         key: 'seat',
         image: require('../images/03.png'),
         amount: 20
       },
       {
         title: I18n.t('insurance'),
         key: 'insurance',
         image: require('../images/03.png'),
         amount: size == 'large' ? 30  : 20
       }
     ];

     if(this.props.loading){
        return <Spinner />
     }


    return (
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.padding}>

        <View style={styles.bookingProperty}>

         <Image source={{ uri: car.image }}  style={styles.bookingPropertyImage}  />

         <View style={styles.bookingPropertyInfo}>
            <Text style={styles.bookingCarName}>{car.title}</Text>
             <Text><Text style={styles.bookingPropertyPrice}>{I18n.t('riyals')} {total}</Text></Text>
         </View>

        </View>


          <View style={styles.summaryRow}>

            <View style={styles.summaryColLeft}>
              <Text style={styles.summaryRowText}>{I18n.t('picking_up')}</Text>
            </View>

            <View style={styles.summaryColRight}>
              {pickingUp && <Text style={styles.summaryRowText}>{I18n.t(pickingUp)}</Text>}
            </View>

          </View>

          <View style={styles.summaryRow}>

            <View style={styles.summaryColLeft}>
              <Text style={styles.summaryRowText}>{I18n.t('pick_up_date')}</Text>
            </View>

            <View style={styles.summaryColRight}>
              <Text style={styles.summaryRowText}>{pickingUpDate}</Text>
            </View>

          </View>

          <View style={styles.summaryRow}>

            <View style={styles.summaryColLeft}>
              <Text style={styles.summaryRowText}>{I18n.t('dropping_off')}</Text>
            </View>

            <View style={styles.summaryColRight}>
              { droppingOff && <Text style={styles.summaryRowText}>{I18n.t(droppingOff)}</Text> }
            </View>

          </View>

          <View style={styles.summaryRow}>

            <View style={styles.summaryColLeft}>
              <Text style={styles.summaryRowText}>{I18n.t('drop_off_date')}</Text>
            </View>

            <View style={styles.summaryColRight}>
              <Text style={styles.summaryRowText}>{dropOffDate}</Text>
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

              return(<TouchableWithoutFeedback onPress={() => self.addService(item.key, item.amount)}>
                <View  style={styles.service}>
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
    loading: state.isBookingCar
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ bookCar } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarBooking);
