import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signOut } from '../actions/authActions';
import I18n from '../i18n';

import { styles } from '../theme/styles';

type Props = {};
class DrawerContent extends Component<Props> {



  logOut(){

    Alert.alert(
      'Are you sure you want to lpg out?',
      '',
      [
        { text: 'Log Out', onPress: () => this.props.signOut() },
        { text: 'Cancel' }

      ]
    );

  }

  render() {
    return (
      <View style={styles.menu}>


      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => Actions.sections()}>
          <Icon name="list" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>{I18n.t('sections')}</Text>
      </TouchableOpacity>


    { this.props.signedIn ?  <TouchableOpacity
        style={styles.menuItem}
        onPress={() => Actions.myBookings()}>
          <Icon name="pencil" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>{I18n.t('my_bookings')}</Text>
      </TouchableOpacity>  : null}


      { this.props.signedIn ?  <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Actions.account()}>
            <Icon name="user" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>{I18n.t('my_account')}</Text>
        </TouchableOpacity>  : null}

        { this.props.signedIn == false ?  <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Actions.signIn()}>
              <Icon name="user" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>{I18n.t('login')}</Text>
          </TouchableOpacity>  : null}


      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => Actions.about()}>
          <Icon name="info-circle" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>{I18n.t('about')}</Text>
      </TouchableOpacity>

      { this.props.signedIn ? <TouchableOpacity
        style={styles.menuItem}
        onPress={() => this.logOut()}>
          <Icon name="lock" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>{I18n.t('logout')}</Text>
      </TouchableOpacity> : null}


      </View>
    );
  }


}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    signedIn: state.signedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signOut } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
