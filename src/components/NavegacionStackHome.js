import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home'
import ComentarPosteo from '../screens/ComentarPosteo'


const Stack = createNativeStackNavigator();
function NavegacionStackHome(){
    return(
    <Stack.Navigator>
        <Stack.Screen name="Home" component={ Home } options={ { headerShown: false } } />
        <Stack.Screen name="ComentarPosteo" component={ ComentarPosteo }/>
     </Stack.Navigator>
    )
}
export default NavegacionStackHome;


