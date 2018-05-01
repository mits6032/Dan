import {
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR } from './colors';


const { width, height } = Dimensions.get('window');


export const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: PRIMARY_COLOR
  },
  sceneStyle: {
    backgroundColor: 'white'
  },
  container: {
    flex: 1
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 40
  },
  logo: {
    width: 120,
    height: 80,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginBottom: 20,
  },
  europcar: {
    width: 320,
    height: 80,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginBottom: 50,
  },
  languageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  languageButton: {
    borderWidth: 1,
    borderColor: 'white',
    height: 50,
    width: (width / 3) -40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16
  },
  languageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  padding: {
    padding: 10
  },
  authTitleText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#505050'
  },
  authLinkText: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
    fontWeight: '400',
    color: PRIMARY_COLOR
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  menu: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 20
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1
  },
  menuItemText:{
    fontSize: 16,
    textAlign: 'left',
    color: '#555555'
  } ,
  menuItemIcon:{
    fontSize: 16,
    marginRight: 10,
    color: '#555555'
  },
  skip: {
     height: 60,
     justifyContent: 'center',
     alignItems: 'center',
  },
  skipText: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold'
  },
  agree: {
    marginTop: 20,
    marginBottom: 20
  },
  agreeText: {
    color: '#505050'
  },
  linkText: {
    color: PRIMARY_COLOR
  },
  sections: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionButton: {
    borderWidth: 1,
    borderColor: '#9c9c9c',
    width: 200,
    height: 200,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center' ,
    marginBottom: 10
  },
  sectionImage: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    marginBottom: 30
  },
  sectionName: {
    color: '#9c9c9c',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  list: {
    backgroundColor: '#edf4fb',
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 10
  },
  cardImage: {
    width: null,
    height: height / 3,
    resizeMode: "stretch"
  },
  cardBody: {
    padding: 10
  },
  propertyTitle: {
    marginBottom: 10,
    color: '#9c9c9c',
    fontWeight: 'bold',
    fontSize: 16
  },
  propertyPrice: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 16
  },
  propertyRating: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  propertyRatingText: {
    color: '#707070',
    marginBottom: 5
  },
  propertyRatingValue: {
    color: '#505050',
    fontWeight: 'bold',
    fontSize: 18
  },
  map: {
    width: width,
    height: 200
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 55
  },
  price: {
    backgroundColor: PRIMARY_COLOR,
    height: 55,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  bookNow: {
    backgroundColor: '#0090bb',
    height: 55,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bookNowText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  propertyDetailsTitle: {
    fontSize: 18,
     color: '#555555',
     marginBottom: 10
  },
  searchRooms: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10
  },
  searchRoomItem: {
    flex: 0.2,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },
  searchRoomItemText: {
    color: '#555'
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    height: 70
  },
  searchCol: {
    flex: 0.48,
  },
  searchInput: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5
  },
  searchLabel: {
    marginBottom: 5,
    color: '#555'
  },
  noResultsText: {
    textAlign: 'center'
  },
  bookingProperty: {
    flexDirection: 'row',
    marginBottom: 20
  },
  bookingPropertyInfo: {
    width: width - 130,
  },
  bookingPropertyImage: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    marginRight: 10,
  },
  bookingPropertyName: {
    fontWeight: '400',
    color: 'black',
    fontSize: 16,
    marginBottom: 5
  },
  bookingPropertyPrice: {
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    fontSize: 18
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 5
  },
  summaryRowText: {
    color: 'white',
    fontSize: 16
  },
  summaryColLeft: {
    flex: 0.35,
    backgroundColor: '#acc6cd',
    padding: 10
  },
  summaryColRight: {
    flex: 0.65,
    backgroundColor: '#00a3d3',
    padding: 10
  },
  yourDetailsTitle: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
    color: PRIMARY_COLOR
  },
  yourDetailsRow: {
     borderWidth: 1,
     borderColor: PRIMARY_COLOR,
     padding: 15,
     borderRadius: 16,
     marginBottom: 10
  },
  yourDetailsRowText: {
    fontSize: 18,
    color: '#505050'
  },
  servicesTitle: {
    fontSize: 18,
    color: '#505050',
    fontWeight: '700',
    marginBottom: 30,
    marginTop: 30
  },
  service: {
    flexDirection: 'row',
    marginBottom: 20
  },
  serviceImage: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    marginRight: 10
  },
  serviceName: {
    fontSize: 16,
    marginBottom: 5,
    color: '#505050'
  },
  serviceAmount: {
    fontSize: 18,
    marginBottom: 5,
    color: PRIMARY_COLOR
  },
  check: {
    color: 'green',
    fontSize: 24,
  },
  total: {
     flexDirection:  'row',
     padding: 10,
     borderTopWidth: 1,
     borderTopColor: '#ddd',
     justifyContent: 'center',
     alignItems: 'center',
     height: 60
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SECONDARY_COLOR
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PRIMARY_COLOR
  },
  bookButton: {
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: width
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  bookConfirmationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#505050'
  },
  bookConfirmationInfo: {
    fontSize: 15,
    textAlign: 'center',
    color: '#505050'
  },
  bookConfirmationImage: {
    height: 160,
    width: 160,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginBottom: 30
  },
  booking: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  bookingInfo: {
    width: width - 100
  },
  bookingImage: {
    width: 80,
    height: 80,
    resizeMode: 'stretch',
    marginRight: 10,
  },
  bookingName: {
    color: 'black',
    fontSize: 14,
    marginBottom: 5
  },
  bookingPrice: {
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    fontSize: 16
  },
  services: {
    marginTop: 20
  },
  car: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    backgroundColor: 'white'
  },
  carImage: {
    width: 160,
    height: 120,
    resizeMode: 'stretch',
    marginRight: 10,
    borderRadius: 16
  },
  cardinfo: {
    width: width - 210,
  },
  bookingDate: {
    fontSize: 12,
    color: '#555555',
    marginBottom: 5
  },
  bookingCarName: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5
  },
  cardName: {
    color: '#000000',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  carPrice: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold'
  }

});


export const pickerSelectStyles = StyleSheet.create({
  viewContainer: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#ddd',
    height: 45
  },
  inputIOS: {
    fontSize: 12,
    height: 45,
    padding: 0,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    color: 'black',
  },
  underline: {
     borderTopWidth: 0,
     marginHorizontal: 0,
   },
});

export const carsFilterStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    height: 45,
    padding: 5,
    backgroundColor: 'white',
    color: 'black'
  },
  underline: {
     borderTopWidth: 0,
     marginHorizontal: 0,
   },
});
