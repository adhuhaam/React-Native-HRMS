import * as Location from 'expo-location';
import img from "./logo.png";
import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
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
  ToastAndroid,
  ActivityIndicator,
  PermissionsAndroid
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Time_sheet({ navigation }) {


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [LoaderLogout, SetLoaderLogout] = useState(true);
  const [LoaderCheckin, SetLoaderCheckin] = useState(true);
  const [LoaderCheckout, SetLoaderCheckout] = useState(true);


  const empId = AsyncStorage.getItem("EmpID");
  const token = AsyncStorage.getItem("response-token");


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);



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


  const CheckInHandler = async () => {
    SetLoaderCheckin(false);
    const latitude = (location.coords.latitude);
    const longitude = (location.coords.longitude);
    console.log(empId._j, token._j);
    try {
      const response = await fetch(`https://sit.hrms.alphadot.co.in/apigateway/payroll/timeSheet/checkIn/${empId._j}?Latitude=${latitude}&Longitude=${longitude}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token._j}`,
          },
        },
        {},
      )

      if (!response.ok) {
        console.log("No response from Api");
      } else {
        SetLoaderCheckin(true);
        const responseData = await response.text();
        console.log(responseData);
        // ToastAndroid.show(responseData, ToastAndroid.SHORT, ToastAndroid.TOP);
        Toast.show(responseData, {
          duration: Toast.durations.SHORT,
        });
      }

    }
    catch (error) {
      console.log(error);
    }
  }

  const CheckOutHandler = async () => {
    SetLoaderCheckout(false);
    const latitude = (location.coords.latitude);
    const longitude = (location.coords.longitude);
    console.log(empId._j, token._j);
    try {
      const response = await fetch(`https://sit.hrms.alphadot.co.in/apigateway/payroll/timeSheet/checkOut/${empId._j}?Latitude=${latitude}&Longitude=${longitude}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token._j}`,
          },
        },
        {},
      )

      if (!response.ok) {
        console.log("No response from Api");
      } else {
        SetLoaderCheckout(true);
        const responseData = await response.text();
        console.log(responseData);
        // ToastAndroid.show(responseData, ToastAndroid.SHORT, ToastAndroid.TOP);
        Toast.show(responseData, {
          duration: Toast.durations.SHORT,
        });
      }

    }
    catch (error) {
      console.log(error);
    }
  }


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
            <Text style={styles.maintext}>Timesheet</Text>
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
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Image source={img} style={styles.img}></Image>
            </View>


            <View style={{ marginVertical: 22 }}>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.subBtn} onPress={() => navigation.navigate("Userprofile", { Authtoken: token })}>
                  <Text style={{ color: "white", fontWeight: 'bold' }}>Employee Details</Text>
                </TouchableOpacity>

              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.subBtn} onPress={() => navigation.navigate("EmployeeDetails")} >

                    <Text style={{ color: "white", fontWeight: 'bold' }} >Attendance</Text>
        
                </TouchableOpacity>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.subBtn} onPress={CheckInHandler}>
 
                    <Text style={{ color: "white", fontWeight: 'bold' }} >{LoaderCheckin ? 'Check In' : <View style={{}}><ActivityIndicator color="#ffff" /></View>}</Text>

                </TouchableOpacity>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.subBtn} onPress={CheckOutHandler} >
                 
                    <Text style={{ color: "white", fontWeight: 'bold' }} >{LoaderCheckout ? 'Check Out' : <View style={{}}><ActivityIndicator color="#ffff" /></View>}</Text>

                </TouchableOpacity>
              </View>



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
  logout: {
    width: 85,
    justifyContent: 'center',
    display: 'flex',
    borderWidth: 0,
    borderColor: 'red',
    backgroundColor: 'brown',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  inputView: {
    borderRadius: 10,
    marginBottom: 10,
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
  img: {
    width: 240,
    height: 55,
  },
  box: {
    width: 320,
    height: 'auto',
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
      color: 'black'
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subBtn: {
    width: "75%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "brown",
    marginVertical: 6
  },
  icon: {
    padding: 10,
  },
  circle: {
    backgroundColor: "rgba(128, 128, 128, 0.4)",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    borderRadius: 100,
  },
  empl: {
    fontSize: 29,
    fontWeight: "500",
    fontFamily: "serif",
  },
  empt: {
    fontWeight: "500",
    fontFamily: "serif",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,

  },
  maintext: {
    top:2,
    fontWeight: "400",
    fontSize: 20
  }
});