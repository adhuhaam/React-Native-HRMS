

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootSiblingParent } from 'react-native-root-siblings';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-root-toast';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Pressable , ActivityIndicator} from 'react-native';
import { Table, Row } from 'react-native-table-component';
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LogBox, ignoreLogs } from 'react-native';
LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);
const token = AsyncStorage.getItem("response-token");

export default function EmpAttendance({ navigation, route }) {
  const { Start } = route.params;
  const { End } = route.params;
  const { Authtoken } = route.params;
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState('');
  const [LoaderLogout, SetLoaderLogout] = useState(true);
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);


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
      navigation.navigate("Login");
      SetLoaderLogout(true);
    } catch (error) {
      AsyncStorage.clear();
      console.log("Server Error Cannot Log out", error);
      Toast.show('Server Error Cannot logout !', {
        duration: Toast.durations.SHORT,
      });
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }

  };
  const fetchData = async () => {
    console.log("Token from EmpAttendance -> ",token._j);
    // console.log("Token from Navigate -> ",Autwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwhtoken._j);
    try {
      const response = await fetch('https://sit.hrms.alphadot.co.in/apigateway/payroll/timeSheet/allEmpAttendence?fromDate=2022-05-01&toDate=2024-05-02', {
        method: 'GET', // Adjust the method to GET
        headers: {
          Authorization: `Bearer ${token._j}`,
        },
      });
      const result = await response.json();
      console.log(result.message, " message"); // Log the result data
      setLoading(false); // Set loading to false after data is fetched
      if (Array.isArray(result.content)) {
        setData(result.content);
      } else {
        setData([]);
        Toast.show("No data available", {
          duration: Toast.durations.SHORT,
        });
      }

      console.log(result);
      console.log("Request successful");
    } catch (error) {
      console.error(error); r
      Toast.show("Server Error", {
        duration: Toast.durations.SHORT,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <RootSiblingParent>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>

            <Pressable onPress={() => navigation.navigate("EmployeeDetails")}>
              <View>
                <Icon name="arrow-left" size={30} color="black" style={{ marginHorizontal: 15 }} />
              </View>
            </Pressable>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "80%" }}>
              <Text style={styles.maintext}>Attendance</Text>
              <View >
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
          </View>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff', }}>
            <Row style={{ backgroundColor: '#3FA7D6' }} 
              data={[
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' , fontSize:16}}>employee Id</Text>,
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' , fontSize:16}}>Start date</Text>,
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' , fontSize:16}}>End date</Text>,
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' , fontSize:16}}>Working Hours</Text>,
              ]}
            />
            {filteredAttendance.map((item, index) => (
              <Row
                key={index}
                data={[item.empID, item.Startdate, item.Enddate, item.workingHours]}
                style={[styles.row, index % 2 && { backgroundColor: '#f2f2f2' }]}
                textStyle={styles.text}
              />
            ))}
          </Table>
        </View>
      </ScrollView>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    marginTop: 15
  },
  head: { height: 60, backgroundColor: 'darkblue' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  maintext: {
    top:2,
    fontWeight: "400",
    fontSize: 20
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
  header: {
    // backgroundColor: "green",
    width: "100%",
    height: 65,
    marginTop: 15,
    // justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  datePickerButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});


