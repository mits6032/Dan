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

const rooms = [
  { value : 'all' , label: I18n.t('all') },
  { value : 1 , label: '+1' },
  { value : 2 , label: '+2' },
  { value : 3 , label: '+3' },
  { value : 4 , label: '+4' }
];

class PropertiesFilter extends Component<{}> {

   constructor(props){
      super(props);
      this.inputRefs = {};
      this.state = {
        rooms: 'all',
        priceMin: null,
        adults: 1,
        children: 0,
        priceMax: null,
        cityId: null,
        typeId: null,
        departureDate: moment().add(1, 'd').format('YYYY-MM-DD'),
        arrivalDate: moment().format('YYYY-MM-DD')
      }
   }

   componentWillMount(){
     this.props.getPropertyTypes();
     this.props.getCities();
   }

  search(){
    const { rooms, priceMin, priceMax, adults, children, typeId, cityId, departureDate, arrivalDate } = this.state;

    Actions.properties({
        rooms: rooms,
        priceMin: priceMin,
        priceMax: priceMax,
        adults: adults,
        children: children,
        typeId: typeId,
        cityId: cityId,
        departureDate: departureDate,
        arrivalDate: arrivalDate,
    });
  }

  render() {

    return (
      <View style={styles.container}>
      <KeyboardAwareScrollView>
      <View style={styles.center}>


      <View style={styles.searchRow}>

        <View style={styles.searchCol}>
            <Text style={styles.searchLabel}>{I18n.t('arrival_date')}</Text>

            <DatePicker
                    style={{ borderWidth: 1, borderColor: '#ddd'}}
                    date={this.state.arrivalDate}
                    mode="date"
                    placeholder={I18n.t('select_date')}
                    format="YYYY-MM-DD"
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
                    onDateChange={(date) => {this.setState({arrivalDate: date})}}
                  />


        </View>

        <View style={styles.searchCol}>
          <Text style={styles.searchLabel}>{I18n.t('departure_date')}</Text>

          <DatePicker
                  style={{ borderWidth: 1, borderColor: '#ddd'}}
                  date={this.state.departureDate}
                  mode="date"
                  placeholder={I18n.t('select_date')}
                  format="YYYY-MM-DD"
                  minDate={this.state.arrivalDate}
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
                  onDateChange={(date) => {this.setState({departureDate: date})}}
                />

        </View>

      </View>

      <View style={{ marginBottom: 10 }}>

      <Text style={styles.searchLabel}>{I18n.t('residential_unit')}</Text>

      <RNPickerSelect
        placeholder={{
          label: I18n.t('select_type'),
          value: null,
        }}
        items={this.props.propertyTypes}
        onValueChange={
        (item) => {
          this.setState({typeId: item})
         }
      }
        onUpArrow={() => { }}
        onDownArrow={() => {  }}
        style={{ ...pickerSelectStyles }}
        value={this.state.typeId}
        ref={(el) => {
           this.inputRefs.picker = el;
         }}
      />

      </View>


      <View style={{ marginBottom: 10 }}>
        <Text style={styles.searchLabel}>{I18n.t('city')}</Text>

         <RNPickerSelect
           placeholder={{
             label: I18n.t('select_city'),
             value: null,
           }}
           items={this.props.cities}
           onValueChange={
           (item) => {
             this.setState({cityId: item})
            }
         }
           onUpArrow={() => { }}
           onDownArrow={() => {  }}
           style={{ ...pickerSelectStyles }}
           value={this.state.cityId}
           ref={(el) => {
              this.inputRefs.picker = el;
            }}
         />

    </View>


      <Text style={styles.searchLabel}>{I18n.t('price')}</Text>


      <View style={styles.searchRow}>

        <View style={styles.searchCol}>
            <TextInput
              style={styles.searchInput}
              placeholder={I18n.t('from')}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ priceMin: text }) }
              underlineColorAndroid="transparent"
            />
        </View>

        <View style={styles.searchCol}>
          <TextInput
            style={styles.searchInput}
            placeholder={I18n.t('to')}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ priceMax: text }) }
            underlineColorAndroid="transparent"
          />
        </View>

      </View>



        <Text style={styles.searchLabel}>{I18n.t('rooms')}</Text>

        <View style={styles.searchRooms}>


        {rooms.map((room, i) => {

            let selectedStyle = null;
            let selectedTextStyle = null;
            let noBorder = null;

            if(i == 4){
              noBorder: { borderLeftWidth: 0 }
            }

            if(this.state.rooms == room.value){
              selectedStyle = { backgroundColor: PRIMARY_COLOR };
              selectedTextStyle = { color: 'white' }
            }

            return(<TouchableOpacity
              key={i}
              style={[styles.searchRoomItem, noBorder, selectedStyle ]}
              onPress={() => this.setState({ rooms: room.value })}
              >
                <Text style={[styles.searchRoomItemText, selectedTextStyle]}>{room.label}</Text>
              </TouchableOpacity>
                );
        })}

        </View>

        <View style={styles.searchRow}>


          <View style={styles.searchCol}>
             <Text style={styles.searchLabel}>{I18n.t('adults')}</Text>
              <Number
                value={this.state.adults}
                onChange={(value) => this.setState({ adults: value})}
                min={1}
              />
          </View>

          <View style={styles.searchCol}>
            <Text style={styles.searchLabel}>{I18n.t('children')}</Text>
             <Number
               value={this.state.children}
               onChange={(value) => this.setState({ children: value})}
               min={0}
             />
          </View>

        </View>



        <Button
          title={I18n.t('search')}
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

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesFilter);
