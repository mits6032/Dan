import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { styles } from '../theme/styles';
import I18n from '../i18n';
import { Spinner } from '../components/Spinner';
import { Button } from '../components/Button';

type Props = {};
export default class Confirmation extends Component<Props> {

  render() {
    return (
      <View style={[styles.center, { backgroundColor: 'white' }]}>
        <Image source={require('../images/04.png')} style={styles.bookConfirmationImage} />
        <Text style={styles.bookConfirmationTitle}>{I18n.t('book_confirmation_title')}</Text>
        <Text style={styles.bookConfirmationInfo}>{I18n.t('book_confirmation_desc')}</Text>

        <Button
          title={I18n.t('continue')}
          onPress={() => Actions.sections()}
          radius
        />

      </View>
    );
  }


}
