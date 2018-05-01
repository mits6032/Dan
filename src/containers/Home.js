import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { styles } from '../theme/styles';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';

type Props = {};
class Home extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {JSON.stringify(this.props.user)}
        </Text>
      </View>
    );
  }


}



const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setLanguage } , dispatch);
}

export default connect(mapStateToProps)(Home);
