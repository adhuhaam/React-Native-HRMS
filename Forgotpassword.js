import img from "./logo.png";
import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Pressable,
    Alert,
    ScrollView,
    Platform,
    ActivityIndicator
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from 'react-native-root-toast';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Forgotpassword({ navigation }) {
    const [temp, setTemp] = useState({
        empEmail: ''
    });
    const [loader, setloader] = useState(true);
    const [ForgotPasswordstatus, setForgotPasswordstatus] = useState(false);
    const [LoaderLogout, SetLoaderLogout] = useState(true);

    const ForgotPassword1 = async (values) => {

        try {

            setForgotPasswordstatus(true);
            setloader(false);
            console.log("Fcn called", values);
            const response = await fetch('https://sit.hrms.alphadot.co.in/apigateway/api/auth/password/resetlink',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ email: values.toLowerCase() }),
                }
            );
            const result = await response.json();
            console.log(result);
            Toast.show(result.data, {
                duration: Toast.durations.LONG,
            });
        } catch (error) {
            Toast.show("Server Error", {
                duration: Toast.durations.SHORT,
            });
            setloader(true);
            setForgotPasswordstatus(false);

        } finally {
            setloader(true);
            setForgotPasswordstatus(false);
            setTemp('');
        }

    }
    const handleLogout = async () => {
        console.log('token -> ', token._j);
        try {
          SetLoaderLogout(false);
          const response = await fetch('https://sit.hrms.alphadot.co.in/apigateway/api/user/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token._j}`
            },
            body: JSON.stringify({
              deviceInfo: {
                deviceId: 'D1',
                deviceType: 'DEVICE_TYPE_ANDROID',
                notificationToken: null
              }
            })
          });
          if (response.status == 200) {
            // ToastAndroid.show(' Logged Out Successfully !', ToastAndroid.SHORT, ToastAndroid.TOP);
            Toast.show('Logged Out Successfully !', {
              duration: Toast.durations.SHORT,
            });
          } else {
            // ToastAndroid.show(' You Have already Logged Out !', ToastAndroid.SHORT, ToastAndroid.TOP);
            Toast.show('You Have already Logged Out !', {
              duration: Toast.durations.SHORT,
            });
          }
          AsyncStorage.clear();
          // const responseData = await newdata.text();
          // console.log(responseData);
          // ToastAndroid.show(responseData.data, ToastAndroid.SHORT, ToastAndroid.TOP);
          navigation.navigate("Login");
          SetLoaderLogout(true);
        } catch (error) {
          AsyncStorage.clear();
          console.log("Server Error Cannot Log out", error);
          // ToastAndroid.show(' Server Error Cannot logout !', ToastAndroid.SHORT, ToastAndroid.TOP);
          Toast.show('Server Error Cannot logout !', {
            duration: Toast.durations.SHORT,
          });
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
    
      };
    return (
        <RootSiblingParent>
            <View style={styles.container}>
                <View style={styles.header}>

                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <View>
                            <Icon name="arrow-left" size={30} color="black" style={{ marginHorizontal: 15 }} />
                        </View>
                    </Pressable>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "80%" }}>
                        <Text style={styles.maintext}>Forgot Password</Text>
                        <View >
                            <TouchableOpacity onPress={handleLogout} >

                                <View style={styles.logout}>
                                    {/* <Text style={{ fontSize: 17, color: 'white', fontWeight: 500 }}>Log Out</Text> */}
                                    <Text style={{ fontSize: 17, color: "white", fontWeight: 'bold', alignSelf: 'center', fontWeight: 500 }} >{LoaderLogout ? 'Log Out' : <View style={{ paddingVertical: 2 }}><ActivityIndicator color="#ffff" /></View>}</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ height: "80%", justifyContent: 'center' }}>
                <View style={styles.box}>
                    <StatusBar style="auto" />
                    <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
                        <Image source={img} style={styles.img}></Image>
                    </View>

                    <Text style={styles.empt}>Enter your registered email</Text>
                    <View style={{ marginTop: 5 }}>
                        <View style={styles.inputView}>
                            <TextInput
                                value={temp.empEmail}
                                style={styles.TextInput}
                                placeholder="Email"
                                keyboardType="email-address"
                                placeholderTextColor="#003f5c"
                                onChangeText={(empEmail) => setTemp({ ...temp, empEmail: empEmail })}
                            />
                        </View>


                    </View>

                    <View style={{ alignItems: "center", marginVertical: 20 }}>
                        <TouchableOpacity style={[styles.submitBtn, ForgotPasswordstatus ? styles.loginBtnDisabled : null]}
                            disabled={ForgotPasswordstatus}
                            onPress={() => ForgotPassword1(temp.empEmail)}
                        >
                            <Pressable onPress={() => ForgotPassword1(temp.empEmail)} disabled={ForgotPasswordstatus}>
                                <Text style={{ color: "white", fontWeight: 'bold' }} >{loader ? 'Send Mail' : <View style={{}}><ActivityIndicator color="#ffff" /></View>}</Text>
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </View>
        </RootSiblingParent>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
      },
    inputView: {
        borderRadius: 10,
        marginBottom: 0,
        alignItems: "center",
    },
    inputbox: {
        marginVertical: 10,
    },
    header: {
        // backgroundColor: "green",
        width: "100%",
        height: 65,
        marginVertical: 30,
        // justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
      maintext: {
        fontWeight: "400",
        fontSize: 20
      },
    TextInput: {
        padding: 14,

        opacity: 1,
        color: "#013e5a",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#f2f5f6",
        width: 240,
    }, img: {
        width: 245,
        height: 55,
    },
    box: {
        width: 320,
        height: 310,
        backgroundColor: "#fff",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    submitBtn: {
        width: "75%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "brown",

    },
    icon: {
        padding: 10,
    },
    empt: {
        fontWeight: "500",
        fontFamily: "serif",
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 17,

    },
    buttonText: {
        color: "white",
        fontSize: 15,
    },
    loginBtnDisabled: {
        backgroundColor: 'brown'
    }
});
