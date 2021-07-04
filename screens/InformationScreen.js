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

export default class InformationScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ImageBackground
          source={require('../assets/infobg.png')}
          style={StyleSheet.absoluteFillObject}
          blurRadius={0.6}>
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
                text: 'HELP !!',
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
          <ScrollView>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: RFValue(18),
                fontFamily: 'Roboto',
                textAlign: 'center',
                marginTop: RFValue(15),
              }}>
              1. If you have found any criminal then directly report the police.
              Don't take any risk with your personal involvement. !!
            </Text>
            <Text> </Text>
            <Text> </Text>

            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: RFValue(18),
                fontFamily: 'Roboto',
                textAlign: 'center',
              }}>
              2. Be assured that, if the criminal is caught with the information
              provided by you, it will be rewarded.
            </Text>
            <Text> </Text>
            <Text> </Text>

            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: RFValue(18),
                fontFamily: 'Roboto',
                textAlign: 'center',
              }}>
              3. If you want any new criminal record to be uploaded then please
              reach out to nearest police station and file an FIR. The police
              will help you in uploading the details of criminal after they have
              approved. Civilians are not permitted to upload criminal records.
            </Text>
            <Text> </Text>
            <Text> </Text>

            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: RFValue(18),
                fontFamily: 'Roboto',
                textAlign: 'center',
              }}>
              4. Please dont send any false alarms to police as your information
              about the criminal would be very sensitive and will be taken very
              seriously. Kindly act as a RESPONSIBLE CITIZEN of India.
            </Text>
            <Text> </Text>
            <Text> </Text>

            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: RFValue(18),
                fontFamily: 'Roboto',
                textAlign: 'center',
              }}>
              5. Since, it is noticed that most of the criminals live in
              disguise. There is an edit option given in the app where you can
              make minor changes on the face of criminal that you might have
              spotted. There are some tools with the help of which you can draw
              moustache, beard, etc. on the face of criminal.
            </Text>
            <Text> </Text>
            <Text> </Text>

            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: RFValue(18),
                fontFamily: 'Roboto',
                textAlign: 'center',
              }}>
              6. If there is any emergency, call the police (100) through the
              app. The police will reach out to you soon.
            </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: RFValue(24),
                  fontWeight: 'bold',
                }}>
                YOUR HELP IS REALLY VALUABLE TO MAKE A
              </Text>
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: RFValue(28),
                  fontWeight: 'bold',
                }}>
                "CRIMINAL-FREE NATION"
              </Text>
              <Text> </Text>
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: RFValue(28),
                  fontWeight: 'bold',
                }}>
                !! THANK YOU !!
              </Text>
              <Text> </Text>
              <Text> </Text>
              <Text
                style={{
                  color: 'yellow',
                  fontWeight: 'bold',
                  fontSize: RFValue(20),
                  textAlign: 'center',
                  marginTop: RFValue(15),
                }}>
                Note: This app is developed as a part of the Silicon Valley
                Challenge program of Whitehat Junior.
              </Text>
              <Text> </Text>
              <Text> </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
