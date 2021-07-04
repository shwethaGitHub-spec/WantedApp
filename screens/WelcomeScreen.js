import React, { Component } from "react";
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
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  FontAwesome5,
  Octicons,
  AntDesign,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
    };
  }
  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        var user = firebase.auth().currentUser;
        if (!user.emailVerified) {
          return Alert.alert("Please verify your email before logging in.");
        } else {
          this.props.navigation.navigate("CriminalListScreen");
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  resetPassword = () => {
    var auth = firebase.auth();
    var emailAddress = this.state.emailId;
    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        return Alert.alert(
          "Reset password link has been sent to your email. Please check."
        );
      })
      .catch(function (error) {
        return Alert.alert(error);
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/bg1.png")}
          style={styles.image}
        >
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              flexDirection: "row",
            }}
          >
            <Image
              source={require("../assets/draw.png")}
              style={{
                width: RFValue(70),
                height: RFValue(100),
                marginTop: RFValue(3),
                marginLeft: RFValue(20),
              }}
            />
            <View style={{ marginTop: RFValue(10) }}>
              <Image
                source={require("../assets/wanted_text.png")}
                style={{
                  width: RFValue(200),
                  height: RFValue(60),
                  marginTop: RFValue(-10),
                  marginRight: RFValue(-30),
                }}
              />
              <Text
                style={{
                  color: "yellow",
                  paddingLeft: RFValue(2),
                  fontSize: RFValue(14),
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                }}
              >
                C r i m i n a l - F r e e - W o r l d
              </Text>
            </View>
          </View>

          <View style={{ marginTop: RFValue(20) }}>
            <KeyboardAvoidingView>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <MaterialIcons name="email" size={RFValue(25)} color="pink" />
                </View>
                <TextInput
                  style={styles.loginBox}
                  placeholder="wanted@example.com"
                  placeholderTextColor="white"
                  keyboardType="email-address"
                  onChangeText={(text) => {
                    this.setState({
                      emailId: text.toLowerCase(),
                    });
                  }}
                  value={this.state.emailId}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <AntDesign name="unlock" size={RFValue(25)} color="pink" />
                </View>
                <TextInput
                  style={styles.loginBox2}
                  secureTextEntry={true}
                  placeholder="Enter Password"
                  placeholderTextColor="white"
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                  value={this.state.password}
                />
              </View>
              <Text
                onPress={() => {
                  this.resetPassword();
                }}
                style={{
                  textAlign: "right",
                  margin: RFValue(15),
                  padding: 1,
                  color: "white",
                  marginTop: RFValue(10),
                  fontSize: RFValue(14),
                  textDecorationLine: "underline",
                  shadowColor: "black",
                  fontWeight: "bold",
                }}
              >
                Forgot Password ?
              </Text>

              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: RFValue(40),
                  justifyContent: "center",
                }}
              >
                <LinearGradient
                  colors={["#65432E", "#92603F", "#A37045"]}
                  style={styles.button}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      this.userLogin(this.state.emailId, this.state.password);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: RFValue(23),
                        textAlign: "center",

                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  colors={["#65432E", "#92603F", "#A37045"]}
                  style={styles.button}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() =>
                      this.props.navigation.navigate("SignUpScreen")
                    }
                  >
                    <Text
                      style={{
                        fontSize: RFValue(23),
                        textAlign: "center",

                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "rgb(215,148,100)",
    marginTop: RFValue(40),
    fontSize: RFValue(20),
    alignSelf: "center",
    shadowColor: "grey",
    shadowRadius: 10,
    borderRadius: 10,
    height: RFValue(45),
    width: RFValue(150),
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  loginBox: {
    marginBottom: 8,
    marginLeft: -7,
    fontSize: RFValue(20),
    borderRadius: 10,
    height: RFValue(40),
    width: RFValue(213),
    borderColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    color: "white",
  },
  loginBox2: {
    marginBottom: 5,
    marginLeft: -7,
    fontSize: RFValue(20),
    borderRadius: 10,
    height: RFValue(40),
    width: RFValue(213),
    borderColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    color: "white",
  },
  inputContainer: {
    padding: 7,
    marginTop: 25,
    fontSize: RFValue(20),
    alignSelf: "center",
    borderBottomWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    height: RFValue(40),
    width: RFValue(270),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  iconStyle: {
    justifyContent: "center",
    width: RFValue(50),
  },

  button: {
    alignSelf: "center",
    margin: RFValue(10),
    padding: 5,
    fontSize: RFValue(20),
    shadowColor: "white",
    shadowRadius: 10,
    borderRadius: 10,
    height: RFValue(45),
    width: RFValue(130),
  },
});
