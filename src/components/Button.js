import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme/colors'


export const Button = (props) => {

   const { title , onPress, outline, animating, radius } = props;

   const styles = StyleSheet.create({
     button: {
       padding: 10,
       backgroundColor: outline == true ? 'transparent' : PRIMARY_COLOR ,
       justifyContent: 'center',
       alignItems: 'center',
       marginBottom: 10,
       marginTop: 10,
       borderWidth: 1,
       borderColor: PRIMARY_COLOR,
       borderRadius: radius ? 16 : 0
     },
     buttonText: {
       color: outline == true ? PRIMARY_COLOR : 'white' ,
       fontSize: 16,
       fontWeight: 'bold'
     }
    });

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.button}>
        { animating ? <ActivityIndicator color={'white'} size="small" /> : <Text style={styles.buttonText}>{title}</Text>}
      </TouchableOpacity>
    );
}

Button.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
  secondary: PropTypes.bool,
  animating: PropTypes.bool
};

Button.defaultProps = {
  secondary: false,
  textColor: "#ffffff",
  title: "Send",
  transparent: false,
  animating: false,
};
