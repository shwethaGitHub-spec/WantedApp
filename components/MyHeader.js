import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      value: '',
    };
  }

  BellIconWithBadge = () => {
    return (
      <View>
        <Icon
          name="bell"
          type="font-awesome"
          color="#ffffff"
          size={25}
          onPress={() => this.props.navigation.navigate('Notification')}
        />
      </View>
    );
  };

  render() {
    return (
      <Header
        centerComponent={{
          text: this.props.title,
          style: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
        }}
        rightComponent={<this.BellIconWithBadge {...this.props} />}
        backgroundColor="black"
      />
    );
  }
}
