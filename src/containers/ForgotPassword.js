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
import { signUp } from '../actions/authActions';
import { Spinner } from '../components/Spinner';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

class ForgotPassword extends Component<{}> {

  onSubmit(values){
     this.props.signUp(values);
  }

  render() {

    if(this.props.loading){
      return(<Spinner />);
    }

    return (
      <ForgotPasswordForm onSubmit={(values) => this.onSubmit(values)} />
    );
  }

}


const mapStateToProps = (state) => {
  return {
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signUp } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
