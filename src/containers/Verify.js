import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';


import VerifyForm from './VerifyForm';

class Verify extends Component<{}> {


  onSubmit(values){

    if(values.code == this.props.verificationCode){
       Actions.resetPassword({ userId: this.props.data._id});
    } else {

      Alert.alert('Error', 'Invalid code');
    }

  }

  render() {
    console.warn(this.props.verificationCode);
    return (
      <VerifyForm
      onSubmit={(values) => this.onSubmit(values)}
      to={this.props.to}
       />
    );
  }
}




export default connect()(Verify);
