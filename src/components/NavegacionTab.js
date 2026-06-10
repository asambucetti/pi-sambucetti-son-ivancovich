import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavegacionStackHome from './NavegacionStackHome';
import NuevoPost from '../screens/NuevoPost';
import MiPerfil from '../screens/MiPerfil';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function NavegacionTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name="Home" 
            component={NavegacionStackHome} 
            options={{tabBarIcon: () => (<FontAwesome name="home" size={24} color="#F28C28" />)}}/>
            <Tab.Screen 
            name="Mi Perfil" 
            component={MiPerfil}
            options={{tabBarIcon: () => (<FontAwesome name="user" size={24} color="#F28C28" />)}} />
            <Tab.Screen 
            name="Crear Posteo" 
            component={NuevoPost}
            options={{tabBarIcon: () => (<FontAwesome name="plus-square" size={24} color="#F28C28" />)}} />
        </Tab.Navigator>
    );
}

export default NavegacionTab;





