import React, { Component } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {  Button, TransButton  } from '../components';
import Password from './Password';
import styles from '../theme/styles';
import { isEmail } from '../utils';


class ResetPasswordForm extends Component<{}> {


  render() {
    return (
      <View style={styles.container}>

      <KeyboardAwareScrollView bounces={false} contentContainerStyle={styles.center}>

           <Image source={require('../images/logo.png')}  style={styles.logo}  />

           <Field
              withRef
              ref={(c) => this.password = c}
              refField='password'
              name="password"
              component={Password}
              placeholder="Password"
              returnKeyType="done"
              onEnter={() => this.props.handleSubmit()}
            />

            <Button
              title="Reset password"
              onPress={() => this.props.handleSubmit() }
              radius
            />

         </KeyboardAwareScrollView>

      </View>
    );
  }
}

export default reduxForm({
  form: 'resetPassword',
  validate: values => {
    const errors = {};
    errors.password =
    !values.password ? "This field is required" : values.password.length < 6 ? 'Password should be at least 6 charachters' : undefined;
    return errors;
  }
})(ResetPasswordForm)
