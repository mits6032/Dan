import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import { getCities, getPropertyTypes } from '../actions/propertiesActions';
import { Spinner } from '../components/Spinner';
import { Button } from '../components/Button';
import Number from '../components/Number';
import { styles, pickerSelectStyles } from '../theme/styles';
import { PRIMARY_COLOR } from '../theme/colors';
import I18n from '../i18n';


class CarsFilter extends Component<{}> {

   constructor(props){
      super(props);
      this.inputRefs = {};
      this.state = {
        priceMin: null,
        adults: 1,
        children: 0,
        priceMax: null,
        pickingUp: null,
        droppingOff: null,
        pickingUpLocation: null,
        droppingOffLocation: null,
        typeId: null,
        dropOffDate: moment().add(1, 'd').format('YYYY-MM-DD'),
        pickingUpDate: moment().format('YYYY-MM-DD')
      }
   }

   componentWillMount(){
     this.props.getCities();
   }

  search(){
    const { pickingUp, droppingOff, pickingUpDate, dropOffDate, droppingOffLocation, pickingUpLocation } = this.state;

    Actions.cars({
        pickingUp: pickingUp,
        droppingOff: droppingOff,
        pickingUpDate: pickingUpDate,
        dropOffDate: dropOffDate,
    });
  }

  render() {


    const locations = [
      { value : 'trabzon_airport' , label: I18n.t('trabzon_airport') },
      { value : 'ordu_airport' , label: I18n.t('ordu_airport') },
    ];


    return (
      <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.center}>
      <View>


      <Image source={require('../images/Europcar-Logo.png')} style={styles.europcar} />


      <View style={styles.searchRow}>

        <View style={styles.searchCol}>


        <Text style={styles.searchLabel}>{I18n.t('picking_up')}</Text>

         <RNPickerSelect
           placeholder={{
             label: I18n.t('picking_up'),
             value: null,
           }}
           items={locations}
           onValueChange={(item, index) =>  this.setState({pickingUp: item })}
           onUpArrow={() => { }}
           onDownArrow={() => {  }}
           style={{ ...pickerSelectStyles }}
           value={this.state.pickingUp}
         />

        </View>


        <View style={styles.searchCol}>
          <Text style={styles.searchLabel}>{I18n.t('pick_up_date')}</Text>

          <DatePicker
                  style={{ borderWidth: 1, borderColor: '#ddd'}}
                  date={this.state.pickingUpDate}
                  mode="date"
                  placeholder={I18n.t('select_date')}
                  format="YYYY-MM-DD"
                  minDate={this.state.pickingUpDate}
                  confirmBtnText={I18n.t('confirm')}
                  cancelBtnText={I18n.t('cancel')}
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      paddingLeft: 36,
                      height: 48,
                      borderWidth: 0,
                    }
                  }}
                  onDateChange={(date) => {this.setState({pickingUpDate: date})}}
                />

        </View>

      </View>



      <View style={styles.searchRow}>

        <View style={styles.searchCol}>

        <Text style={styles.searchLabel}>{I18n.t('dropping_off')}</Text>

         <RNPickerSelect
           placeholder={{
             label: I18n.t('dropping_off'),
             value: null,
           }}
           items={locations}
           onValueChange={
           (item, index) => {
               this.setState({droppingOff: item})
            }
         }
           onUpArrow={() => { }}
           onDownArrow={() => {  }}
           style={{ ...pickerSelectStyles }}
           value={this.state.droppingOff}
           underlineColorAndroid="transparent"
         />


        </View>

        <View style={styles.searchCol}>

          <Text style={styles.searchLabel}>{I18n.t('drop_off_date')}</Text>

          <DatePicker
              style={{ borderWidth: 1, borderColor: '#ddd'}}
              date={this.state.dropOffDate}
              mode="date"
              placeholder={I18n.t('select_date')}
              format="YYYY-MM-DD"
              minDate={this.state.pickingUpDate}
              confirmBtnText={I18n.t('confirm')}
              cancelBtnText={I18n.t('cancel')}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  paddingLeft: 36,
                  height: 45,
                  borderWidth: 0
                }
              }}
              onDateChange={(date) => {this.setState({dropOffDate: date})}}
          />

        </View>

      </View>






        <Button
          title={I18n.t('view_cars')}
          onPress={() => this.search()}
         />
      </View>

      </KeyboardAwareScrollView>


      </View>
    );
  }

}




const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    propertyTypes: state.propertyTypes

  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCities, getPropertyTypes } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsFilter);
