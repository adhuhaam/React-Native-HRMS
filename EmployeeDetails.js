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
  ToastAndroid,
  ActivityIndicator
} from "react-native";
const token = AsyncStorage.getItem("response-token");
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EmployeeDetails({ navigation, route }) {
  // const { Authtoken } = route.params;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [temp, setTemp] = useState({
    Startdate: "",
    empID: "",
    workingHours: "",
    Enddate: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const token = AsyncStorage.getItem("response-token");
  const [LoaderLogout, SetLoaderLogout] = useState(true);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setStartDate(selectedDate);
      // console.log("startDate", selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setEndDate(selectedDate);
      // console.log("EndDate", selectedDate);
    }
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  function handleData() {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    const newData = {
      Startdate: formattedStartDate,
      empID: temp.empID,
      workingHours: temp.workingHours,
      Enddate: formattedEndDate,
    };
    console.log(formattedStartDate,formattedEndDate);
    navigation.navigate("EmpAttendence", { Start: formattedStartDate, End: formattedEndDate , Authtoken:token });
  }

  const handleLogout = async () => {
    console.log("Hello");
    console.log(token._j);
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
      AsyncStorage.clear();
      const deletedToken = await AsyncStorage.getItem("response-token");
      console.log("Deleted token:", deletedToken);
      ToastAndroid.show('Log Out Successful !', ToastAndroid.SHORT, ToastAndroid.TOP);
      SetLoaderLogout(true);
    } catch (error) {
      AsyncStorage.clear();
      console.log("Server Error Cannot Log out", error);
      ToastAndroid.show(' Server ErrorCannot logout !', ToastAndroid.SHORT, ToastAndroid.TOP);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    navigation.navigate("Login");
  };


  return (


    <View style={styles.container}>
      <View style={styles.header}>

        <Pressable onPress={() => navigation.navigate("Timesheet")}>
          <View>
            <Icon name="arrow-left" size={30} color="black" style={{ marginHorizontal: 15 }} />
          </View>
        </Pressable>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "80%" }}>
          <Text style={styles.maintext}>Attendance date</Text>
          <View >
            <TouchableOpacity onPress={handleLogout} >

              <View style={styles.logout}>
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
          <View style={styles.inputbox}>
            {/* <View style={styles.inputView}>
              <TextInput
                value={temp.empID}
                style={styles.TextInput}
                placeholder="Employee ID"
                keyboardType="numeric"
                placeholderTextColor="#003f5c"
                onChangeText={(empID) => setTemp({ ...temp, empID: empID })}
              />
            </View> */}

            <View style={styles.inputView}>
              <Text style={styles.TextInput} onPress={showStartDatePickerModal}>
                {startDate.toDateString()}
              </Text>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={handleStartDateChange}
                />
              )}
            </View>

            <View style={styles.inputView}>
              <Text style={styles.TextInput} onPress={showEndDatePickerModal}>
                {endDate.toDateString()}
              </Text>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={handleEndDateChange}

                />
              )}
            </View>

          </View>
          <View style={{ alignItems: "center" , paddingBottom:25}}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleData}>
              <Pressable>
                <Text style={{ color: "white", fontWeight: 'bold' }}>Submit</Text>
              </Pressable>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>

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

  TextInput: {
    padding: 14,

    opacity: 1,
    color: "#013e5a",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f2f5f6",
    width: 240,
  }, img: {
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
