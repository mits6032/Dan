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
import { signIn } from '../actions/authActions';
import { Spinner } from '../components/Spinner';
import SignInForm from '../components/SignInForm';

class SignIn extends Component<{}> {

  onSubmit(values){
     this.props.signIn(values.email, values.password);
  }

  render() {

    return (
      <SignInForm
        onSubmit={(values) => this.onSubmit(values)}
        loading={this.props.signingIn}
       />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    signingIn: state.signingIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signIn } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
