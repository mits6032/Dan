import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Text,
  Alert
} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {  Button  } from './Button';
import Password from './Password';
import TextInput from './TextInput';
import PhoneTextInput from './PhoneTextInput';
import { styles } from '../theme/styles';
import { isEmail } from '../utils';
import I18n from '../i18n';


class SignUpForm extends Component<{}> {


  render() {
    return (
      <View style={styles.container}>

      <KeyboardAwareScrollView bounces={false} contentContainerStyle={styles.center}>

      <Image source={require('../images/logo.png')} style={styles.logo} />

          <Field
             withRef
             ref={(c) => this.name = c}
             refField='name'
             name="name"
             component={TextInput}
             placeholder={I18n.t('name')}
             autoCorrect={false}
             autoCapitalize="words"
             icon="user"
             returnKeyType="next"
             onEnter={() => {
                  this.mobile.getRenderedComponent().refs.mobile.focus()
              }}
            />

         <Field
            withRef
            ref={(c) => this.mobile = c}
            refField='mobile'
            name="mobile"
            component={PhoneTextInput}
            placeholder={I18n.t('mobile')}
            icon="mobile"
            returnKeyType="next"
            onEnter={() => {
                 this.email.getRenderedComponent().refs.email.focus()
             }}
          />

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
             returnKeyType="next"
             onEnter={() => {
                  this.password.getRenderedComponent().refs.password.focus()
              }}
               />

           <Field
              withRef
              ref={(c) => this.password = c}
              refField='password'
              name="password"
              component={Password}
              placeholder={I18n.t('password')}
              icon="lock"
              returnKeyType="done"
              onEnter={() => this.props.handleSubmit()}
            />


            <Text style={styles.agree}>
              <Text style={styles.agreeText}>{I18n.t('by_tapping')}{' '}</Text>
              <Text onPress={() => Actions.termsAndConditions()} style={[ styles.linkText, { textDecorationLine: 'underline'}]}>Terms and conditions </Text>
            </Text>

             <Button
               title={I18n.t('sign_up')}
               onPress={() => this.props.handleSubmit() }
               animating={this.props.loading}
               radius
             />


         </KeyboardAwareScrollView>

      </View>
    );
  }
}

export default reduxForm({
  form: 'signUp',
  validate: values => {
    const errors = {};
    errors.name = !values.name
      ? I18n.t('name_field_is_required')
      : undefined;
    errors.mobile = !values.mobile
      ? I18n.t('mobile_field_is_required')
      : undefined;
    errors.email = !values.email
      ? I18n.t('email_field_is_required')
      : !isEmail(values.email) ? I18n.t('invalid_email')  : undefined;
    errors.password = !values.password
      ? I18n.t('password_field_is_required')
      : undefined;

    return errors;
  }
})(SignUpForm)
