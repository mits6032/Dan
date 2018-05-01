import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { styles } from '../theme/styles';

type Props = {};
export default class Pay extends Component<Props> {

  render() {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: 'center' }}>Payment Gateway</Text>
      </View>
    );
  }


}
