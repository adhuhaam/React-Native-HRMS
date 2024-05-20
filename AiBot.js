


import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { View, Dimensions, ScrollView, Platform, Keyboard, StyleSheet, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AiBot({navigation}) {
  const screenHeight = Dimensions.get('window').height;
  const initialWebViewHeight = screenHeight;
  const [webViewHeight, setWebViewHeight] = useState(initialWebViewHeight-70);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);



  const handleKeyboardDidShow = () => {
    setWebViewHeight(initialWebViewHeight - 350);
  };

  const handleKeyboardDidHide = () => {
    setWebViewHeight(initialWebViewHeight);
  };

  return (

<ScrollView>
    <View style={{ flex: 1 }}>
      <View style={styles.header}>

        <Pressable onPress={() => navigation.navigate("Login")}>
          <View>
            
            <Icon name="arrow-left" size={30} color="black" style={{ marginHorizontal: 15 }} />
          </View>
        </Pressable>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "80%" }}>
          <Text style={styles.maintext}>AlphaDot Chatbot</Text>
          
        </View>
      </View>
      <View style={{ height: webViewHeight }}>
        <WebView
          source={{ uri: 'https://console.dialogflow.com/api-client/demo/embedded/1ce01cea-7861-4bfb-8fca-b3ccfc0f2c3b' }}
          style={{ flex: 1 }}
          allowsFullscreenVideo={true}
        />
      </View>
    </View>
    </ScrollView>

  );
}
const styles = StyleSheet.create({
  maintext: {
    fontWeight: "400",
    fontSize: 20
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
  }
})


