import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import { Card, Header, Icon, Avatar } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import Communications from 'react-native-communications';
import db from '../config.js';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';

export default class CriminalDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestId: this.props.navigation.getParam('details')['request_id'],
      criminalName: this.props.navigation.getParam('details')['criminal_name'],
      crime: this.props.navigation.getParam('details')['crime_details'],
      criminalAge: this.props.navigation.getParam('details')['age'],
      updated_date: this.props.navigation.getParam('details')['day'],
      criminalImage: this.props.navigation.getParam('details')['image_name'],
      criminalGender: this.props.navigation.getParam('details')['gender'],
      criminalHeight: this.props.navigation.getParam('details')['height'],
      criminalWeight: this.props.navigation.getParam('details')['weight'],
      isModalVisible: false,
      criminalHairColor: this.props.navigation.getParam('details')[
        'hair_color'
      ],
      criminalReward: this.props.navigation.getParam('details')[
        'criminal_reward'
      ],
      addressOfLastCrime: this.props.navigation.getParam('details')[
        'address_of_last_crime'
      ],
    };
  }

  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={this.state.isModalVisible}
        backDropOpacity={0.4}>
        <View>
          <Card
            containerStyle={{
              width: RFValue(310),
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Avatar
              source={{ uri: this.state.criminalImage }}
              size={RFValue(280)}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: RFValue(15),
                  fontSize: RFValue(25),
                  textDecorationLine: 'underline',
                }}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(120,85,51)' }}>
        {this.showModal()}
        <View style={{ flex: 0.1 }}>
          <LinearGradient colors={['#88563B', '#92603F', '#D09B69']}>
            <Header
              centerComponent={{
                text: 'CRIMINAL DETAILS',
                style: {
                  color: '#fff',
                  fontSize: RFValue(16),
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
            <View
              style={{
                flex: 0.3,
                backgroundColor: 'white',
                paddingBottom: RFValue(30),
              }}>
              <View style={{ alignItems: 'center', marginTop: RFValue(18) }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ isModalVisible: true });
                  }}>
                  <Avatar
                    source={{ uri: this.state.criminalImage }}
                    size={RFValue(150)}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: RFValue(12),
                  textAlign: 'center',
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                }}>
                Click On The Image To Enlarge
              </Text>
              <Card
                title={'Crime Details'}
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
                          flex: 0.45,
                        }}>
                        Crime :
                      </Text>
                      <Text
                        style={{
                          paddingLeft: RFValue(5),
                          fontSize: RFValue(14),
                          flex: 0.55,
                        }}>
                        {this.state.crime}
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
                          flex: 0.5,
                        }}>
                        Last Known Location :
                      </Text>
                      <Text
                        style={{
                          paddingLeft: RFValue(5),
                          fontSize: RFValue(14),
                          flex: 0.5,
                        }}>
                        {this.state.addressOfLastCrime}
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
                          flex: 0.5,
                        }}>
                        Updated On :
                      </Text>
                      <Text
                        style={{
                          paddingLeft: RFValue(5),
                          fontSize: RFValue(14),
                          flex: 0.5,
                        }}>
                        {this.state.updated_date}
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
                          flex: 0.5,
                        }}>
                        Reward On Finding :
                      </Text>
                      <Text
                        style={{
                          paddingLeft: RFValue(5),
                          fontSize: RFValue(14),
                          flex: 0.5,
                        }}>
                        Rs {this.state.criminalReward}
                      </Text>
                    </View>
                  </Card>
                </LinearGradient>
              </Card>

              <View style={{ marginTop: RFValue(20) }}>
                <Card
                  title={'Criminal Details'}
                  titleStyle={{
                    fontSize: RFValue(30),
                    color: 'black',
                    fontFamily: 'Roboto',
                  }}
                  containerStyle={{
                    borderRadius: RFValue(30),
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
                          {this.state.criminalName}
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
                          Age :
                        </Text>
                        <Text
                          style={{
                            paddingLeft: RFValue(5),
                            fontSize: RFValue(14),
                            flex: 0.6,
                          }}>
                          {this.state.criminalAge}
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
                            flex: 0.45,
                          }}>
                          Height :
                        </Text>
                        <Text
                          style={{
                            paddingLeft: RFValue(5),
                            fontSize: RFValue(14),
                            flex: 0.55,
                          }}>
                          {this.state.criminalHeight}
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
                            flex: 0.5,
                          }}>
                          Weight :
                        </Text>
                        <Text
                          style={{
                            paddingLeft: RFValue(5),
                            fontSize: RFValue(14),
                            flex: 0.5,
                          }}>
                          {this.state.criminalWeight} pounds
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
                            flex: 0.45,
                          }}>
                          Hair Color :
                        </Text>
                        <Text
                          style={{
                            paddingLeft: RFValue(5),
                            fontSize: RFValue(14),
                            flex: 0.55,
                          }}>
                          {this.state.criminalHairColor}
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
                            flex: 0.5,
                          }}>
                          Gender :
                        </Text>
                        <Text
                          style={{
                            paddingLeft: RFValue(5),
                            fontSize: RFValue(14),
                            flex: 0.5,
                          }}>
                          {this.state.criminalGender}
                        </Text>
                      </View>
                    </Card>
                  </LinearGradient>
                </Card>
              </View>

              <View style={{ marginTop: 20 }}>
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
                      this.props.navigation.navigate('ReportCriminalScreen', {
                        name: this.state.criminalName,
                        age: this.state.criminalAge,
                        gender: this.state.criminalGender,
                        crime: this.state.crime,
                        addressoflastcrime: this.state.addressOfLastCrime,
                        updateddate: this.state.updated_date,
                        haircolor: this.state.criminalHairColor,
                        image: this.state.criminalImage,
                      });
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(21),
                        alignSelf: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      Report Police
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                  onPress={() => Communications.phonecall('100', true)}>
                  <Image
                    source={require('../assets/call.png')}
                    style={{
                      width: RFValue(70),
                      height: RFValue(70),
                      marginTop: RFValue(3),
                      marginRight: RFValue(55),
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('EditCriminalScreen', {
                      image: this.state.image,
                    });
                  }}>
                  <Image
                    source={require('../assets/edit.png')}
                    style={{
                      width: RFValue(70),
                      height: RFValue(70),
                      marginTop: RFValue(3),
                      marginRight: RFValue(3),
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ paddingLeft: RFValue(30) }}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Roboto',
                      fontSize: RFValue(12),
                      paddingRight: RFValue(37),
                    }}>
                    Call Police
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Roboto',
                    fontSize: RFValue(12),
                  }}>
                  Edit Criminal Photo
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    margin: 10,

    fontSize: RFValue(20),
    alignSelf: 'center',

    shadowColor: 'grey',
    shadowRadius: 10,
    borderRadius: 10,
    height: RFValue(55),
    width: RFValue(240),
  },
  modalView: {
    alignSelf: 'center',
    borderColor: '#bbbb',
    width: '100%',
    height: '100%',
    padding: 7,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
