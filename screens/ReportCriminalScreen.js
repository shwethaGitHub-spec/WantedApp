import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  TouchableHighlight,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';

import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  SearchBar,
  ListItem,
  Header,
  Input,
  Avatar,
  Card,
} from 'react-native-elements';

import MyHeader from '../components/MyHeader';

export default class UploadCriminalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criminalLocation: '',
      criminalLooks: '',
      criminalAlone: '',
      criminalWeapons: '',
      criminalDetails: '',

      userId: firebase.auth().currentUser.email,
      userName: '',
      userEmail: '',
      userContact: '',
      userAge: '',
      userAddress: '',
      criminalName: this.props.navigation.getParam('name', 'NO-User'),
      requestId: '',
      image: '#',
      modalVisible: false,
      cameraPermission: false,
      isModalVisible: true,
    };
  }

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('reported_criminal_photos/' + imageName);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({
          image: url,
        });
        this.addRecord(
          url,
          this.state.criminalLocation,
          this.state.criminalLooks,
          this.state.criminalAlone,
          this.state.criminalWeapons,
          this.state.criminalDetails
        );
      })
      .catch((error) => {
        this.setState({
          image: '#',
        });
      });
  };

  uploadImage = async (uri) => {
    var imageName = this.state.criminalName;
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child('reported_criminal_photos/' + imageName);
    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  selectImage = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!cancelled) {
      this.setState({
        image: uri,
        modalVisible: false,
      });
    }
  };

  clickPhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ cameraPermission: status === 'granted' });
    if (this.state.cameraPermission) {
      await ImagePicker.launchCameraAsync({
        compressImageMaxWidth: 290,
        compressImageMaxHeight: 290,
        cropping: true,
        compressImageQuality: 0.9,
      }).then((image) => {
        this.setState({
          image: image.uri,
          modalVisible: false,
        });
      });
    } else {
      return Alert.alert('Permissions Not Granted').then(() => {
        this.setState({
          modalVisible: false,
        });
      });
    }
  };

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }
  getUserDetails = (userId) => {
    db.collection('users')
      .where('email_id', '==', userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userName: doc.data().first_name + ' ' + doc.data().last_name,
            userAge: doc.data().age,
            userEmail: doc.data().email_id,
            userContact: doc.data().contact,
            userAddress: doc.data().address,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails(this.state.userId);
  }

  addRecord = async (
    imageName,
    criminalLocation,
    criminalLooks,
    criminalAlone,
    criminalWeapons,
    criminalDetails
  ) => {
    var today = new Date();
    var randomRequestId = this.createUniqueId();
    const { navigation } = this.props;
    const criminalName = navigation.getParam('name', 'NO-User');
    const criminalImage = navigation.getParam('image', 'NO-Image');
    const criminalAge = navigation.getParam('age', 'NO-Age');
    const criminalGender = navigation.getParam('gender', 'NO-Gender');
    const criminalCrime = navigation.getParam('crime', 'NO-Crime');
    const criminalAddressOfLastCrime = navigation.getParam(
      'addressoflastcrime',
      'NO-LastCrime'
    );
    const uploadedOn = navigation.getParam('updateddate', 'NO-Date');
    const hairColor = navigation.getParam('haircolor', 'NO-Color');

    db.collection('reported_criminals').add({
      image_name_new: imageName,
      criminal_name: criminalName,
      image_name_old: criminalImage,
      criminal_age: criminalAge,
      criminal_gender: criminalGender,
      criminal_crime: criminalCrime,
      criminal_address_of_last_crime: criminalAddressOfLastCrime,
      criminal_uploaded_on: uploadedOn,
      criminal_hair_color: hairColor,

      user_name: this.state.userName,
      user_email: this.state.userEmail,
      user_contact: this.state.userContact,
      user_age: this.state.userAge,
      user_address: this.state.userAddress,

      criminal_location: this.state.criminalLocation,
      criminal_looks: this.state.criminalLooks,
      criminal_alone: this.state.criminalAlone,
      criminal_weapons: this.state.criminalWeapons,
      criminal_details: this.state.criminalDetails,

      request_id: randomRequestId,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      day:
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate(),
    });

    this.setState({
      criminalLocation: '',
      criminalLooks: '',
      criminalAlone: '',
      criminalWeapons: '',
      criminalDetails: '',

      userName: '',
      userEmail: '',
      userContact: '',
      userAge: '',
      userAddress: '',

      requestId: randomRequestId,
      image: '#',
    });
    this.props.navigation.navigate('CriminalListScreen');
    return Alert.alert('Reported To Police.');
  };
  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        style={styles.modalView2}
        isVisible={this.state.isModalVisible}
        backDropOpacity={0.4}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: RFValue(25),
            fontFamily: '',
            textAlign: 'center',
            paddingBottom: 2,
          }}>
          CAUTION !!
        </Text>
        <Text></Text>
        <Text></Text>
        <Text
          style={{
            color: 'red',
            fontWeight: 'bold',
            fontSize: RFValue(13),
            fontFamily: 'Roboto',
            textAlign: 'center',
          }}>
          Please dont send any false alarms to police as your information about
          the criminal would be very sensitive and will be taken very seriously.
          Kindly act as a RESPONSIBLE CITIZEN of India. Be assured that if the
          criminal is caught by the information provided by you, it will be
          rewarded.
        </Text>
        <Text> </Text>
        <Text
          style={{
            color: 'red',
            fontWeight: 'bold',
            fontSize: RFValue(13),
            fontFamily: 'Roboto',
            textAlign: 'center',
          }}>
          Above all, your personal information will be kept highly confidential.
        </Text>
        <Text
          style={{
            color: 'red',
            fontWeight: 'bold',
            fontSize: RFValue(13),
            fontFamily: 'Roboto',
            textAlign: 'center',
          }}>
          Let's make a criminal-free-nation.
        </Text>
        <Text> </Text>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: RFValue(14),
            fontFamily: 'Roboto',
            textAlign: 'center',
            paddingBottom: 5,
          }}>
          After reporting the police, they may contact you through e-mail or
          call. Therefore, please be vigilant always.
        </Text>

        <Text
          style={styles.cancelButtonText}
          onPress={() => {
            this.setState({ isModalVisible: false });
          }}>
          ACCEPT
        </Text>
      </Modal>
    );
  };

  render() {
    const { navigation } = this.props;
    const criminalName = navigation.getParam('name', 'NO-User');
    const criminalAge = navigation.getParam('age', 'NO-Age');
    const criminalImage = navigation.getParam('image', 'NO-Image');
    const criminalGender = navigation.getParam('gender', 'NO-Gender');
    const criminalCrime = navigation.getParam('crime', 'NO-Crime');
    return (
      <View style={{ flex: 1 }}>
        {this.showModal()}

        <Modal
          style={styles.modalView}
          isVisible={this.state.modalVisible}
          backDropOpacity={0.4}>
          <View
            style={{
              width: '70%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingTop: RFValue(100),
            }}>
            <Card>
              <TouchableOpacity
                style={{ paddingTop: RFValue(10) }}
                onPress={() => {
                  this.clickPhoto();
                }}>
                <Image
                  source={require('../assets/camera.png')}
                  style={{
                    width: RFValue(60),
                    height: RFValue(60),
                    marginBottom: 3,
                  }}
                />
              </TouchableOpacity>
              <Text style={{ paddingLeft: RFValue(25) }}>or</Text>
              <TouchableOpacity
                onPress={() => {
                  this.selectImage();
                }}>
                <Image
                  source={require('../assets/gallery.png')}
                  style={{
                    width: RFValue(60),
                    height: RFValue(60),
                    marginTop: RFValue(3),
                    marginBottom: RFValue(18),
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  CANCEL
                </Text>
              </TouchableOpacity>
            </Card>
          </View>
        </Modal>

        <View style={{ flex: 0.1 }}>
          <LinearGradient colors={['#88563B', '#92603F', '#D09B69']}>
            <Header
              centerComponent={{
                text: 'REPORT POLICE',
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
            />
          </LinearGradient>
        </View>

        <View style={{ flex: 0.9 }}>
          <ScrollView>
            <View style={{ flex: 0.3, backgroundColor: 'white', marginTop: 4 }}>
              <Card
                title={'Criminal Details'}
                titleStyle={{
                  fontSize: RFValue(30),
                  color: 'black',
                  fontFamily: 'Roboto',
                }}
                containerStyle={{
                  borderRadius: 30,
                  backgroundColor: '#E5E5E5',
                }}>
                <LinearGradient
                  colors={[
                    '#D2B188',
                    '#B7865D',
                    '#A37045',
                    '#88563B',
                    'rgb(120,85,51)',
                  ]}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 20,
                    borderRadius: 30,
                  }}>
                  <View style={{ marginTop: RFValue(20) }}>
                    <Avatar
                      rounded
                      source={{ uri: criminalImage }}
                      size="xlarge"
                    />
                  </View>
                  <Card
                    containerStyle={{
                      borderRadius: 30,
                      width: RFValue(230),
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: RFValue(15),
                          flex: 0.4,
                        }}>
                        Name :
                      </Text>
                      <Text
                        style={{
                          paddingLeft: RFValue(5),
                          fontSize: RFValue(14),
                          flex: 0.6,
                        }}>
                        {criminalName}
                      </Text>
                    </View>
                  </Card>

                  <Card
                    containerStyle={{
                      borderRadius: 30,
                      width: RFValue(230),
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: RFValue(15),
                          flex: 0.4,
                        }}>
                        Crime Info :
                      </Text>
                      <Text
                        style={{
                          paddingLeft: RFValue(5),
                          fontSize: RFValue(14),
                          flex: 0.6,
                        }}>
                        {criminalCrime}
                      </Text>
                    </View>
                  </Card>
                </LinearGradient>
              </Card>

              <View style={{ alignItems: 'center', marginTop: RFValue(25) }}>
                <KeyboardAvoidingView>
                  <LinearGradient
                    colors={[
                      '#D2B188',
                      '#B7865D',
                      '#A37045',
                      '#88563B',
                      'rgb(120,85,51)',
                    ]}
                    style={{
                      justifyContent: 'center',
                      paddingBottom: 25,
                    }}>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ modalVisible: true });
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: RFValue(15),
                            paddingTop: 15,
                          }}>
                          Choose/Take a Photo Of Criminal:
                        </Text>

                        <Avatar
                          rounded
                          source={{ uri: this.state.image }}
                          size={RFValue(130)}
                          containerStyle={{ alignSelf: 'center' }}
                        />
                      </TouchableOpacity>
                    </View>
                    <Input
                      style={styles.formTextInput}
                      label={
                        'Where did you see him/her? :                                         '
                      }
                      labelStyle={{ color: 'white', fontSize: RFValue(15) }}
                      placeholderTextColor="white"
                      placeholder={''}
                      multiline={true}
                      containerStyle={{ marginTop: RFValue(20) }}
                      onChangeText={(text) => {
                        this.setState({
                          criminalLocation: text,
                        });
                      }}
                      value={this.state.criminalLocation}
                    />
                    <Input
                      style={styles.formTextInput}
                      label={
                        "Was the looks same? If 'no' then specify :               "
                      }
                      labelStyle={{ color: 'white', fontSize: RFValue(15) }}
                      placeholder={' '}
                      multiline={true}
                      containerStyle={{ marginTop: RFValue(2) }}
                      onChangeText={(text) => {
                        this.setState({
                          criminalLooks: text,
                        });
                      }}
                      value={this.state.criminalLooks}
                    />
                    <Input
                      style={styles.formTextInput}
                      label={
                        "Was he/she alone? If 'no' then you must specify :"
                      }
                      labelStyle={{ color: 'white', fontSize: RFValue(15) }}
                      placeholder={''}
                      multiline={true}
                      containerStyle={{ marginTop: RFValue(2) }}
                      onChangeText={(text) => {
                        this.setState({
                          criminalAlone: text,
                        });
                      }}
                      value={this.state.criminalAlone}
                    />

                    <Input
                      style={styles.formTextInput2}
                      label={
                        'Did he/she have weapons? :                                             '
                      }
                      labelStyle={{ color: 'white', fontSize: RFValue(15) }}
                      placeholder={''}
                      multiline={true}
                      containerStyle={{ marginTop: RFValue(2) }}
                      onChangeText={(text) => {
                        this.setState({
                          criminalWeapons: text,
                        });
                      }}
                      value={this.state.criminalWeapons}
                    />

                    <Input
                      style={styles.formTextInput}
                      label={
                        'Additional Details:                                                                  '
                      }
                      labelStyle={{ color: 'white', fontSize: RFValue(15) }}
                      placeholderTextColor="#EBB574"
                      placeholder={'ex: what was he/she doing when you saw'}
                      multiline={true}
                      containerStyle={{ marginTop: RFValue(2) }}
                      onChangeText={(text) => {
                        this.setState({
                          criminalDetails: text,
                        });
                      }}
                      value={this.state.criminalDetails}
                    />
                    <LinearGradient
                      colors={['#65432E', '#92603F', '#A37045']}
                      style={{
                        backgroundColor: 'rgb(215,148,100)',
                        marginTop: RFValue(20),
                        padding: 7,
                        alignSelf: 'center',
                        fontSize: RFValue(20),
                        shadowColor: 'grey',
                        shadowRadius: 10,
                        borderRadius: 10,
                        height: RFValue(45),
                        width: RFValue(200),
                      }}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          if (
                            this.state.criminalAlone === '' ||
                            this.state.criminalLocation === '' ||
                            this.state.criminalLooks === '' ||
                            this.state.criminalWeapons === '' ||
                            this.state.criminalDetails === ''
                          ) {
                            return Alert.alert(
                              'Please fill out all the fields first.'
                            );
                          } else {
                            this.uploadImage(this.state.image);
                          }
                        }}>
                        <Text
                          style={{
                            fontSize: 23,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            color: 'white',
                          }}>
                          Report
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>

                    <Text
                      style={{
                        color: 'yellow',
                        fontWeight: 'bold',
                        fontSize: RFValue(13),
                        textAlign: 'center',
                        marginTop: RFValue(5),
                      }}>
                      Note: After pressing the button, please wait. This may
                      take a while.
                    </Text>
                  </LinearGradient>
                </KeyboardAvoidingView>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formTextInput: {
    margin: 0,
    padding: 7,
    fontSize: RFValue(20),
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    height: RFValue(40),
    width: RFValue(300),
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
  },
  KeyboardAvoidingView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: RFValue(20),
    marginTop: RFValue(10),
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  formTextInput2: {
    margin: 0,
    padding: 7,
    fontSize: RFValue(20),
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    height: RFValue(40),
    width: RFValue(250),
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
  },
  scrollview: {
    flex: 0.8,
  },
  modalView: {
    alignSelf: 'center',
    borderColor: '#bbbb',
    width: '60%',
    height: '60%',
  },
  modalView2: {
    alignSelf: 'center',
    borderColor: '#bbbb',
    width: '90%',
    height: '60%',
    padding: 7,
    backgroundColor: '#EFD8AB',
  },
  touchableopacity: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '90%',
  },
  requestbuttontxt: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    width: '75%',
    height: RFValue(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(50),
    backgroundColor: '#ef4f71',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
