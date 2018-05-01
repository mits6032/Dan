import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  I18nManager
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SECONDARY_COLOR } from '../theme/colors';

export default class Password extends Component {

  constructor(props){
    super(props);
    this.state = {
      secureTextEntry: true
    }
  }


  render(){

      const { input, refField, onEnter, meta, icon,  ...inputProps } = this.props;

      const validationStyles = meta.touched && !meta.active
        ? meta.valid ? null : styles.invalid
        : null;


      return (
        <View style={styles.container}>
        <View style={[styles.inputContainer, validationStyles]}>

        {icon && <Icon name={icon} style={styles.icon} />}

          <TextInput
            {...inputProps}
            style={styles.textInput}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            ref={refField}
            onSubmitEditing={onEnter}
            value={input.value}
            underlineColorAndroid="transparent"
            secureTextEntry={this.state.secureTextEntry}
            autoCorrect={false}
            autoCapitalize="none"
           />


           <TouchableOpacity
             style={styles.toggleButton}
             onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })}
             >
             <Icon name={this.state.secureTextEntry ? 'eye' : 'eye-slash'} style={styles.toggleButtonIcon} />
           </TouchableOpacity>
        </View>
         { meta.touched && !meta.valid ? <Text style={styles.error}>{meta.error}</Text> : null}
        </View>

      );


  }
}


Password.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string
};

Password.defaultProps = {
  color: "#45D56E",
  icon: null,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  inputContainer: {
    marginBottom: 5,
    backgroundColor: 'white',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 16
  },
  textInput: {
    color: SECONDARY_COLOR,
    height: 40,
    padding: 10,
    marginLeft: 25,
    marginRight: 25,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
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
  toggleButton: {
    width: 20,
    height: 20,
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  toggleButtonIcon: {
    width: 20,
    height: 20,
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
    fontSize: 12,
    textAlign: 'left'
  }
});
