import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput as RNTextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SECONDARY_COLOR } from '../theme/colors';
import PhoneInput from 'react-native-phone-input';

var DeviceInfo = require('react-native-device-info');
const deviceCountry = DeviceInfo.getDeviceCountry(); // "US"

export default class PhoneTextInput extends Component {

  render(){

      const { input, refField, onEnter, iconStyle, icon, meta, contentContainerStyle, ...inputProps } = this.props;

      const validationStyles = meta.touched && !meta.active
        ? meta.valid ? null : styles.invalid
        : null;


      return (
        <View style={styles.container}>
        <View style={[styles.inputContainer, contentContainerStyle, validationStyles]}>

         {icon && <Icon name={icon} style={[styles.icon, iconStyle]} />}


          <PhoneInput
            {...inputProps}
            style={styles.textInput}
            textStyle={{ color:  '#555555' }}
            onChangePhoneNumber={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
            ref={refField}
            onSubmitEditing={onEnter}
            underlineColorAndroid="transparent"
           />
        </View>
         { meta.touched && !meta.valid ? <Text style={styles.error}>{meta.error}</Text> : null}
        </View>

      );


  }
}

PhoneTextInput.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string
};

PhoneTextInput.defaultProps = {
  color: SECONDARY_COLOR,
  icon: null,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 5,
    backgroundColor: 'white',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 16
  },
  textInput: {
    marginRight: 40,
    marginLeft: 40,
    height: 40
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: '#6a6a6a',
  },
  invalid: {
    borderColor: 'red'
  },
  error: {
    color: 'red',
    fontSize: 12
  }
});
