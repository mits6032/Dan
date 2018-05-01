import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { PRIMARY_COLOR } from '../theme/colors';

export const Spinner = (props) => {

   const { color, size} = props;

    return (
      <View style={styles.container}>
        <ActivityIndicator color={color} size={size} />
      </View>
    );
}

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

Spinner.defaultProps = {
  color: PRIMARY_COLOR,
  size: "large",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});
