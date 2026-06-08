import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import NavegacionTab from './src/components/NavegacionTab'

const Stack = createNativeStackNavigator();


function App() {
  return (
      <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="Register" component={ Register } />
        <Stack.Screen name="Login" component={ Login } />
        <Stack.Screen name="NavegacionTab" component={ NavegacionTab } />

     </Stack.Navigator>
   </NavigationContainer>
  );
}

export default App;