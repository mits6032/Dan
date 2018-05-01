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
import TextInput from './TextInput';
import styles from '../theme/styles';
import { isEmail } from '../utils';
import I18n from '../i18n';


class VerifyForm extends Component<{}> {


  render() {
    return (
      <View style={styles.container}>

      <KeyboardAwareScrollView bounces={false} contentContainerStyle={styles.center}>

           <Image source={require('../images/logo.png')}  style={styles.logo}  />

           <Text style={[styles.notice, { textAlign: 'center'}]}>Enter the code we sent to {this.props.to}</Text>

          <Field
             withRef
             ref={(c) => this.code = c}
             refField='code'
             name="code"
             component={TextInput}
             placeholder="Verification code"
             keyboardType="numeric"
             icon={null}
             onEnter={() => this.props.handleSubmit()}

               />


            <Button
              title={I18n.t('continue')}
              onPress={() => this.props.handleSubmit() }
            />


         </KeyboardAwareScrollView>



      </View>
    );
  }
}

export default reduxForm({
  form: 'verify',
  validate: values => {
    const errors = {};
    errors.code = !values.code
      ? "This field is required"
      : undefined;
    return errors;
  }
})(VerifyForm)
