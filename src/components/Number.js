import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';


export default class Number extends Component {

  constructor(props){
    super(props);
    this.state = {
        quantity: this.props.value,
    }
  }


  _increment(){
      var quantity = this.state.quantity;
      var newValue = quantity + 1;
      this.setState({ quantity : newValue});
      this.props.onChange(newValue);
  }

  _decrement(){
      var quantity = this.state.quantity;
      if(quantity > this.props.min){
        var newValue = quantity - 1;
        this.setState({ quantity : newValue});
        this.props.onChange(newValue);
      }
  }

  render() {

     const { containerStyle, buttonStyle, valueStyle, value } = this.props

    return (
      <View style={[styles.container, containerStyle]}>
           <TouchableOpacity disabled={this.state.quantity == this.props.min} style={styles.button} onPress={() => this._decrement() }><Text style={[styles.buttonText, buttonStyle]}>{'-'}</Text></TouchableOpacity>
           <View style={styles.value}><Text  style={[styles.valueText, valueStyle]}>{this.state.quantity}</Text></View>
           <TouchableOpacity style={styles.button} onPress={() => this._increment() }><Text style={[styles.buttonText, buttonStyle]}>{'+'}</Text></TouchableOpacity>
      </View>
    );
  }
}


Number.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number
};



Number.defaultProps = {
  value: 1,
  min: 1
};


const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  button: {
    flex: 0.3,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef'
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555555'
  },
  value: {
    flex: 0.4,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    width: 100,
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555555'
  }


});
