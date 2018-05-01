import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { getProperties } from '../actions/propertiesActions';
import { Spinner } from '../components/Spinner';

import { styles } from '../theme/styles';
import I18n from '../i18n';

class Properties extends Component<{}> {


  componentWillMount(){

    const { rooms, priceMin, priceMax, adults, children, typeId, cityId, departureDate, arrivalDate } = this.props;

    this.props.getProperties({
        rooms: rooms,
        priceMin: priceMin,
        priceMax: priceMax,
        adults: adults,
        children: children,
        typeId: typeId,
        cityId: cityId,
        departureDate: departureDate,
        arrivalDate: arrivalDate,
    });

  }

  renderItem({ item, index}){

    const { rooms, priceMin, priceMax, adults, children, typeId, cityId, departureDate, arrivalDate } = this.props;

     return(
       <TouchableOpacity
         style={styles.card}
         onPress={() => Actions.propertyDetails({
           title: item.title,
           property: item,
           rooms: rooms,
           priceMin: priceMin,
           priceMax: priceMax,
           adults: adults,
           children: children,
           typeId: typeId,
           cityId: cityId,
           departureDate: departureDate,
           arrivalDate: arrivalDate,
          })}
       >
          <Image source={{ uri: item.image}}  style={styles.cardImage} />
          <View  style={styles.cardBody} >

          <View style={{ flexDirection: 'row'}}>

            <View style={{ flex: 0.8 }}>

              <Text style={styles.propertyTitle}>{item.title}</Text>
              <Text style={styles.propertyPrice}>{'$'} {item.price}</Text>

            </View>

            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'flex-end' }}>

            <View style={styles.propertyRating}>
              <Text style={styles.propertyRatingText}>{I18n.t('rating')}</Text>
              <Text style={styles.propertyRatingValue}>{item.rating}</Text>
            </View>


            </View>


          </View>


          </View>
       </TouchableOpacity>
     );
  }

  render() {

    if(this.props.loading){
       return <Spinner />
    }

    if(this.props.properties.length == 0){
       return(
         <View style={[styles.center, styles.list]}>
              <Text style={styles.noResultsText}>{I18n.t('no_results')}</Text>
        </View>
       );
    }

    return (
      <View style={[styles.container, styles.list]}>

        <FlatList
          data={this.props.properties}
          keyExtractor={(item, index) => item._id }
          renderItem={({ item, index}) => this.renderItem({ item, index})}
          contentContainerStyle={styles.padding}
        />

      </View>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    properties: state.properties,
    loading: state.isFetchingProperties
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getProperties } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
