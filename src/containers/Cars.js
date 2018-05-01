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
import RNPickerSelect from 'react-native-picker-select';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { getCars } from '../actions/carsActions';
import { Spinner } from '../components/Spinner';
import { Button } from '../components/Button';

import { styles, carsFilterStyle } from '../theme/styles';
import I18n from '../i18n';



const transmission = [
  { value: 'manual', label: I18n.t('manual')},
  { value: 'automatic', label: I18n.t('automatic')},
];

const years = [
  { value: '2019', label: '2019'},
  { value: '2018', label: '2018'},
  { value: '2017', label: '2017'},
  { value: '2016', label: '2016'},
  { value: '2015', label: '2015'},
  { value: '2014', label: '2014'},
  { value: '2013', label: '2013'},
  { value: '2012', label: '2012'},
  { value: '2011', label: '2011'},
  { value: '2010', label: '2012'}
];

const oil = [
  { value: 'diesel', label: 'Diesel'},
  { value: 'petrol', label: 'Petrol'},
];


class Cars extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      year: null,
      transmission: null,
      oil: null,
    }

  }


  fetchData(){
    const { year, transmission, oil,  } = this.state;

    this.props.getCars({
        year: year,
        transmission: transmission,
        oil: oil,
    });
  }


  componentWillMount(){
    this.fetchData();
  }

  renderItem({ item, index}){

    const {dropOffDate, pickingUpDate, user, droppingOff, pickingUp, droppingOffLocation, pickingUpLocation } = this.props;

    var diff = moment(dropOffDate, 'YYYY-MM-DD').diff(moment(pickingUpDate,'YYYY-MM-DD'));
    var duration = moment.duration(diff);
    var days = duration.asDays();

    const now = moment().format('x')

    options = [];

    options = item.prices.filter(function(item){
        const startDate = moment(item.startDate, 'YYYY-MM-DD').format('x');
        const endDate = moment(item.endDate, 'YYYY-MM-DD').format('x');
        return  (now > startDate) && (now < endDate);
    })

    console.warn('prices', options);

    let price = 0;
    let subtotal = 0;
    let total = 0;
    let commission = 0;


    // price

    console.log('days', days);


      if( (days >= 1) && (days < 5)){
         price = options[0].between1and5;
      }

      else if((days >= 5) && (days < 10)){
        price = options[0].between5and10;
      }

      else if((days >= 10) && (days <= 15)){
        price = options[0].between10and15;
      }

      else if(days > 15){
        price = options[0].morethan15;
      }


    // total

    subtotal = price * days;
    commission = (subtotal * 10) / 100;

    total = subtotal + Math.ceil(commission);

    if(droppingOff != pickingUp){
       total = total + 278
    }


     return(
       <View
         style={styles.car}
       >
          <View>

          <Image source={{ uri: item.image}}  style={styles.carImage} />
          </View>

          <View  style={styles.cardinfo}>

             <Text style={styles.cardName}>{item.title}</Text>


                 <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.5 }}><Text  style={{ color: '#9c9c9c' }}>{I18n.t('total_price')}</Text></View>
                    <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                      <Text style={styles.carPrice}>{I18n.t('riyals')} {total} {}</Text>
                    </View>
                 </View>

              <Button
                  title={I18n.t('book')}
                  onPress={() => {

                    if(this.props.signedIn){

                      Actions.carBooking({
                         carId: item._id,
                         size: item.size,
                         car: item,
                         price: price,
                         total: total,
                         days: days,
                         droppingOff: droppingOff,
                         pickingUp: pickingUp,
                         dropOffDate: dropOffDate,
                         pickingUpDate: pickingUpDate,
                         droppingOffLocation: droppingOffLocation,
                         pickingUpLocation: pickingUpLocation
                      })

                    } else {
                      Actions.signIn();
                    }

                }

                }
                  radius
              />

          </View>

       </View>
     );
  }

  render() {

    if(this.props.loading){
       return <Spinner />
    }



    return (
      <View style={[styles.container, styles.list]}>

<View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white' }}>

   <View style={{ flex: 0.4 }}>

      <RNPickerSelect
        placeholder={{
          label: I18n.t('transmission'),
          value: 'automatic',
        }}
        items={transmission}
        onValueChange={
        (item, index) => {
          this.setState({ transmission: item });
          this.fetchData();

         }
      }
        onUpArrow={() => { }}
        onDownArrow={() => {  }}
        style={{ ...carsFilterStyle }}
        value={this.state.pickingUp}
      />

   </View>

   <View style={{ flex: 0.3 }}>

      <RNPickerSelect
        placeholder={{
          label: I18n.t('year'),
          value: null,
        }}
        items={years}
        onValueChange={
        (item, index) => {
          this.setState({ year: item });
          this.fetchData();
         }
      }
        onUpArrow={() => { }}
        onDownArrow={() => {  }}
        style={{ ...carsFilterStyle }}
        value={this.state.year}
      />


   </View>


      <View style={{ flex: 0.3 }}>


         <RNPickerSelect
           placeholder={{
             label: I18n.t('oil'),
             value: null,
           }}
           items={oil}
           onValueChange={
           (item, index) => {
             this.setState({ oil: item });
             this.fetchData();
            }
         }
           onUpArrow={() => { }}
           onDownArrow={() => {  }}
           style={{ ...carsFilterStyle }}
           value={this.state.oil}
         />


      </View>


  </View>


        {this.props.cars.length > 0 ? <FlatList
          data={this.props.cars}
          keyExtractor={(item, index) => item._id }
          renderItem={({ item, index}) => this.renderItem({ item, index})}
          contentContainerStyle={styles.padding}
        /> :

        <View style={[styles.center, styles.list]}>
             <Text style={styles.noResultsText}>{I18n.t('no_results')}</Text>
       </View>
      }

      </View>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    cars: state.cars,
    user: state.user,
    signedIn: state.signedIn,
    loading: state.isFetchingCars
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCars } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
