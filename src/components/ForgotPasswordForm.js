import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {  Button  } from './Button';
import TextInput from './TextInput';
import { styles } from '../theme/styles';
import { isEmail } from '../utils';
import I18n from '../i18n';


class ForgotPasswordForm extends Component<{}> {


  render() {
    return (
      <View style={styles.container}>

      <KeyboardAwareScrollView bounces={false} contentContainerStyle={styles.center}>

          <Text style={styles.authTitleText}>{I18n.t('forgot_your_password')}</Text>

          <Field
             withRef
             ref={(c) => this.email = c}
             refField='email'
             name="email"
             component={TextInput}
             placeholder={I18n.t('email')}
             autoCorrect={false}
             autoCapitalize="none"
             keyboardType="email-address"
             icon="envelope"
             returnKeyType="done"
             onEnter={() => this.props.handleSubmit() }
             />

             <Button
               title={I18n.t('continue')}
               onPress={() => this.props.handleSubmit() }
               radius
             />

         </KeyboardAwareScrollView>



      </View>
    );
  }
}

export default reduxForm({
  form: 'forgotPassword',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: values => {
    const errors = {};
    errors.email = !values.email
      ? I18n.t('email_field_is_required')
      : !isEmail(values.email) ? I18n.t('invalid_email')  : undefined;

    return errors;
  }
})(ForgotPasswordForm)
