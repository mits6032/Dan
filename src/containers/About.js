import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { styles } from '../theme/styles';

type Props = {};
export default class About extends Component<Props> {
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          About
        </Text>
      </View>
    );
  }
  
  
}


