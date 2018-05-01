import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  I18nManager
} from 'react-native';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import RNRestart from 'react-native-restart';
import { setLanguage } from '../actions/languageActions';
import { styles } from '../theme/styles';

type Props = {};
class Languages extends Component<Props> {

  setLanguage(locale){

    this.props.setLanguage(locale);

    if(locale == 'ar' && I18nManager.isRTL == false ){
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }

    setTimeout(() => RNRestart.Restart() , 500)

  }

  render() {
    return (
      <ImageBackground source={require('../images/01.png')} style={styles.container}>
            <View style={styles.center}>

              <Image source={require('../images/logo-gray.png')} style={styles.logo} />
              <View style={styles.languageButtonsContainer}>

              <TouchableOpacity
                onPress={() => this.setLanguage('en')}
                style={styles.languageButton}>
                <Text style={styles.languageButtonText}>{'English'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled
                onPress={() => this.setLanguage('ar')}
                style={styles.languageButton}>
                <Text style={styles.languageButtonText}>{'العربية'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
               disabled
                onPress={() => this.setLanguage('tr')}
                style={styles.languageButton}
                >
                <Text style={styles.languageButtonText}>{'Türkçe'}</Text>
              </TouchableOpacity>



              </View>


            </View>
      </ImageBackground>
    );
  }


}



const mapStateToProps = (state) => {
  return {
    language: state.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setLanguage } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Languages);
