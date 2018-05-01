import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import HTML from 'react-native-render-html';
import StarRating from 'react-native-star-rating';
import MapView from 'react-native-maps';

import { styles } from '../theme/styles';
import I18n from '../i18n';

type Props = {};
class PropertyDetails extends Component<Props> {


  bookNow(){
    if(this.props.signedIn){

      const { property, rooms, priceMin, priceMax, adults, children, typeId, cityId, departureDate, arrivalDate } = this.props;

      Actions.booking({
        property: property,
        rooms: rooms,
        priceMin: priceMin,
        priceMax: priceMax,
        adults: adults,
        children: children,
        typeId: typeId,
        cityId: cityId,
        departureDate: departureDate,
        arrivalDate: arrivalDate
      });

    } else {
      Actions.signIn()
    }
  }

  componentDidMount(){
    this.setState({});
  }

  render() {

    const { image, title, rating, description, latitude, longitude, price } = this.props.property;

    return (
      <View style={styles.container}>

      <ScrollView>

      <Image source={{ uri: image}}  style={styles.cardImage} />

      <View style={styles.padding}>

      <Text style={styles.propertyDetailsTitle}>{title}</Text>


        <StarRating
          disabled={true}
          maxStars={5}
          rating={rating}
          maxStars={5}
          starSize={20}
          emptyStarColor="gray"
          emptyStar={'star'}
          fullStarColor="gold"
          containerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }}
         />

        <HTML html={description} style={styles.propertyDetailsDesc} />

        </View>

         <MapView
            region={{
              latitude: latitude ,
                  longitude: longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
            }}
            style={styles.map}
            >
              <MapView.Marker
                draggable={false}
                coordinate={{latitude: latitude, longitude: longitude}}
                image={require('../images/marker.png')}
              />
        </MapView>


      </ScrollView>

      <View style={styles.footer}>

           <TouchableOpacity
           style={styles.bookNow}
           onPress={() => this.bookNow()}
           >
            <Text style={styles.bookNowText}>{I18n.t('book_now')}</Text>
           </TouchableOpacity>

           <View style={styles.price}>
              <Text  style={styles.priceText}>{I18n.t('riyals')} {price}</Text>
           </View>


      </View>


      </View>
    );
  }


}



const mapStateToProps = (state) => {
  return {
    signedIn: state.signedIn
  }
}

export default connect(mapStateToProps)(PropertyDetails);
