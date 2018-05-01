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
import { updateAccount } from '../actions/authActions';
import { Spinner } from '../components/Spinner';
import AccountForm from '../components/AccountForm';

class Account extends Component<{}> {

  onSubmit(values){

     const options = {
        userId: this.props.user._id,
        email: values.email,
        password: values.password,
        fullName: values.name,
        mobile: values.mobile
     }

     this.props.updateAccount(options);
  }

  render() {

    const { emails, profile } = this.props.user;

    console.warn(profile);

    return (
      <AccountForm
        onSubmit={(values) => this.onSubmit(values)}
        initialValues={{
           email : emails[0].address,
           name: profile.fullName,
           mobile: profile.mobile
        }}
        loading={this.props.isUpdatingAcount}
       />
    );
  }

}


const mapStateToProps = (state) => {
  return {
    isUpdatingAcount: state.isUpdatingAcount,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateAccount } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
