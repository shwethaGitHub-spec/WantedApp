import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import db from '../config';
import firebase from 'firebase';
import {
  FontAwesome5,
  Octicons,
  AntDesign,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';

import { Icon, Header } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

export default class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      age: '',
      confirmPassword: '',
    };
  }

  signUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection('users').add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            email_id: this.state.emailId,
            address: this.state.address,
            age: this.state.age,
          });
          this.props.navigation.navigate('WelcomeScreen');

          var user = firebase.auth().currentUser;
          user
            .sendEmailVerification()
            .then(function () {
              return Alert.alert(
                'Verification email sent, please verify before logging in!'
              );
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/signup.png')}
          style={styles.image}>
          <ScrollView>
          
            <View style={{ marginTop: RFValue(30) }}>
          <KeyboardAvoidingView
            >    
                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}>
                    <FontAwesome5 name="user" size={RFValue(25)} color="pink" />
                  </View>
                  <TextInput
                    style={styles.loginBox2}
                    placeholder="First Name"
                    maxLength={12}
                    placeholderTextColor="white"
                    onChangeText={(text) => {
                      this.setState({
                        firstName: text,
                      });
                    }}
                    value={this.state.firstName}
                  />
                </View>

                <View
                  style={[styles.inputContainer, { marginTop: RFValue(30) }]}>
                  <View style={styles.iconStyle}>
                    <FontAwesome5 name="user" size={RFValue(25)} color="pink" />
                  </View>
                  <TextInput
                    style={styles.loginBox2}
                    placeholder="Last Name"
                    maxLength={12}
                    placeholderTextColor="white"
                    onChangeText={(text) => {
                      this.setState({
                        lastName: text,
                      });
                    }}
                    value={this.state.lastName}
                  />
                </View>

                <View
                  style={[styles.inputContainer, { marginTop: RFValue(30) }]}>
                  <View style={styles.iconStyle}>
                    <MaterialIcons
                      name="phone"
                      size={RFValue(25)}
                      color="pink"
                    />
                  </View>
                  <TextInput
                    style={styles.loginBox2}
                    placeholder="Contact No."
                    maxLength={10}
                    placeholderTextColor="white"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      this.setState({
                        contact: text,
                      });
                    }}
                    value={this.state.contact}
                  />
                </View>

                <View
                  style={[styles.inputContainer, { marginTop: RFValue(30) }]}>
                  <View style={styles.iconStyle}>
                    <FontAwesome5 name="user" size={RFValue(25)} color="pink" />
                  </View>
                  <TextInput
                    style={styles.loginBox2}
                    placeholder="Age"
                    maxLength={2}
                    placeholderTextColor="white"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      this.setState({
                        age: text,
                      });
                    }}
                    value={this.state.age}
                  />
                </View>

                <View
                  style={[styles.inputContainer, { marginTop: RFValue(30) }]}>
                  <View style={styles.iconStyle}>
                    <FontAwesome5 name="user" size={RFValue(25)} color="pink" />
                  </View>
                  <TextInput
                    style={styles.loginBox2}
                    placeholder="Address"
                    multiline={true}
                    placeholderTextColor="white"
                    onChangeText={(text) => {
                      this.setState({
                        address: text,
                      });
                    }}
                    value={this.state.address}
                  />
                </View>

                <View
                  style={[styles.inputContainer, { marginTop: RFValue(30) }]}>
                  <View style={styles.iconStyle}>
                    <MaterialIcons
                      name="email"
                      size={RFValue(25)}
                      color="pink"
                    />
                  </View>
                  <TextInput
                    style={styles.loginBox2}
                    placeholder="Email ID"
                    keyboardType={'email-address'}
                    placeholderTextColor="white"
                    onChangeText={(text) => {
                      this.setState({
                        emailId: text.toLowerCase(),
                      });
                    }}
                    value={this.state.emailId}
                  />
                </View>

                <View
                  style={[styles.inputContainer, { marginTop: RFValue(30) }]}>
                  <View style={styles.iconStyle}>
                    <AntDesign name="unlock" size={RFValue(25)} color="pink" />
                  </View>
                  <TextInput
                    style={styles.loginBox2}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="white"
                    onChangeText={(text) => {
                      this.setState({
                        password: text,
                      });
                    }}
                    value={this.state.password}
                  />
                </View>

                <View
                  style={[styles.inputContainer, { marginTop: RFValue(30) }]}>
                  <View style={styles.iconStyle}>
                    <AntDesign name="unlock" size={RFValue(25)} color="pink" />
                  </View>
                  <TextInput
                    style={styles.loginBox2}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    placeholderTextColor="white"
                    onChangeText={(text) => {
                      this.setState({
                        confirmPassword: text,
                      });
                    }}
                    value={this.state.confirmPassword}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: RFValue(10),
              }}>
              <LinearGradient
                colors={['#65432E', '#92603F', '#A37045']}
                style={styles.button}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    this.signUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    );
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(23),
                      textAlign: 'center',

                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                colors={['#65432E', '#92603F', '#A37045']}
                style={styles.button}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('WelcomeScreen');
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(23),
                      textAlign: 'center',

                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    margin: RFValue(10),
    padding: 5,
    fontSize: RFValue(20),
    shadowColor: 'white',
    shadowRadius: 10,
    borderRadius: 10,
    height: RFValue(45),
    width: RFValue(130),
  },
  loginBox2: {
    marginBottom: 5,
    marginLeft: -7,
    fontSize: RFValue(20),
    borderRadius: 10,
    height: RFValue(40),
    width: RFValue(213),
    borderColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    color: 'white',
  },
  inputContainer: {
    padding: 7,
    marginTop: 25,
    fontSize: RFValue(20),
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    height: RFValue(40),
    width: RFValue(270),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  iconStyle: {
    justifyContent: 'center',
    width: RFValue(50),
  },
});
