// import Geolocation from '@react-native-community/geolocation';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EmpAttendence from './EmpAttendence';
import Login from './Login';
import EmployeeDetails from './EmployeeDetails';
import AiBot from './AiBot';
import Forgotpassword from './Forgotpassword';
import Setpassword from './Setpassword';
import Time_sheet from './Time_sheet';
import { RootSiblingParent } from 'react-native-root-siblings';
import UserDetails from './UserProfile';
const Stack = createNativeStackNavigator();

export default function App () {
  return (
    <RootSiblingParent>
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'AlphaDot Technologies'}}
        />
        <Stack.Screen name="EmpAttendence" component={EmpAttendence} />
        <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
        <Stack.Screen name="Alphadot Chatbot" component={AiBot} />
        <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
        <Stack.Screen name="Setpassword" component={Setpassword} />
        <Stack.Screen name="Timesheet" component={Time_sheet} />
        <Stack.Screen name="Userprofile" component={UserDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    </RootSiblingParent>
  );
};

