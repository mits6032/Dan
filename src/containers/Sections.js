import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { styles } from '../theme/styles';
import I18n from '../i18n';

type Props = {};
export default class Sections extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>

      <View style={styles.sections}>

          <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => Actions.propertiesFilter()}
          >
              <Image source={require('../images/residence.png')} style={styles.sectionImage}  />
              <Text style={styles.sectionName}>{I18n.t('tourist_housing')}</Text>
          </TouchableOpacity>


          <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => Actions.carsFilter()}
          >
              <Image source={require('../images/cars.png')} style={styles.sectionImage}  />
              <Text style={styles.sectionName}>{I18n.t('car_rental')}</Text>
          </TouchableOpacity>


      </View>

      </View>
    );
  }


}
