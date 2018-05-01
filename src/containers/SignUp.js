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
import SignUpForm from '../components/SignUpForm';

class SignIn extends Component<{}> {

  onSubmit(values){

     const options = {
        email: values.email,
        password: values.password,
        profile: {
          fullName: values.name,
          mobile: values.mobile
        }
     }
     this.props.signUp(options);
  }

  render() {

    return (
      <SignUpForm
        onSubmit={(values) => this.onSubmit(values)}
        loading={this.props.signingUp}
       />
    );
  }

}


const mapStateToProps = (state) => {
  return {
    signingUp: state.signingUp
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signUp } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
