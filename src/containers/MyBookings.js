import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'

import { styles } from '../theme/styles';
import I18n from '../i18n';
import { PRIMARY_COLOR } from '../theme/colors';
import MyBookingsProperties from './MyBookingsProperties';
import MyBookingsCars from './MyBookingsCars';

type Props = {};
export default class MyBookings extends Component<Props> {


  constructor(){
    super()
    this.state = {
      selectedIndex: 0,
    };
  }

  handleIndexChange = (index) => {
     this.setState({
       ...this.state,
       selectedIndex: index,
     });
   }


  render() {
    return (
      <View style={styles.container}>

        <SegmentedControlTab
          values={[ I18n.t('properties'), I18n.t('cars')]}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
          tabsContainerStyle={styles.padding}
          activeTabStyle={{ backgroundColor: PRIMARY_COLOR }}
          tabStyle={{ borderColor: PRIMARY_COLOR }}
          tabTextStyle={{ color: PRIMARY_COLOR }}
        />

        { this.state.selectedIndex == 0 ? <MyBookingsProperties /> : null }
        { this.state.selectedIndex == 1 ? <MyBookingsCars /> : null }


      </View>
    );
  }


}
