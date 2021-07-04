import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Animated,
  Easing,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { ListItem, Divider, Header, Avatar } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from 'react-native-elements';
//FIXME: https://github.com/react-native-elements/react-native-elements/pull/2561
// @ts-ignore The typings are also missing "web"
if (colors.platform.web == null) {
  // @ts-ignore The typings are also missing "web"
  colors.platform.web = {
    primary: '#2089dc',
    secondary: '#ca71eb',
    grey: '#393e42',
    searchBg: '#303337',
    success: '#52c41a',
    error: '#ff190c',
    warning: '#faad14',
  };
}

export default class CriminalListScreen extends Component {
  constructor() {
    super();
    this.state = {
      requestedCriminalsList: [],
      image: '#',
    };
    this.requestRef = null;
  }

  getRequestedCriminalsList = () => {
    this.requestRef = db
      .collection('requested_criminals')
      .onSnapshot((snapshot) => {
        var requestedCriminalsList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          requestedCriminalsList: requestedCriminalsList,
        });
      });
  };

  componentDidMount() {
    this.getRequestedCriminalsList();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <Animated.View
        style={{
          marginBottom: 20 / 1.2,
          backgroundColor: '#EFD8AB',
          borderRadius: 12,
          shadowColor: '#000',
          shadowoffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 20,
        }}>
        <ListItem
          containerStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
          key={i}
          titleStyle={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: RFValue(18),
          }}
          title={item.criminal_name}
          subtitle={
            <Text style={{ fontFamily: 'Roboto', fontSize: RFValue(13) }}>
              Reward: Rs {item.criminal_reward}
            </Text>
          }
          leftElement={
            <Avatar
              rounded
              source={{ uri: item.image_name }}
              size={RFValue(90)}
            />
          }
          rightElement={
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('CriminalDetailsScreen', {
                    details: item,
                  });
                }}>
                <Text style={{ color: '#ffff', fontSize: RFValue(14) }}>
                  View
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </Animated.View>
    );
  };

  render() {
    return (
      <SafeAreaProvider style={styles.view}>
        <LinearGradient colors={['#88563B', '#92603F', '#D09B69']}>
          <Header
            rightComponent={
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SettingScreen')}>
                <Image
                  source={require('../assets/profile.png')}
                  style={{
                    width: RFValue(30),
                    height: RFValue(30),
                    marginTop: RFValue(3),
                    marginRight: RFValue(3),
                  }}
                />
              </TouchableOpacity>
            }
            leftComponent={
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('InformationScreen')
                }>
                <Image
                  source={require('../assets/information.png')}
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
              text: 'CRIMINALS LIST',
              style: {
                color: '#fff',
                fontSize: RFValue(17),
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
        <LinearGradient
          colors={[
            '#D2B188',
            '#B7865D',
            '#A37045',
            '#88563B',
            'rgb(120,85,51)',
          ]}
          style={{
            flex: 1,
          }}>
          <ScrollView>
            <View style={{ flex: 1 }}>
              {this.state.requestedCriminalsList.length === 0 ? (
                <View style={styles.subContainer}>
                  <Text
                    style={{
                      fontSize: RFValue(30),
                      marginTop: RFValue(150),
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    List Of All Criminals
                  </Text>
                </View>
              ) : (
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.requestedCriminalsList}
                  renderItem={this.renderItem}
                  contentContainerStyle={{
                    padding: 20,
                    paddingTop: StatusBar.currentHeight || 42,
                  }}
                />
              )}
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: RFValue(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: RFValue(100),
    height: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(120,85,51)',
    shadowColor: '#000',
    shadowRadius: 9,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 9,
  },
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
