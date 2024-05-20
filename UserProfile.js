


import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import { Table, Row, Col } from 'react-native-table-component';
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
  PermissionsAndroid,
  Dimensions,
} from "react-native";
import img from "./logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width: windowWidth } = Dimensions.get('window');

const token = AsyncStorage.getItem("response-token");



export default function UserDetails({ navigation, route }) {
  const { Authtoken } = route.params;
  console.log("Auth Token ->", Authtoken._j);
  const [msg, setmsg] = useState('');
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://hrms.alphadot.co.in/apigateway/hrms/employee/getAllEmp', {
          method: 'GET', // Adjust the method to GET
          headers: {
            Authorization: `Bearer ${Authtoken._j}`,
          },
        });
        const result = await response.json();
        console.log(result.message, " message"); // Log the result data
        setmsg(result.message);
        setLoading(false); // Set loading to false after data is fetched

        if (Array.isArray(result.content)) {
          setData(result.content);
        } else {
          setData([]);
          Toast.show("No data available", {
            duration: Toast.durations.SHORT,
          });
        }

        console.log(result.content);
        console.log("Request successful");
      } catch (error) {
        console.error(error); r
        Toast.show("Server Error", {
          duration: Toast.durations.SHORT,
        });
      }
    };
    fetchData();
  }, []);

  const [widthArr, setWidthArr] = useState([250, 30, 90, 100, 70, 90, 120]);
  const [Heading, setHeading] = useState(['Email', 'ID', 'First name', 'Last name', 'Gender', 'Marital Status', 'Phone number']);

  return (
    <ScrollView >
      <RootSiblingParent>
        <View style={styles.container}>
          <View style={styles.header}>

            <Pressable onPress={() => navigation.navigate("Timesheet")}>
              <View>
                <Icon name="arrow-left" size={30} color="black" style={{ marginHorizontal: 15 }} />
              </View>
            </Pressable>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "80%" }}>
              <Text style={styles.maintext}>Your Details</Text>

            </View>
          </View>
          {loading ? (<ActivityIndicator color="gray" size={30} style={{ marginVertical: 320 }} />
          ) : Data.length > 0 ? (<View style={{ height: "auto", justifyContent: 'center' }}>
            <View>
              <ScrollView horizontal={true} style={{ height: 'auto' }} >
                <ScrollView style={{ height: 'auto' }}>
                  <Table borderStyle={{ borderWidth: 2, borderColor: '#C1C0B9' }}>
                    <Row data={Heading} widthArr={widthArr} textStyle={{ marginHorizontal: 2, fontSize: 16, paddingVertical: 0, color: 'white', fontWeight: 500 }} style={{ paddingHorizontal: 10, backgroundColor: '#3FA7D6' }}></Row>
                  </Table>


                  <Table style={{ top: -1 }} borderStyle={{ borderWidth: 2, borderColor: '#C1C0B9' }} >
                    {Data.map((item, index) => (
                      <Row
                        widthArr={widthArr}
                        textStyle={{ marginHorizontal: 2, fontSize: 16, paddingVertical: 3 }}
                        key={index} style={[styles.row, index % 2 && { backgroundColor: '#f2f2f2' }]}
                        data={[item.email, item.employeeId, item.firstName, item.lastName, item.gender, item.maritalStatus, item.mobileNo]}
                      >

                      </Row>
                    ))}

                  </Table>
                </ScrollView>
              </ScrollView>
            </View>
          </View>) :

            (<View style={{ justifyContent: 'center', display: 'flex', height: 700 }}>
              <Text style={[styles.empl, { alignSelf: 'center' }]}>You Cannot Access this Data.</Text>
            </View>)
          }
        </View>
      </RootSiblingParent>
    </ScrollView>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
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
    marginTop: 30,
    // justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1', paddingHorizontal: 10 },
  img: {
    width: windowWidth - 70,
    height: windowWidth / 5,
  },
  box: {
    top: -40,
    width: 320,
    height: 500,
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
    fontSize: 18,
    fontWeight: 400
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
