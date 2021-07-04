import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import db from '../config.js';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class EditCriminalScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <LinearGradient colors={['#88563B', '#92603F', '#D09B69']}>
          <Header
            leftComponent={
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('CriminalListScreen')
                  }>
                  <Image
                    source={require('../assets/back.png')}
                    style={{
                      width: RFValue(30),
                      height: RFValue(30),
                      marginTop: RFValue(3),
                    }}
                  />
                </TouchableOpacity>
              </View>
            }
            centerComponent={{
              text: 'EDIT PHOTO',
              style: {
                color: '#fff',
                fontSize: RFValue(19),
                fontWeight: 'bold',
                fontStyle: 'Roboto',
                alignSelf: 'center',
              },
            }}
            containerStyle={{
              shadowColor: '#bbbb',
              shadowRadius: 5,
              alignItems: 'center',
              height: RFValue(70),
              justifyContent: 'center',
            }}
            backgroundColor="rgba(0,0,0,0.1)"
          />
        </LinearGradient>

        <View style={{ alignItems: 'center', marginTop: RFValue(80) }}>
          <Image
            source={require('../assets/underdev.png')}
            style={{
              width: RFValue(400),
              height: RFValue(230),
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              marginTop: 30,
              textAlign: 'center',
              fontSize: RFValue(30),
            }}>
            "Feature Under Development"
          </Text>
        </View>
      </View>
    );
  }
}
