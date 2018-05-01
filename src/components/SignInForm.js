import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {  Button  } from './Button';
import Password from './Password';
import TextInput from './TextInput';
import { styles } from '../theme/styles';
import { isEmail } from '../utils';
import I18n from '../i18n';


class SignInForm extends Component<{}> {

  render() {
    return (
      <View style={styles.container}>

      <KeyboardAwareScrollView bounces={false} contentContainerStyle={styles.center}>

          <Image source={require('../images/logo.png')} style={styles.logo} />

          <Text style={styles.authTitleText}>{I18n.t('login')}</Text>

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

            <Text
             style={styles.authLinkText}
              onPress={() => Actions.forgotPassword() }
            >
            {I18n.t('forgot_your_password')}
            </Text>


             <Button
               title={I18n.t('login')}
               onPress={() => this.props.handleSubmit() }
               animating={this.props.loading}
               radius
             />


            <View style={styles.linkContainer} >


             <Text style={{ textAlign: 'center', marginTop: 30 }}>

             <Text>{I18n.t('no_account')}{' '}</Text>

              <Text
               style={styles.authLinkText}
                onPress={() => Actions.signUp() }
              >
              {I18n.t('sign_up')}
              </Text>

              </Text>



             </View>


         </KeyboardAwareScrollView>

         <View style={styles.skip}>
            <Text
            onPress={() => Actions.sections()}
            style={styles.skipText}
            >{I18n.t('skip')}</Text>
         </View>

      </View>
    );
  }
}

export default reduxForm({
  form: 'signIn',
  validate: values => {
    const errors = {};
    errors.email = !values.email
      ? I18n.t('email_field_is_required')
      : !isEmail(values.email) ? I18n.t('invalid_email')  : undefined;
    errors.password = !values.password
      ? I18n.t('password_field_is_required')
      : undefined;

    return errors;
  }
})(SignInForm)
