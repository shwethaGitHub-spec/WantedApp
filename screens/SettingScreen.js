import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import { Card, Icon, Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';

export default class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      firstName: '',
      lastName: '',
      age: '',
      address: '',
      contact: '',
      docId: '',
    };
  }

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('users')
      .where('email_id', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.email_id,
            firstName: data.first_name,
            lastName: data.last_name,
            age: data.age,
            address: data.address,
            contact: data.contact,
            docId: doc.id,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection('users').doc(this.state.docId).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address: this.state.address,
      contact: this.state.contact,
      age: this.state.age,
    });
    this.props.navigation.navigate('CriminalListScreen');
    return Alert.alert('Profile Updated Successfully');
  };

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ImageBackground
            source={require('../assets/profilebg.png')}
            style={StyleSheet.absoluteFillObject}
            blurRadius={2}>
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
                rightComponent={
                  <TouchableOpacity
                    onPress={() => {
                      firebase
                        .auth()
                        .signOut()
                        .then(() => {
                          this.props.navigation.navigate('WelcomeScreen');
                          return Alert.alert('Log Out Successfull !!');
                        })
                        .catch((error) => {
                          // An error happened.
                        });
                    }}>
                    <Image
                      source={require('../assets/logout.png')}
                      style={{
                        width: RFValue(30),
                        height: RFValue(30),
                        marginTop: RFValue(3),
                        marginRight: RFValue(3),
                      }}
                    />
                  </TouchableOpacity>
                }
                centerComponent={{
                  text: 'PROFILE',
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
              <KeyboardAvoidingView>
                <View style={styles.formContainer}>
                  <Text
                    style={{
                      color: 'yellow',
                      fontWeight: 'bold',
                      fontSize: RFValue(15),
                      textAlign: 'center',
                      marginTop: RFValue(15),
                    }}>
                    Don't worry! Your personal details will be kept
                    confidential.
                  </Text>
                  <Text style={[styles.label, { marginTop: RFValue(20) }]}>
                    First Name :
                  </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={'First Name'}
                    maxLength={12}
                    onChangeText={(text) => {
                      this.setState({
                        firstName: text,
                      });
                    }}
                    value={this.state.firstName}
                  />
                  <Text style={[styles.label, { marginTop: RFValue(20) }]}>
                    Last Name :
                  </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={'Last Name'}
                    maxLength={12}
                    onChangeText={(text) => {
                      this.setState({
                        lastName: text,
                      });
                    }}
                    value={this.state.lastName}
                  />

                  <Text style={[styles.label, { marginTop: RFValue(20) }]}>
                    Age :
                  </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={'Age'}
                    maxLength={2}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                      this.setState({
                        age: text,
                      });
                    }}
                    value={this.state.age}
                  />

                  <Text style={[styles.label, { marginTop: RFValue(20) }]}>
                    Contact :
                  </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={'Contact'}
                    maxLength={10}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                      this.setState({
                        contact: text,
                      });
                    }}
                    value={this.state.contact}
                  />

                  <Text style={[styles.label, { marginTop: RFValue(20) }]}>
                    Address :
                  </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={'Address'}
                    multiline={true}
                    onChangeText={(text) => {
                      this.setState({
                        address: text,
                      });
                    }}
                    value={this.state.address}
                  />
                </View>

                <View style={styles.buttonView}>
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
                        this.updateUserDetails();
                      }}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </ImageBackground>
        </SafeAreaProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B5D888',
  },
  formContainer: {
    flex: 0.88,
    justifyContent: 'center',
    marginTop: RFValue(15),
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  label: {
    fontSize: RFValue(23),
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: RFValue(10),
    marginLeft: RFValue(20),
  },
  formTextInput: {
    marginTop: -3,
    padding: RFValue(7),
    fontSize: RFValue(20),
    marginRight: 0,
    alignSelf: 'center',
    borderBottomWidth: 2,
    color: 'white',
    borderColor: 'white',
    borderRadius: 10,
    height: RFValue(40),
    width: RFValue(240),
  },
  button: {
    width: '75%',
    height: RFValue(60),
    borderRadius: 50,
    backgroundColor: '#B88261',
    shadowColor: '#000',
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: RFValue(8),
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(-20),
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    width: '75%',
    height: RFValue(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(50),
    backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(20),
  },
  buttonView: {
    flex: 0.22,
    alignItems: 'center',
    marginTop: RFValue(45),
    paddingBottom: RFValue(20),
  },
  buttonText: {
    fontSize: RFValue(23),
    fontWeight: 'bold',
    color: '#fff',
  },
});
