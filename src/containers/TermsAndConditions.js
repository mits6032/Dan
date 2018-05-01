import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { styles } from '../theme/styles';

type Props = {};
export default class TermsAndConditions extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
      <ScrollView  contentContainerStyle={styles.padding}>
        <Text>
        {"Etiam condimentum sem vitae tempus vestibulum. Mauris at ipsum eget nulla porttitor faucibus. Pellentesque hendrerit leo erat, quis congue leo maximus nec. In hac habitasse platea dictumst. Integer volutpat diam id urna hendrerit, eu molestie nulla aliquam. Phasellus lorem mauris, vulputate non mauris in, sagittis feugiat turpis. Aenean auctor ultrices elit, nec finibus turpis iaculis a. Vestibulum a dui quam. Aenean porttitor nunc a mi dapibus, eget suscipit est finibus. Mauris ac faucibus mauris, a tristique orci. Morbi interdum nulla vel nunc aliquam, nec venenatis lorem laoreet. Nulla quis massa enim. Aliquam pretium nibh ligula, sit amet aliquet libero volutpat eu. Curabitur suscipit semper felis interdum placerat. Morbi augue libero, volutpat et luctus ut, vestibulum dapibus est."}
        </Text>
        </ScrollView>
      </View>
    );
  }


}
