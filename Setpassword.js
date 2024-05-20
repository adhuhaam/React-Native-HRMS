import img from "./logo.png";
import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
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
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function Setpassword({ navigation }) {
  const [passVisible, setpassVisible] = useState(true);
  const [confirmpassVisible, setconfirmpassVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedconfirm, setIsFocusedconfrm] = useState(false);
  const handleFocus = () => {
    setIsFocused((prevVisible) => !prevVisible);
    
  };
  
  const handleBlur = () => {
    setIsFocusedconfrm((prevVisible) => !prevVisible);
    
  };
  // const handleBlurconf = () => {
  //   setIsFocusedconfrm((prevVisible) => !prevVisible);
    
  // };
  // const handleFocusconf = () => {
  //   setIsFocusedconfrm((prevVisible) => !prevVisible);
    
  // };
  const [temp, setTemp] = useState({
    newpass: null,
    confirmpass: null
  });
  const [check, setcheck] = useState(true);
  const [passValidation, setpassValidation] = useState('Weak');
  useEffect(() => {
    if (temp.newpass !== null || temp.confirmpass !== null) {
      if (temp.newpass === temp.confirmpass) {
        setcheck(false);
      } else {
        setcheck(true);
      }
    }
  }, [temp.newpass, temp.confirmpass]);


  //   function handleData() {
  //     fetch("https://65c3148bf7e6ea59682bed24.mockapi.io/empData", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(temp),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Login failed");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log("Login successful:", data);
  //         Alert.alert("Employee Details", "Data Submitted successfully");
  //         setTemp({
  //           name: "",
  //           empID: "",
  //           workingHours: "",
  //           date: "",
  //         });
  //         navigation.navigate("EmpAttendence");
  //       })
  //       .catch((error) => {
  //         console.error("Login error:", error);
  //         Alert.alert("Getting error in Submitting", "error");
  //       });
  //   }
  useEffect(() => {
    if (temp.newpass && temp.newpass.length >= 4) {
      setpassValidation('Average');
      if (temp.newpass && temp.newpass.length >= 8) {
        setpassValidation('Hard');
      }
    }
    else {
      setpassValidation("Weak");
    }

  }, [temp.newpass]);

  const buttonHandler = () => {
    if (check) {
      console.log("HEllo bhai");
      Alert.alert('Error', 'Passwords do not match');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <StatusBar style="auto" />
        <View style={{ alignItems: "center", marginTop: 40, marginBottom: 20 }}>
          <Image source={img} style={styles.img}></Image>
        </View>
        {/* <Text style={styles.empt}>- Enter your new password -</Text> */}

        <View style={styles.inputbox}>
          <View style={styles.inputView}>
            <TextInput
              value={temp.newpass}
              style={styles.TextInput}
              placeholder="New password"
              keyboardType="default"
              secureTextEntry={passVisible}
              placeholderTextColor="#003f5c"
              onFocus={handleFocus}
              onBlur={handleFocus}
              onChangeText={(passn) => setTemp({ ...temp, newpass: passn })}
            />
            {isFocused && <Pressable style={{ zIndex: 1, opacity: 0.7, height: 40, width: 35, position: 'absolute', justifyContent: 'center', alignItems: 'center', margin: 5, right: 45 }} onPress={() => setpassVisible(!passVisible)}>


              {passVisible ? <Icon name="eye-off" size={20} color="brown" /> : <Icon name="eye" size={20} color="brown" />}

            </Pressable>}
          </View>
          {/* <Text style={styles.empt}>Enter new password</Text> */}
          <View style={styles.inputView}>
            <TextInput
              value={temp.empID}
              style={styles.TextInput}
              placeholder="Confirm password"
              keyboardType="default"
              secureTextEntry={confirmpassVisible}
              placeholderTextColor="#003f5c"
              onChangeText={(passc) => setTemp({ ...temp, confirmpass: passc })}
              onFocus={handleBlur}
              onBlur={handleBlur}
            />
            {isFocusedconfirm && <Pressable style={{ zIndex: 1, opacity: 0.7, height: 40, width: 35, position: 'absolute', justifyContent: 'center', alignItems: 'center', margin: 5, right: 45 }} onPress={() => setconfirmpassVisible(!confirmpassVisible)}>


              {confirmpassVisible ? <Icon name="eye-off" size={20} color="brown" /> : <Icon name="eye" size={20} color="brown" />}

            </Pressable>}
          </View>
          {check &&

            <Text style={styles.passtext}>Passwords do not match <Text>[<Text style={{ color: 'darkblue' }}> {passValidation} </Text>]</Text> </Text>

          }


        </View>
        <View style={{ alignItems: "center", marginVertical:10 }}>
          <TouchableOpacity style={styles.submitBtn} onPress={buttonHandler}>
            <Pressable>
              <Text style={{ color: "white" }} >Submit</Text>
            </Pressable>
          </TouchableOpacity>
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
    justifyContent: "center",
  },
  inputView: {
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  inputbox: {
    marginVertical: 10,
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
    height: 360,
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

    textAlign: 'center',
    marginVertical: 1,
    fontSize: 17,

  },
  passtext: {
    fontFamily: "serif",
    color: 'red',
    marginHorizontal: 40,
    marginVertical: 1,
    fontSize: 14,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});
