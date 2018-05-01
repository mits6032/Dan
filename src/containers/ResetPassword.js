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
import { Accounts } from 'react-native-meteor';
import { resetPassword } from './actions';
import ResetPasswordForm from './ResetPasswordForm';
import { Spinner } from '../components';

class ResetPassword extends Component<{}> {


  onSubmit(values){
    console.warn('values', values);
    console.warn('userId', this.props.userId);
    this.props.resetPassword(this.props.userId, values.password);
  }

  render() {

    if(this.props.loading){
      return(<Spinner />);
    }

    return (
      <ResetPasswordForm onSubmit={(values) => this.onSubmit(values)} />
    );

  }
  
}


const mapStateToProps = (state) => {
  return {
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({resetPassword} , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
